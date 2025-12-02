# apps/authentication/models.py
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    """
    Custom user extending Django's AbstractUser.
    Using AbstractUser keeps built-in groups/permissions working.
    """
    is_clinician = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)

    def __str__(self):
        return self.username
