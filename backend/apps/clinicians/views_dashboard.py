from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils.timezone import now

from apps.assessments.models import AssessmentResult
from apps.clinical_notes.models import ClinicalNote
from apps.appointments.models import Appointment
from .serializers import PatientDashboardSerializer


class ClinicianDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if not hasattr(user, "clinician_profile"):
            return Response({"detail": "Not a clinician"}, status=403)

        clinician = user.clinician_profile
        patients = clinician.patients.all()

        dashboard_patients = []
        alerts = []

        for patient in patients:
            latest_assessment = (
                AssessmentResult.objects
                .filter(patient=patient)
                .order_by("-created_at")
                .first()
            )

            if latest_assessment and latest_assessment.total_score >= 15:
                alerts.append({
                    "patient_id": patient.id,
                    "message": f"High {latest_assessment.assessment.name} score ({latest_assessment.total_score})"
                })

            next_appointment = (
                Appointment.objects
                .filter(patient=patient, start_time__gte=now())
                .order_by("start_time")
                .first()
            )

            dashboard_patients.append({
                "id": patient.id,
                "name": patient.get_full_name() or patient.username,
                "latest_assessment": (
                    {
                        "type": latest_assessment.assessment.name,
                        "score": latest_assessment.total_score,
                        "severity": latest_assessment.severity,
                        "date": latest_assessment.created_at.date(),
                    } if latest_assessment else None
                ),
                "recent_note_count": ClinicalNote.objects.filter(patient=patient).count(),
                "next_appointment": next_appointment.start_time if next_appointment else None,
            })

        return Response({
            "clinician": {
                "id": clinician.id,
                "name": user.get_full_name() or user.username,
            },
            "patients": dashboard_patients,
            "alerts": alerts,
        })
