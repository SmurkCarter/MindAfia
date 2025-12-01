from rest_framework import viewsets, permissions
from .models import PatientProfile
from .serializers import PatientProfileSerializer

class PatientProfileViewSet(viewsets.ModelViewSet):
    queryset = PatientProfile.objects.select_related("user").all()
    serializer_class = PatientProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
