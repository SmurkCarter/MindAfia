from rest_framework import viewsets, permissions
from .models import Appointment
from rest_framework import serializers

class AppointmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Appointment
        fields = "__all__"

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.select_related("patient","clinician").all()
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
