from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.authentication.urls')),
    path('api/patients/', include('apps.patients.urls')),
    path('api/clinicians/', include('apps.clinicians.urls')),
    path('api/scheduling/', include('apps.scheduling.urls')),
    path('api/notes/', include('apps.notes.urls')),
    path('api/chat/', include('apps.chat.urls')),
    path('api/ml/', include('apps.ml.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
