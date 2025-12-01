from rest_framework.routers import DefaultRouter
from django.urls import path, include
from .views import PatientProfileViewSet

router = DefaultRouter()
router.register("profiles", PatientProfileViewSet, basename="patient-profile")

urlpatterns = [path("", include(router.urls))]
