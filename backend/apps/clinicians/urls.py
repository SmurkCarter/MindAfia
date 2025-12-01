from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import ClinicianProfileViewSet

router = DefaultRouter()
router.register("profiles", ClinicianProfileViewSet, basename="Clinician-profile")

urlpatterns = [path("", include(router.urls))]
