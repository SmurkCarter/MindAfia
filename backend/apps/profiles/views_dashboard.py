from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from django.utils.timezone import now

from apps.assessments.models import AssessmentResult
from apps.appointments.models import Appointment
from apps.clinical_notes.models import ClinicalNote


class PatientDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user

        if not hasattr(user, "patient_profile"):
            return Response({"detail": "Not a patient"}, status=403)

        patient = user.patient_profile

        assessments = (
            AssessmentResult.objects
            .filter(patient=patient.user)
            .order_by("-created_at")[:5]
        )

        appointments = (
            Appointment.objects
            .filter(patient=patient.user, start_time__gte=now())
            .order_by("start_time")
        )

        notes = (
            ClinicalNote.objects
            .filter(patient=patient.user)
            .order_by("-created_at")[:3]
        )

        return Response({
            "latest_assessments": [
                {
                    "type": a.assessment.name,
                    "score": a.total_score,
                    "severity": a.severity,
                    "date": a.created_at.date(),
                }
                for a in assessments
            ],
            "upcoming_appointments": [
                {
                    "start_time": appt.start_time,
                    "clinician": appt.clinician.user.get_full_name()
                }
                for appt in appointments
            ],
            "recent_notes": [
                {
                    "date": note.created_at.date(),
                    "summary": note.note[:200],  # safe truncation
                }
                for note in notes
            ],
        })
