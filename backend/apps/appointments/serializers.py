from rest_framework import serializers
from .models import DoctorAvailability, Appointment


class DoctorAvailabilitySerializer(serializers.ModelSerializer):
    doctor_name = serializers.CharField(source="doctor.user.username", read_only=True)

    class Meta:
        model = DoctorAvailability
        fields = [
            "id",
            "doctor",
            "doctor_name",
            "date",
            "start_time",
            "end_time",
        ]
        read_only_fields = ("doctor",)


class AppointmentSerializer(serializers.ModelSerializer):
    patient_name = serializers.CharField(source="patient.username", read_only=True)
    doctor_name = serializers.CharField(source="doctor.user.username", read_only=True)

    class Meta:
        model = Appointment
        fields = [
            "id",
            "patient",
            "patient_name",
            "doctor",
            "doctor_name",
            "scheduled_date",
            "scheduled_time",
            "status",
            "created_at",
        ]
        read_only_fields = (
            "patient",
            "doctor",
            "status",
            "created_at",
        )
