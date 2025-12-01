from rest_framework import serializers
from .models import ClinicianProfile

class ClinicianProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicianProfile
        fields = "__all__"
