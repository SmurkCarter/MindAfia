from rest_framework import serializers
from .models import ClinicalNote

class ClinicalNoteCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalNote
        fields = [
            "id",
            "patient",
            "assessment",
            "note_type",
            "note",
        ]

    def create(self, validated_data):
        request = self.context["request"]
        validated_data["clinician"] = request.user.clinician_profile
        return super().create(validated_data)


class ClinicalNoteReadSerializer(serializers.ModelSerializer):
    clinician = serializers.StringRelatedField()

    class Meta:
        model = ClinicalNote
        fields = "__all__"
