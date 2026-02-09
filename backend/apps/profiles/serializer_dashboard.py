from rest_framework import serializers


class PatientDashboardSerializer(serializers.Serializer):
    latest_assessments = serializers.ListField()
    upcoming_appointments = serializers.ListField()
    recent_notes = serializers.ListField()
