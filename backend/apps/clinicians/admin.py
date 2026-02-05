from django.contrib import admin
from .models import ClinicianProfile

@admin.register(ClinicianProfile)
class ClinicianProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "specialization", "created_at")
    filter_horizontal = ("patients",)
