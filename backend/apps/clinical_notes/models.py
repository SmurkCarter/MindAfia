from django.conf import settings
from django.db import models
from apps.assessments.models import AssessmentResult


class ClinicalNote(models.Model):
    clinician = models.ForeignKey(
    "clinicians.ClinicianProfile",
    on_delete=models.SET_NULL,
    null=True,
    blank=True,
    related_name="clinical_notes",
)


    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="patient_notes",
    )

    assessment = models.ForeignKey(
        AssessmentResult,
        on_delete=models.SET_NULL,
        null=True,        # ✅ ALLOW NULL
        blank=True,       # ✅ OPTIONAL IN FORMS
        related_name="clinical_notes",
    )

    note = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Clinical note for {self.patient}"
