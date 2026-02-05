from django.db import models
from apps.disorders.models import Disorder


class Treatment(models.Model):
    TREATMENT_TYPES = (
        ("curative", "Curative"),
        ("preventive", "Preventive"),
        ("promotive", "Promotive"),
    )

    name = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)

    treatment_type = models.CharField(
        max_length=20,
        choices=TREATMENT_TYPES,
    )

    description = models.TextField(
        help_text="High-level explanation of the treatment approach"
    )

    disorders = models.ManyToManyField(
        Disorder,
        related_name="treatments",
        blank=True,
    )

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("treatment_type", "name")

    def __str__(self):
        return f"{self.name} ({self.treatment_type})"
