from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class Appointment(models.Model):
    patient = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments_as_patient")
    clinician = models.ForeignKey(User, on_delete=models.CASCADE, related_name="appointments_as_clinician")
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    status = models.CharField(max_length=32, default="scheduled")  # scheduled, canceled, completed
    created_at = models.DateTimeField(auto_now_add=True)
