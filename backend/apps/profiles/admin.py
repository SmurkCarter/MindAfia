from django.contrib import admin
from .models import PatientProfile


@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "gender", "date_of_birth")
    search_fields = ("user__username",)
from django.contrib import admin

# Register your models here.
