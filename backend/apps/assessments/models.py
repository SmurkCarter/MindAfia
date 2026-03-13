from django.conf import settings
from django.db import models


class Assessment(models.Model):

    PHQ9 = "PHQ9"
    GAD7 = "GAD7"
    AUDIT = "AUDIT"
    BURNOUT = "BURNOUT"

    ASSESSMENT_CHOICES = [
        (PHQ9, "Patient Health Questionnaire-9"),
        (GAD7, "Generalized Anxiety Disorder-7"),
        (AUDIT, "Alcohol Use Disorders Identification Test"),
        (BURNOUT, "Burnout Assessment"),
    ]

    name = models.CharField(
        max_length=20,
        choices=ASSESSMENT_CHOICES,
        unique=True
    )

    def __str__(self):
        return self.get_name_display()


class AssessmentResult(models.Model):

    patient = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )

    assessment = models.ForeignKey(
        Assessment,
        on_delete=models.CASCADE
    )

    responses = models.JSONField()

    total_score = models.IntegerField()

    severity = models.CharField(max_length=100)

    # 🔥 ML intelligence fields
    risk_level = models.CharField(
        max_length=50,
        blank=True,
        null=True
    )

    risk_flags = models.JSONField(
        blank=True,
        null=True
    )

    explanation = models.TextField(
        blank=True,
        null=True
    )

    recommended_treatments = models.JSONField(
        blank=True,
        null=True
    )

    recommended_articles = models.JSONField(
        blank=True,
        null=True
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.patient} - {self.assessment} ({self.total_score})"

class RiskAlert(models.Model):
    assessment = models.ForeignKey(AssessmentResult, on_delete=models.CASCADE)
    clinician = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    resolved = models.BooleanField(default=False)

RISK_CHOICES = [
    ("Low", "Low"),
    ("Moderate", "Moderate"),
    ("High", "High"),
    ("Critical", "Critical"),
]

class PopulationRiskStat(models.Model):
    risk_level = models.CharField(
        max_length=20,
        choices=RISK_CHOICES
    )
    count = models.IntegerField(default=0)


