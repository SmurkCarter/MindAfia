from django.urls import path
from .views_dashboard import PatientDashboardView
from .views import ClinicianPatientListView, PatientProfileUpdateView

urlpatterns = [
    path("dashboard/", PatientDashboardView.as_view()),
    path("me/", PatientProfileUpdateView.as_view(), name="patient-profile"),
    path("list/", ClinicianPatientListView.as_view()),

]
