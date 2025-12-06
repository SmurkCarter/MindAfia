import os
from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
import apps.chat.routing as chat_routing

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.development')

# Django ASGI app to handle HTTP requests
django_asgi_app = get_asgi_application()

# Top-level ASGI application for channels
application = ProtocolTypeRouter({
    "http": django_asgi_app,
    "websocket": AuthMiddlewareStack(
        URLRouter(
            chat_routing.websocket_urlpatterns
        )
    ),
})
