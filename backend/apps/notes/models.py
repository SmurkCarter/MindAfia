from django.db import models
from django.conf import settings

User = settings.AUTH_USER_MODEL

class ClinicalNote(models.Model):
    appointment = models.OneToOneField('scheduling.Appointment', on_delete=models.CASCADE, related_name='note', null=True, blank=True)
    author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    content = models.TextField()
    note_type = models.CharField(max_length=32, default='SOAP')  # SOAP, progress
    created_at = models.DateTimeField(auto_now_add=True)
