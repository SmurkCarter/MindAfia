from rest_framework import serializers
from .models import PatientProfile

class PatientProfileSerializer(serializers.ModelSerializer):

    class Meta:
        model = PatientProfile
        fields = [
            "date_of_birth",
            "gender",
            "medical_notes"
        ]
        