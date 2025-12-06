import os
from django.core.wsgi import get_wsgi_application

# Ensure this matches the settings module you use in development
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings.development')

application = get_wsgi_application()
