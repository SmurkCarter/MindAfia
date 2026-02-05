from rest_framework.views import APIView
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from .models import AssessmentResult
from .serializers import (
    AssessmentSubmissionSerializer,
    AssessmentResultReadSerializer,
)


class SubmitAssessmentView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if not request.user.is_patient:
            return Response(
                {"detail": "Only patients can submit assessments."},
                status=status.HTTP_403_FORBIDDEN,
            )

        serializer = AssessmentSubmissionSerializer(
            data=request.data, context={"request": request}
        )

        if serializer.is_valid():
            result = serializer.save()
            return Response(
                {
                    "assessment": result.assessment.name,
                    "score": result.total_score,
                    "severity": result.severity,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PatientAssessmentListView(ListAPIView):
    serializer_class = AssessmentResultReadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return AssessmentResult.objects.filter(patient=self.request.user)
