from django.urls import path
from .views import (
    CreateClinicalNoteView,
    ClinicianNotesListView,
    PatientNotesListView,
)

urlpatterns = [
    path("create/", CreateClinicalNoteView.as_view()),
    path("clinician/", ClinicianNotesListView.as_view()),
    path("patient/", PatientNotesListView.as_view()),
]
