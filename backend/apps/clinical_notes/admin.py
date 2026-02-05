from django.contrib import admin
from .models import ClinicalNote

@admin.register(ClinicalNote)
class ClinicalNoteAdmin(admin.ModelAdmin):
    list_display = ("id", "patient", "clinician", "created_at")
    readonly_fields = ("created_at",)
