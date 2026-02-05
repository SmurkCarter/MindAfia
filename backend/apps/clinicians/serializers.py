from rest_framework import serializers
from .models import ClinicianProfile

class ClinicianProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicianProfile
        fields = "__all__"

class PatientDashboardSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    latest_assessment = serializers.DictField(allow_null=True)
    recent_note_count = serializers.IntegerField()
    next_appointment = serializers.DateTimeField(allow_null=True)