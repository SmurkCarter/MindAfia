from django.urls import path
from django.http import JsonResponse
from .views import ChatHistoryView

def ping(request):
    return JsonResponse({"ok": True})

urlpatterns = [
    path("ping/", ping),
    path(
        "history/<int:appointment_id>/",
        ChatHistoryView.as_view(),
        name="chat-history",
    ),
]
