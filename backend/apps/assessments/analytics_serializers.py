from rest_framework import serializers
from .models import PopulationRiskStat

class PopulationRiskSerializer(serializers.ModelSerializer):
    class Meta:
        model = PopulationRiskStat
        fields = ["risk_level", "count"]
