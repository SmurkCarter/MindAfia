from rest_framework import viewsets, permissions
from .models import DoctorAvailability, Appointment
from .serializers import DoctorAvailabilitySerializer, AppointmentSerializer
from apps.common.permissions import IsDoctor, IsPatient


class DoctorAvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated, IsDoctor]

    def get_queryset(self):
        return DoctorAvailability.objects.filter(
            doctor=self.request.user.doctor_profile
        )

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user.doctor_profile)

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if hasattr(user, "doctor_profile"):
            return Appointment.objects.filter(doctor=user.doctor_profile)
        if hasattr(user, "patient_profile"):
            return Appointment.objects.filter(patient=user.patient_profile)
        return Appointment.objects.none()


# Create your views here.
