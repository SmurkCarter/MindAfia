from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class ClinicianProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient_profile")
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=32, blank=True)
    specialization = models.TextField(blank=True)
    bio=models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"ClinicianProfile({self.user.username})"
