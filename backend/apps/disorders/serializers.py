from rest_framework import serializers
from .models import Disorder


class DisorderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Disorder
        fields = (
            "name",
            "slug",
            "description",
            "symptoms",
            "risk_factors",
        )
