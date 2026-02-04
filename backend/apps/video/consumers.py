class ChatConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        user = self.scope["user"]
        if not user.is_authenticated:
            await self.close()
            return

        self.appointment_id = self.scope["url_route"]["kwargs"]["appointment_id"]
        self.room_group = f"chat_{self.appointment_id}"

        await self.channel_layer.group_add(self.room_group, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.room_group, self.channel_name)

    async def receive(self, text_data):
        await self.channel_layer.group_send(
            self.room_group,
            {
                "type": "chat_message",
                "message": text_data,
            }
        )

    async def chat_message(self, event):
        await self.send(text_data=event["message"])