from django.conf import settings
from django.db import models


class ClinicianProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="clinician_profile",
    )

    # 👤 Personal info
    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=32, blank=True)

    # 🧠 Professional info
    specialization = models.TextField(blank=True)
    bio = models.TextField(blank=True)

    # 🔗 Patient assignment
    patients = models.ManyToManyField(
        settings.AUTH_USER_MODEL,
        related_name="assigned_clinicians",
        blank=True,
        help_text="Patients assigned to this clinician",
    )

    # ⏱️ Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        username = getattr(self.user, "username", str(self.user))
        return f"ClinicianProfile({username})"
