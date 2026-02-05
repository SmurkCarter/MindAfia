from django.db import models


class Disorder(models.Model):
    name = models.CharField(max_length=255, unique=True)
    slug = models.SlugField(unique=True)

    description = models.TextField(help_text="Clinical overview")
    symptoms = models.TextField(help_text="Common symptoms")
    risk_factors = models.TextField(blank=True)

    is_active = models.BooleanField(default=True)

    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ("name",)

    def __str__(self):
        return self.name
