from django.contrib import admin
from .models import AssessmentResult, PopulationRiskStat, Assessment


@admin.register(AssessmentResult)
class AssessmentResultAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "patient",
        "assessment",
        "total_score",
        "severity",
        "risk_level",
        "created_at",
    )
    list_filter = ("assessment", "risk_level", "created_at")
    search_fields = ("patient__username",)


@admin.register(PopulationRiskStat)
class PopulationRiskStatAdmin(admin.ModelAdmin):
    list_display = ("risk_level", "count")

@admin.register(Assessment)
class AssessmentAdmin(admin.ModelAdmin):
    list_display = ("id", "name")