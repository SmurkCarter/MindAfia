from django.db import models
from apps.disorders.models import Disorder


class Article(models.Model):
    CATEGORY_CHOICES = (
        ("depression", "Depression"),
        ("anxiety", "Anxiety"),
        ("stress", "Stress"),
        ("wellbeing", "Well-being"),
    )

    disorders = models.ManyToManyField(
        Disorder,
        related_name="articles",
        blank=True,
    )

    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True)
    category = models.CharField(max_length=50, choices=CATEGORY_CHOICES)

    summary = models.TextField(help_text="Short intro shown on landing pages")
    content = models.TextField(help_text="Full article content")

    # 🔗 Self-assessment CTA
    assessment_type = models.CharField(
        max_length=20,
        choices=(
            ("PHQ-9", "PHQ-9"),
            ("GAD-7", "GAD-7"),
        ),
        null=True,
        blank=True,
        help_text="Optional self-assessment link",
    )

    is_published = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ("-created_at",)

    def __str__(self):
        return self.title
