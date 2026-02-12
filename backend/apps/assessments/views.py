from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status
import requests

from apps.authentication.permissions import IsPatient, IsClinicianOrAdmin
from .models import AssessmentResult
from .serializers import (
    AssessmentSubmissionSerializer,
    AssessmentResultReadSerializer,
)


class SubmitAssessmentView(GenericAPIView):
    """
    Patient submits PHQ-9 or GAD-7 assessment
    """
    serializer_class = AssessmentSubmissionSerializer
    permission_classes = [IsPatient]

    def post(self, request):
        serializer = self.get_serializer(
            data=request.data,
            context={"request": request},
        )

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        result = serializer.save()

        # 🔥 CALL ML SERVICE
        try:
            ml_response = requests.post(
                "http://127.0.0.1:8001/predict-risk/",
                json={
                    "assessment_type": result.assessment.name,
                    "responses": result.responses,
                },
                timeout=5,
            )

            if ml_response.status_code == 200:
                ml_data = ml_response.json()
                result.risk_level = ml_data.get("risk_level")
                result.save()

        except Exception as e:
            print("ML Service Error:", e)

        return Response(
            {
                "assessment": result.assessment.name,
                "score": result.total_score,
                "severity": result.severity,
                "risk_level": getattr(result, "risk_level", None),
            },
            status=status.HTTP_201_CREATED,
        )


class PatientAssessmentListView(ListAPIView):
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsPatient]

    def get_queryset(self):
        return AssessmentResult.objects.filter(
            patient=self.request.user
        ).order_by("-created_at")


class ClinicianAssessmentListView(ListAPIView):
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsClinicianOrAdmin]

    def get_queryset(self):
        patient_id = self.kwargs.get("patient_id")
        return AssessmentResult.objects.filter(
            patient_id=patient_id
        ).order_by("-created_at")
