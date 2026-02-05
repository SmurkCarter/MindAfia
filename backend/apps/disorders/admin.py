from django.contrib import admin
from .models import Disorder


@admin.register(Disorder)
class DisorderAdmin(admin.ModelAdmin):
    list_display = ("name", "is_active")
    prepopulated_fields = {"slug": ("name",)}
    search_fields = ("name", "description", "symptoms")
