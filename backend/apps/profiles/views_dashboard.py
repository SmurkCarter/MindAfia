from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

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

        # 🔥 check if profile completed
        profile_complete = bool(patient.date_of_birth and patient.gender)

        # Latest assessments
        assessments = (
            AssessmentResult.objects
            .filter(patient=patient.user)
            .order_by("-created_at")[:5]
        )

        # Appointments
        appointments = (
            Appointment.objects
            .filter(patient=patient)
            .order_by("scheduled_date", "scheduled_time")
        )

        # Clinical notes
        notes = (
            ClinicalNote.objects
            .filter(patient=patient.user)
            .order_by("-created_at")[:3]
        )

        return Response({

            "profile_complete": profile_complete,

            "latest_assessments": [
                {
                    "type": a.assessment.name,
                    "score": a.total_score,
                    "severity": a.severity,
                    "date": a.created_at.date(),
                }
                for a in assessments
            ],

            # ✅ FIX: add appointment id
            "upcoming_appointments": [
                {
                    "id": appt.id,   # ⭐ THIS IS THE FIX
                    "date": appt.scheduled_date,
                    "time": appt.scheduled_time,
                    "doctor": appt.doctor.user.get_full_name()
                }
                for appt in appointments
            ],

            "recent_notes": [
                {
                    "date": note.created_at.date(),
                    "summary": note.note[:200],
                }
                for note in notes
            ],
        })