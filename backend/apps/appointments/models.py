from django.conf import settings
from django.db import models
from apps.profiles.models import DoctorProfile, PatientProfile

User = settings.AUTH_USER_MODEL


class DoctorAvailability(models.Model):
    doctor = models.ForeignKey(
        DoctorProfile,
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
    STATUS_PENDING = "pending"
    STATUS_APPROVED = "approved"
    STATUS_COMPLETED = "completed"
    STATUS_CANCELLED = "cancelled"

    STATUS_CHOICES = [
        (STATUS_PENDING, "Pending"),
        (STATUS_APPROVED, "Approved"),
        (STATUS_COMPLETED, "Completed"),
        (STATUS_CANCELLED, "Cancelled"),
    ]

    doctor = models.ForeignKey(
        DoctorProfile,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    patient = models.ForeignKey(
        PatientProfile,
        on_delete=models.CASCADE,
        related_name="appointments"
    )
    availability = models.ForeignKey(
        DoctorAvailability,
        on_delete=models.SET_NULL,
        null=True,
        blank=True
    )
    scheduled_date = models.DateField()
    scheduled_time = models.TimeField()
    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default=STATUS_PENDING
    )
    reason = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Appointment {self.id} | {self.patient.user.username} → {self.doctor.user.username}"
