import json
from urllib.parse import parse_qs

from channels.generic.websocket import AsyncWebsocketConsumer
from asgiref.sync import sync_to_async
from rest_framework_simplejwt.authentication import JWTAuthentication

from apps.chat.models import ChatMessage
from apps.appointments.models import Appointment


class ChatConsumer(AsyncWebsocketConsumer):

    async def connect(self):

        self.room_group = None

        print("\n====== WEBSOCKET CONNECT ATTEMPT ======")

        query_string = self.scope["query_string"].decode()
        params = parse_qs(query_string)

        token = params.get("token")

        print("TOKEN:", token)

        if not token:
            print("❌ No token provided")
            await self.close()
            return

        # Authenticate user safely
        user = await self.get_user_from_token(token[0])

        if not user:
            print("❌ JWT Authentication failed")
            await self.close()
            return

        self.scope["user"] = user
        print("✅ Authenticated user:", user.username)

        try:
            self.appointment_id = self.scope["url_route"]["kwargs"]["appointment_id"]

            appointment = await self.get_appointment(self.appointment_id)

            if not appointment:
                print("❌ Appointment not found")
                await self.close()
                return

            print("Doctor:", appointment.doctor.user.username)
            print("Patient:", appointment.patient.user.username)

            allowed = (
                appointment.doctor.user_id == user.id or
                appointment.patient.user_id == user.id
            )

            print("Authorized:", allowed)

            if not allowed:
                print("❌ User not authorized")
                await self.close()
                return

            self.room_group = f"chat_{self.appointment_id}"

            await self.channel_layer.group_add(
                self.room_group,
                self.channel_name
            )

            print("✅ WebSocket connected")

            await self.accept()

        except Exception as e:
            print("❌ Unexpected error:", str(e))
            await self.close()


    async def disconnect(self, close_code):

        print("WebSocket disconnect:", close_code)

        if self.room_group:
            await self.channel_layer.group_discard(
                self.room_group,
                self.channel_name
            )


    async def receive(self, text_data):

        print("Incoming message:", text_data)

        data = json.loads(text_data)
        message = data.get("message")

        if not message:
            return

        sender = self.scope["user"]

        await self.save_message(
            appointment_id=self.appointment_id,
            sender=sender,
            message=message
        )

        await self.channel_layer.group_send(
            self.room_group,
            {
                "type": "chat_message",
                "sender": sender.username,
                "message": message
            }
        )


    async def chat_message(self, event):

        await self.send(text_data=json.dumps({
            "sender": event["sender"],
            "message": event["message"]
        }))


    # -----------------------------
    # SAFE SYNC FUNCTIONS
    # -----------------------------

    @sync_to_async
    def get_user_from_token(self, token):

        try:
            jwt_auth = JWTAuthentication()
            validated = jwt_auth.get_validated_token(token)
            return jwt_auth.get_user(validated)
        except Exception:
            return None


    @sync_to_async
    def get_appointment(self, appointment_id):

        try:
            return Appointment.objects.select_related(
                "doctor__user",
                "patient__user"
            ).get(id=appointment_id)
        except Appointment.DoesNotExist:
            return None


    @sync_to_async
    def save_message(self, appointment_id, sender, message):

        appointment = Appointment.objects.get(id=appointment_id)

        ChatMessage.objects.create(
            appointment=appointment,
            sender=sender,
            message=message
        )