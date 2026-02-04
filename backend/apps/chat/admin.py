from django.contrib import admin
from .models import ChatMessage

@admin.register(ChatMessage)
class ChatMessageAdmin(admin.ModelAdmin):
    list_display = ("appointment", "sender", "created_at")
    search_fields = ("sender__username", "message")
    list_filter = ("created_at",)
