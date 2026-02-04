from django.contrib import admin
from .models import DoctorAvailability, Appointment


@admin.register(DoctorAvailability)
class DoctorAvailabilityAdmin(admin.ModelAdmin):
    list_display = ("doctor", "date", "start_time", "end_time", "is_available")
    list_filter = ("date", "is_available")
    search_fields = ("doctor__user__username",)


@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    list_display = ("doctor", "patient", "scheduled_date", "scheduled_time", "status")
    list_filter = ("status", "scheduled_date")
    search_fields = ("doctor__user__username", "patient__user__username")


# Register your models here.
