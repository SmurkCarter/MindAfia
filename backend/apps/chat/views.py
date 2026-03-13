from rest_framework import generics, permissions
from rest_framework.exceptions import PermissionDenied
from apps.appointments.models import Appointment
from .models import ChatMessage
from .serializers import ChatMessageSerializer


class ChatHistoryView(generics.ListAPIView):
    serializer_class = ChatMessageSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        appointment_id = self.kwargs["appointment_id"]
        user = self.request.user

        try:
            appointment = Appointment.objects.select_related(
                "doctor__user",
                "patient__user"
            ).get(id=appointment_id)

        except Appointment.DoesNotExist:
            raise PermissionDenied("Appointment not found")

        # Authorization
        if not (
            appointment.doctor.user_id == user.id or
            appointment.patient.user_id == user.id
        ):
            raise PermissionDenied("You cannot access this chat")

        return ChatMessage.objects.filter(
            appointment_id=appointment_id
        ).select_related("sender").order_by("created_at")