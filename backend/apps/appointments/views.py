from rest_framework import permissions, viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView

from .models import DoctorAvailability, Appointment
from .serializers import DoctorAvailabilitySerializer, AppointmentSerializer

from apps.clinicians.models import ClinicianProfile
from apps.assessments.models import AssessmentResult


# ==============================
# GET AVAILABLE CLINICIANS
# ==============================

class AvailableCliniciansView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        clinicians = ClinicianProfile.objects.all()

        data = [
            {
                "id": c.id,
                "name": c.user.get_full_name() or c.user.username,
                "specialization": c.specialization,
            }
            for c in clinicians
        ]

        return Response(data)


# ==============================
# GET DOCTOR AVAILABLE SLOTS
# ==============================

class AvailableSlotsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request, doctor_id):

        date = request.GET.get("date")

        slots = DoctorAvailability.objects.filter(
            doctor_id=doctor_id,
            is_available=True
        )

        if date:
            slots = slots.filter(date=date)

        data = [
            {
                "id": slot.id,
                "scheduled_time": slot.start_time,
            }
            for slot in slots
        ]

        return Response(data)


# ==============================
# BOOK APPOINTMENT
# ==============================

class BookAppointmentView(APIView):

    permission_classes = [IsAuthenticated]

    def post(self, request):

        slot_id = request.data.get("availability")
        appointment_type = request.data.get("appointment_type")
        reason = request.data.get("reason")

        slot = get_object_or_404(DoctorAvailability, id=slot_id)

        if not slot.is_available:
            return Response({"error": "Slot already booked"}, status=400)

        appointment = Appointment.objects.create(
            doctor=slot.doctor,
            patient=request.user.patient_profile,
            scheduled_date=slot.date,
            scheduled_time=slot.start_time,
            appointment_type=appointment_type,
            reason=reason,
        )

        slot.is_available = False
        slot.save()

        return Response({
            "message": "Appointment booked successfully",
            "appointment_id": appointment.id
        })


# ==============================
# GET MY APPOINTMENTS
# ==============================

class MyAppointmentsView(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        if request.user.is_patient:

            appointments = Appointment.objects.filter(
                patient=request.user.patient_profile
            )

        elif request.user.is_clinician:

            appointments = Appointment.objects.filter(
                doctor__user=request.user
            )

        else:

            appointments = Appointment.objects.none()

        serializer = AppointmentSerializer(appointments, many=True)

        return Response(serializer.data)


# ==============================
# CLINICIAN AVAILABILITY CRUD
# ==============================

class DoctorAvailabilityViewSet(viewsets.ModelViewSet):

    serializer_class = DoctorAvailabilitySerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):

        return DoctorAvailability.objects.filter(
            doctor=self.request.user.clinician_profile
        )

    def perform_create(self, serializer):

        serializer.save(
            doctor=self.request.user.clinician_profile
        )


# ==============================
# CLINICIAN APPOINTMENT LIST
# ==============================

class DoctorAppointmentListView(ListAPIView):

    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):

        doctor = self.request.user.clinician_profile

        return Appointment.objects.filter(
            doctor=doctor
        ).select_related("patient__user").order_by("-scheduled_date")
    

class ClinicianDashboardPatients(APIView):

    permission_classes = [IsAuthenticated]

    def get(self, request):

        clinician = request.user.clinician_profile

        appointments = Appointment.objects.filter(
            doctor=clinician
        ).select_related(
            "patient__user"
        )

        data = []

        for appointment in appointments:

            patient_user = appointment.patient.user

            # latest assessment
            result = AssessmentResult.objects.filter(
                patient=patient_user
            ).order_by("-created_at").first()

            risk = result.risk_level if result else "Low"

            data.append({

                "appointment_id": appointment.id,

                "patient_name": patient_user.username,

                "last_visit": appointment.scheduled_date,

                "risk": risk,

                "status": "Active"

            })

        return Response(data)