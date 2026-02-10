from rest_framework.viewsets import ModelViewSet
from rest_framework import viewsets, permissions
from .models import DoctorAvailability, Appointment
from .serializers import DoctorAvailabilitySerializer, AppointmentSerializer
from rest_framework.permissions import IsAuthenticated
from apps.common.permissions import IsClinician, IsPatient
from apps.authentication.permissions import (
    IsPatient,
    IsClinicianOrAdmin,
)

class AppointmentViewSet(ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.all()



class DoctorAvailabilityViewSet(viewsets.ModelViewSet):
    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated, IsClinician]

    def get_queryset(self):
        return DoctorAvailability.objects.filter(
            doctor=self.request.user.doctor_profile
        )

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user.doctor_profile)




# Create your views here.
