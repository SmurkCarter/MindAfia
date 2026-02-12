from django.conf import settings
from django.db import models


class Assessment(models.Model):
    PHQ9 = "PHQ-9"
    GAD7 = "GAD-7"

    ASSESSMENT_TYPES = (
        (PHQ9, "Patient Health Questionnaire-9"),
        (GAD7, "Generalized Anxiety Disorder-7"),
    )

    name = models.CharField(max_length=20, choices=ASSESSMENT_TYPES, unique=True)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.name


class AssessmentResult(models.Model):
    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="assessments",
    )

    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE,
        related_name="results",
    )

    responses = models.JSONField()
    total_score = models.IntegerField()
    severity = models.CharField(max_length=50)

    # ✅ ADD IT HERE (separate field)
    risk_level = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient} – {self.assessment} – {self.total_score}"

