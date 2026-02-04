from channels.generic.websocket import AsyncWebsocketConsumer
import json
from django.conf import settings
from asgiref.sync import sync_to_async
from apps.chat.models import ChatMessage
from apps.appointments.models import Appointment


class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if not user.is_authenticated:
            await self.close()
            return

        self.appointment_id = self.scope["url_route"]["kwargs"]["appointment_id"]
        self.room_group = f"chat_{self.appointment_id}"

        # Authorization: only doctor or patient of appointment
        allowed = await self.is_authorized(user, self.appointment_id)
        if not allowed:
            await self.close()
            return

        await self.channel_layer.group_add(self.room_group, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group, self.channel_name)

    async def receive(self, text_data):
        data = json.loads(text_data)
        message = data.get("message")

        # Save message to DB
        await self.save_message(
            appointment_id=self.appointment_id,
            sender=self.scope["user"],
            message=message,
        )

        await self.channel_layer.group_send(
            self.room_group,
            {
                "type": "chat_message",
                "sender": self.scope["user"].username,
                "message": message,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=json.dumps(event))

    @sync_to_async
    def save_message(self, appointment_id, sender, message):
        appointment = Appointment.objects.get(id=appointment_id)
        ChatMessage.objects.create(
            appointment=appointment,
            sender=sender,
            message=message,
        )

    @sync_to_async
    def is_authorized(self, user, appointment_id):
        appointment = Appointment.objects.get(id=appointment_id)
        return (
            hasattr(user, "doctor_profile")
            and appointment.doctor == user.doctor_profile
        ) or (
            hasattr(user, "patient_profile")
            and appointment.patient == user.patient_profile
        )
