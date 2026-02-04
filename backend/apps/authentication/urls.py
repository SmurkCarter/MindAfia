from django.urls import path
from .views import (
    DoctorRegisterView,
    PatientRegisterView,
    MyTokenObtainPairView,
    MyTokenRefreshView,
    MeView,
)
from rest_framework_simplejwt.views import TokenVerifyView

urlpatterns = [
    path("register/doctor/", DoctorRegisterView.as_view(), name="register-doctor"),
    path("register/patient/", PatientRegisterView.as_view(), name="register-patient"),

    path("token/", MyTokenObtainPairView.as_view(), name="token-obtain"),
    path("token/refresh/", MyTokenRefreshView.as_view(), name="token-refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),

    path("me/", MeView.as_view(), name="me"),
]
