from .base import *

DEBUG = True
ALLOWED_HOSTS = ["*"]

# Local email console backend for dev
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Allow CORS in development
CORS_ALLOW_ALL_ORIGINS = True
