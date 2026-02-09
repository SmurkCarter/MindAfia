from django.urls import path
from .views_dashboard import PatientDashboardView

urlpatterns = [
    path("dashboard/", PatientDashboardView.as_view()),
]
