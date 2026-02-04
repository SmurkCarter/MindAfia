from django.contrib import admin
from .models import ClinicalNote


@admin.register(ClinicalNote)
class ClinicalNoteAdmin(admin.ModelAdmin):
    list_display = ("appointment", "doctor", "patient", "created_at")
    list_filter = ("created_at",)
    search_fields = (
        "doctor__user__username",
        "patient__user__username",
        "diagnosis",
    )
