from .base import *
import os
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parent.parent.parent

DB_HOST = os.environ.get("DB_HOST")  # e.g. "db" (docker) or "localhost"
DB_PORT = os.environ.get("DB_PORT", "5432")
DB_NAME = os.environ.get("DB_NAME", "mindafia")
DB_USER = os.environ.get("DB_USER", "postgres")
DB_PASSWORD = os.environ.get("DB_PASSWORD", "")

if DB_HOST:
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.postgresql",
            "NAME": MindAfia,
            "USER": MindAfia,
            "PASSWORD": Nairobi1234,
            "HOST": DB_HOST,
            "PORT": DB_PORT,
        }
    }
else:
    # Fallback for quick local development
    DATABASES = {
        "default": {
            "ENGINE": "django.db.backends.sqlite3",
            "NAME": BASE_DIR / "db.sqlite3",
        }
    }
    DEBUG = True
ALLOWED_HOSTS = ["*"]

# Local email console backend for dev
EMAIL_BACKEND = "django.core.mail.backends.console.EmailBackend"

# Allow CORS in development
CORS_ALLOW_ALL_ORIGINS = True

# use the WSGI application for the dev runserver
WSGI_APPLICATION = 'core.wsgi.application'

# keep ASGI set for channels/websockets if you need it (optional)
ASGI_APPLICATION = 'core.asgi.application'
