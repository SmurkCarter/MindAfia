from rest_framework.generics import (
    CreateAPIView,
    ListAPIView,
    RetrieveAPIView,
)
from rest_framework.permissions import IsAuthenticated

from .models import ClinicalNote
from .serializers import (
    ClinicalNoteCreateSerializer,
    ClinicalNoteReadSerializer,
)
from .permissions import IsClinician


class CreateClinicalNoteView(CreateAPIView):
    serializer_class = ClinicalNoteCreateSerializer
    permission_classes = [IsAuthenticated, IsClinician]


class ClinicianNotesListView(ListAPIView):
    serializer_class = ClinicalNoteReadSerializer
    permission_classes = [IsAuthenticated, IsClinician]

    def get_queryset(self):
        return ClinicalNote.objects.filter(
            clinician=self.request.user.clinician_profile
        )


class PatientNotesListView(ListAPIView):
    serializer_class = ClinicalNoteReadSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return ClinicalNote.objects.filter(patient=self.request.user)
