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

from rest_framework.generics import ListAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.clinicians.models import ClinicianProfile

class AvailableCliniciansView(APIView):
    def get(self, request):
        clinicians = ClinicianProfile.objects.all()

        data = [
            {
                "id": c.id,
                "name": c.user.username,
                "specialization": c.specialization
            }
            for c in clinicians
        ]

        return Response(data)


class PatientAppointmentListView(ListAPIView):
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Appointment.objects.filter(
            patient=self.request.user
        ).order_by("-date")

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




class MyAppointmentsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.is_patient:
            appointments = Appointment.objects.filter(patient=request.user)
        elif request.user.is_clinician:
            appointments = Appointment.objects.filter(doctor__user=request.user)
        else:
            appointments = Appointment.objects.none()

        data = [
            {
                "id": a.id,
                "patient": a.patient.username,
                "doctor": a.doctor.user.username,
                "date": a.date,
                "status": a.status,
            }
            for a in appointments
        ]

        return Response(data)
# Create your views here.
