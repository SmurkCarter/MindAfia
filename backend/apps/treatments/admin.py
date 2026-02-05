from django.contrib import admin
from .models import Treatment


@admin.register(Treatment)
class TreatmentAdmin(admin.ModelAdmin):
    list_display = ("name", "treatment_type", "is_active")
    list_filter = ("treatment_type", "is_active")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description")
