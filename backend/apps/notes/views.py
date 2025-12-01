from rest_framework import viewsets, permissions
from .models import ClinicalNote
from rest_framework import serializers

class ClinicalNoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClinicalNote
        fields = "__all__"

class ClinicalNoteViewSet(viewsets.ModelViewSet):
    queryset = ClinicalNote.objects.select_related("author", "appointment").all()
    serializer_class = ClinicalNoteSerializer
    permission_classes = [permissions.IsAuthenticated]
