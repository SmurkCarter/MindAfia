from rest_framework import viewsets, permissions
from .models import ClinicianProfile
from .serializers import ClinicianProfileSerializer 

class ClinicianProfileViewSet(viewsets.ModelViewSet):
    queryset = ClinicianProfile.objects.select_related("user").all()
    serializer_class = ClinicianProfileSerializer
    permission_classes = [permissions.IsAuthenticated]
