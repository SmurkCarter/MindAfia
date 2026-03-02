from rest_framework.views import APIView
from rest_framework.response import Response
from django.utils.timezone import now
from django.utils.timezone import make_aware
from django.db.models import Count

from apps.authentication.permissions import IsClinicianOrAdmin
from apps.assessments.models import AssessmentResult
from apps.clinical_notes.models import ClinicalNote
from apps.appointments.models import Appointment


class ClinicianDashboardView(APIView):
    permission_classes = [IsClinicianOrAdmin]

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

            # 🚨 Use ML risk level instead of raw score
            if latest_assessment and latest_assessment.risk_level == "High":
                alerts.append({
                    "patient_id": patient.id,
                    "patient_name": patient.username,
                    "message": f"High Risk detected ({latest_assessment.assessment.name})"
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
                        "risk_level": latest_assessment.risk_level,
                        "date": latest_assessment.created_at.date(),
                    } if latest_assessment else None
                ),
                "recent_note_count": ClinicalNote.objects.filter(patient=patient).count(),
                "next_appointment": next_appointment.start_time if next_appointment else None,
            })

        today = now().date()
        weekly_appointments = (
            Appointment.objects
            .filter(
                doctor=clinician,
                scheduled_date__gte=today
    )
    .order_by("scheduled_date", "scheduled_time")[:5]
)
        return Response({
            "clinician": {
                "id": clinician.id,
                "name": user.get_full_name() or user.username,
            },
            "total_patients": patients.count(),
            "patients": dashboard_patients,
            "alerts": alerts,
            "weekly_appointments": [
    {
        "patient": (
            appt.patient.user.get_full_name()
            or appt.patient.user.username
        ),
        "date": appt.scheduled_date,
        "time": appt.scheduled_time,
        "status": appt.status,
    } for appt in weekly_appointments
]
   
        })