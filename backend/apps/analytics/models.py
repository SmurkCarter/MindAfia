from django.db import models


class PopulationRiskStat(models.Model):
    RISK_CHOICES = [
        ("Low", "Low"),
        ("Moderate", "Moderate"),
        ("High", "High"),
        ("Critical", "Critical"),
    ]

    risk_level = models.CharField(max_length=20, choices=RISK_CHOICES)
    count = models.IntegerField(default=0)

    def __str__(self):
        return f"{self.risk_level}: {self.count}"
