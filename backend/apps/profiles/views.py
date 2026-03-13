from rest_framework.permissions import IsAuthenticated
from apps.authentication.permissions import IsPatient
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.generics import ListAPIView

from .models import PatientProfile
from .serializers import PatientProfileSerializer
from apps.appointments.models import Appointment


class PatientProfileViewSet(ModelViewSet):

    queryset = PatientProfile.objects.select_related("user")
    serializer_class = PatientProfileSerializer
    permission_classes = [IsPatient]


class PatientProfileUpdateView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        user = request.user
        profile = user.patient_profile

        return Response({
            "username": user.username,
            "first_name": user.first_name,
            "last_name": user.last_name,
            "email": user.email,
            "date_of_birth": profile.date_of_birth,
            "gender": profile.gender,
            "medical_notes": profile.medical_notes
        })

    def put(self, request):

        user = request.user
        profile = user.patient_profile

        user.first_name = request.data.get("first_name")
        user.last_name = request.data.get("last_name")
        user.save()

        profile.date_of_birth = request.data.get("date_of_birth")
        profile.gender = request.data.get("gender")
        profile.save()

        return Response({
            "message": "Profile updated successfully"
        })


# ==============================
# CLINICIAN PATIENT LIST
# ==============================

class ClinicianPatientListView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        clinician = request.user.clinician_profile

        appointments = Appointment.objects.filter(
            doctor=clinician
        ).select_related(
            "patient__user"
        )

        data = []

        for a in appointments:

            data.append({
                "appointment_id": a.id,
                "patient_name": f"{a.patient.user.first_name} {a.patient.user.last_name}",
                "patient_username": a.patient.user.username
            })

        return Response(data)