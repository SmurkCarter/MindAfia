from django.db import models
from django.conf import settings
from apps.appointments.models import Appointment

class ClinicalFile(models.Model):
    appointment = models.ForeignKey(Appointment, on_delete=models.CASCADE)
    uploaded_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    file = models.FileField(upload_to="clinical_files/")
    created_at = models.DateTimeField(auto_now_add=True)
