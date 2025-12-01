from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    is_clinician = models.BooleanField(default=False)
    is_patient = models.BooleanField(default=False)
    # add fields like phone, dob, etc.
