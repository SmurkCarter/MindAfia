from .base import *
DEBUG = False
ALLOWED_HOSTS = os.getenv("DJANGO_ALLOWED_HOSTS", "example.com").split(",")

# Use real email backend (configure env vars)
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"

# CORS
CORS_ALLOWED_ORIGINS = os.getenv("CORS_ALLOWED_ORIGINS", "").split(",")
