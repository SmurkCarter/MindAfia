from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from apps.authentication.permissions import IsPatient

class PatientProfileViewSet(ModelViewSet):
    permission_classes = [IsPatient]
