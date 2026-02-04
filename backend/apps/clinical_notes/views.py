from rest_framework import viewsets, permissions
from .models import ClinicalNote
from .serializers import ClinicalNoteSerializer
from .permissions import IsDoctor, IsOwnerPatient


class ClinicalNoteViewSet(viewsets.ModelViewSet):
    serializer_class = ClinicalNoteSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user

        if hasattr(user, "doctor_profile"):
            return ClinicalNote.objects.filter(doctor=user.doctor_profile)

        if hasattr(user, "patient_profile"):
            return ClinicalNote.objects.filter(patient=user.patient_profile)

        return ClinicalNote.objects.none()

    def get_permissions(self):
        if self.action in ["create", "update", "partial_update"]:
            return [permissions.IsAuthenticated(), IsDoctor()]
        return [permissions.IsAuthenticated()]

    def perform_create(self, serializer):
        appointment = serializer.validated_data["appointment"]
        serializer.save(
            doctor=self.request.user.doctor_profile,
            patient=appointment.patient
        )
