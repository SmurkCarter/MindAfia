from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.db.models import Count, F
from django.db import transaction
import requests

from .models import Assessment
from .serializers import AssessmentSerializer
from apps.authentication.permissions import IsPatient, IsClinicianOrAdmin
from .models import AssessmentResult, PopulationRiskStat
from .serializers import (
    AssessmentSubmissionSerializer,
    AssessmentResultReadSerializer,
)
from .analytics_serializers import PopulationRiskSerializer


# =====================================================
# SUBMIT ASSESSMENT (Patient Only)
# =====================================================

class SubmitAssessmentView(GenericAPIView):
    serializer_class = AssessmentSubmissionSerializer
    permission_classes = [IsPatient]

    def post(self, request):
        serializer = self.get_serializer(
            data=request.data,
            context={"request": request},
        )

        serializer.is_valid(raise_exception=True)
        result = serializer.save()

        # 🔥 CALL ML SERVICE
        try:
            ml_response = requests.post(
                "http://127.0.0.1:8001/predict-risk/",
                json={
                    "assessment_type": result.assessment.name,
                    "score": result.total_score,
                    "severity": result.severity,
                    "responses": result.responses,
                },
                timeout=5,
            )

            if ml_response.status_code == 200:
                ml_data = ml_response.json()

                result.risk_level = ml_data.get("risk_level")
                result.risk_flags = ml_data.get("risk_flags")
                result.explanation = ml_data.get("explanation")
                result.recommended_treatments = ml_data.get("recommended_treatments")
                result.recommended_articles = ml_data.get("recommended_articles")
                result.save(update_fields=[
                    "risk_level",
                    "risk_flags",
                    "explanation",
                    "recommended_treatments",
                    "recommended_articles",
                ])

                # ✅ Atomic population stats update
                if result.risk_level:
                    with transaction.atomic():
                        stat, _ = PopulationRiskStat.objects.get_or_create(
                            risk_level=result.risk_level,
                            defaults={"count": 0},
                        )
                        PopulationRiskStat.objects.filter(pk=stat.pk).update(
                            count=F("count") + 1
                        )

        except Exception as e:
            print("⚠ ML Service Error:", e)

        return Response(
    {
        "assessment": result.assessment.name,
        "score": result.total_score,
        "severity": result.severity,
        "risk_level": result.risk_level,
        "recommended_articles": result.recommended_articles,
        "recommended_treatments": result.recommended_treatments,
        "explanation": result.explanation,
    },
    status=status.HTTP_201_CREATED,
    )


# =====================================================
# PATIENT VIEW THEIR OWN HISTORY
# =====================================================

class PatientAssessmentListView(ListAPIView):
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsPatient]

    def get_queryset(self):
        return (
            AssessmentResult.objects
            .filter(patient=self.request.user)
            .select_related("assessment")
            .order_by("-created_at")
        )


# =====================================================
# CLINICIAN VIEW PATIENT HISTORY
# =====================================================

class ClinicianAssessmentListView(ListAPIView):
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsClinicianOrAdmin]

    def get_queryset(self):
        patient_id = self.kwargs.get("patient_id")
        return (
            AssessmentResult.objects
            .filter(patient_id=patient_id)
            .select_related("assessment")
            .order_by("-created_at")
        )


# =====================================================
# POPULATION RISK ANALYTICS (Clinician/Admin Only)
# =====================================================

class PopulationRiskView(APIView):
    permission_classes = [IsClinicianOrAdmin]

    def get(self, request):
        stats = PopulationRiskStat.objects.all()
        serializer = PopulationRiskSerializer(stats, many=True)
        return Response(serializer.data)


# =====================================================
# MOST COMMON CONDITION (Clinician/Admin Only)
# =====================================================

class MostCommonConditionView(APIView):
    permission_classes = [IsClinicianOrAdmin]

    def get(self, request):
        data = (
            AssessmentResult.objects
            .values("assessment__name")
            .annotate(total=Count("id"))
            .order_by("-total")
        )

        if data.exists():
            return Response(data.first())

        return Response({"message": "No data yet"})


class AssessmentListView(ListAPIView):
    queryset = Assessment.objects.all()
    serializer_class = AssessmentSerializer
    permission_classes = []