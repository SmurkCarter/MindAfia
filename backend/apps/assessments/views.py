from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework.response import Response
from rest_framework import status

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

        serializer.is_valid(raise_exception=True)
        result = serializer.save()

        return Response(
            {
                "assessment": result.assessment.name,
                "score": result.total_score,
                "severity": result.severity,
            },
            status=status.HTTP_201_CREATED,
        )


class PatientAssessmentListView(ListAPIView):
    """
    Patient views their own assessment history
    """
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsPatient]

    def get_queryset(self):
        return AssessmentResult.objects.filter(
            patient=self.request.user
        ).order_by("-created_at")


class ClinicianAssessmentListView(ListAPIView):
    """
    Clinician views assessments for a specific patient
    """
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsClinicianOrAdmin]

    def get_queryset(self):
        patient_id = self.kwargs.get("patient_id")
        return AssessmentResult.objects.filter(
            patient_id=patient_id
        ).order_by("-created_at")
