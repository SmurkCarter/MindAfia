from django.conf import settings
from django.db import models
from apps.profiles.models import PatientProfile
from apps.clinicians.models import ClinicianProfile

User = settings.AUTH_USER_MODEL


class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(
        ClinicianProfile,
    on_delete=models.CASCADE,
    related_name="availabilities"
)

    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    is_available = models.BooleanField(default=True)

    class Meta:
        unique_together = ("doctor", "date", "start_time", "end_time")

    def __str__(self):
        return f"{self.doctor.user.username} | {self.date} {self.start_time}-{self.end_time}"



class Appointment(models.Model):

    STATUS_CHOICES = [
        ("pending", "Pending"),
        ("confirmed", "Confirmed"),
        ("completed", "Completed"),
        ("cancelled", "Cancelled"),
    ]

    TYPE_CHOICES = [
        ("online", "Online"),
        ("physical", "Physical"),
    ]

    doctor = models.ForeignKey(
        ClinicianProfile,
        on_delete=models.CASCADE
    )

    patient = models.ForeignKey(
        PatientProfile,
        on_delete=models.CASCADE
    )

    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()

    appointment_type = models.CharField(
        max_length=10,
        choices=TYPE_CHOICES,
        default="online"
    )

    reason = models.TextField(blank=True)

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default="pending"
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient} - {self.doctor} ({self.scheduled_date})"
