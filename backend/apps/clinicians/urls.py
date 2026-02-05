from django.urls import path, include
from rest_framework.routers import DefaultRouter

from .views import ClinicianProfileViewSet
from .views_dashboard import ClinicianDashboardView


router = DefaultRouter()
router.register("profiles", ClinicianProfileViewSet, basename="clinician-profile")


urlpatterns = [
    path("", include(router.urls)),   # ← comma FIXED
    path("dashboard/", ClinicianDashboardView.as_view()),
]
