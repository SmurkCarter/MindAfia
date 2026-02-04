from rest_framework import generics, permissions
from django.contrib.auth import get_user_model
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from rest_framework.permissions import IsAuthenticated

from .serializers import (
    DoctorRegisterSerializer,
    PatientRegisterSerializer,
    UserSerializer,
)

User = get_user_model()


class DoctorRegisterView(generics.CreateAPIView):
    serializer_class = DoctorRegisterSerializer
    permission_classes = [permissions.AllowAny]


class PatientRegisterView(generics.CreateAPIView):
    serializer_class = PatientRegisterSerializer
    permission_classes = [permissions.AllowAny]


class MeView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user


# JWT views (THIS IS WHAT WAS MISSING)
class MyTokenObtainPairView(TokenObtainPairView):
    permission_classes = [permissions.AllowAny]


class MyTokenRefreshView(TokenRefreshView):
    permission_classes = [permissions.AllowAny]
