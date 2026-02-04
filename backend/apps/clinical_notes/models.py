from django.db import models
from apps.appointments.models import Appointment
from apps.profiles.models import DoctorProfile, PatientProfile


class ClinicalNote(models.Model):
    appointment = models.ForeignKey(
        Appointment,
        on_delete=models.CASCADE,
        related_name="clinical_notes"
    )
    doctor = models.ForeignKey(
        DoctorProfile,
        on_delete=models.CASCADE,
        related_name="clinical_notes"
    )
    patient = models.ForeignKey(
        PatientProfile,
        on_delete=models.CASCADE,
        related_name="clinical_notes"
    )

    diagnosis = models.TextField()
    treatment_plan = models.TextField()
    doctor_notes = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Clinical Note | Appt {self.appointment.id}"
