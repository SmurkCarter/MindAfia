from rest_framework import viewsets, permissions
from .serializers import ClinicianProfileSerializer 
from rest_framework.viewsets import ModelViewSet
from apps.authentication.permissions import IsClinicianOrAdmin

class ClinicianProfileViewSet(ModelViewSet):
    permission_classes = [IsClinicianOrAdmin]

