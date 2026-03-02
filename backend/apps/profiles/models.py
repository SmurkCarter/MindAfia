from django.conf import settings
from django.db import models

User = settings.AUTH_USER_MODEL




class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient_profile")
    date_of_birth = models.DateField(null=True, blank=True)
    gender = models.CharField(
        max_length=10,
        choices=[("male", "Male"), ("female", "Female"), ("other", "Other")],
        blank=True
    )
    medical_notes = models.TextField(blank=True)

    def __str__(self):
        return f"Patient: {self.user.username}"
from django.db import models

# Create your models here.
