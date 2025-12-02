from django.conf import settings
from django.db import models

class ClinicianProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="clinician_profile",
    )

    dob = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=32, blank=True)
    specialization = models.TextField(blank=True)
    bio = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        # guard in case user does not have username property
        username = getattr(self.user, "username", str(self.user))
        return f"ClinicianProfile({username})"
