from django.urls import path
from .views import (
    AvailableCliniciansView,
    AvailableSlotsView,
    BookAppointmentView,
    MyAppointmentsView,
    DoctorAppointmentListView,
    ClinicianDashboardPatients,
)

urlpatterns = [

    path("clinicians/", AvailableCliniciansView.as_view()),
    path("slots/<int:doctor_id>/", AvailableSlotsView.as_view()),
    path("book/", BookAppointmentView.as_view()),
    path("my/", MyAppointmentsView.as_view()),

    # clinician dashboard
    path("doctor/", DoctorAppointmentListView.as_view()),
    path("dashboard/patients/", ClinicianDashboardPatients.as_view()),

]