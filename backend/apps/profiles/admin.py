from django.contrib import admin
from .models import DoctorProfile, PatientProfile

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "specialization", "license_number", "is_verified")
    search_fields = ("user__username", "license_number")
    list_filter = ("is_verified",)


@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    list_display = ("user", "gender", "date_of_birth")
    search_fields = ("user__username",)
from django.contrib import admin

# Register your models here.
