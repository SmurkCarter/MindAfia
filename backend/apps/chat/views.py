from rest_framework import generics, permissions
from .models import ChatMessage
from .serializers import ChatMessageSerializer
from apps.common.permissions import IsOwnerDoctorOrPatient


class ChatHistoryView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        appointment_id = self.kwargs["appointment_id"]
        return ChatMessage.objects.filter(
            appointment_id=appointment_id
        ).order_by("created_at")
