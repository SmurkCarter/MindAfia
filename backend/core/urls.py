from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.http import HttpResponse
from django.conf.urls.static import static
from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView

def index(request):
    return HttpResponse("<h1>Telepsychiatry API</h1><p>Backend is running.</p>")

urlpatterns = [
    path("", index, name="index"), 
    path('admin/', admin.site.urls),
    path('api/auth/', include('apps.authentication.urls')),
    #path('api/patients/', include('apps.patients.urls')),
    path('api/clinicians/', include('apps.clinicians.urls')),
    path('api/scheduling/', include('apps.scheduling.urls')),
    path('api/notes/', include('apps.notes.urls')),
    path('api/chat/', include('apps.chat.urls')),
    path('api/ml/', include('apps.ml.urls')),
    path("api/appointments/", include("apps.appointments.urls")),
    path("api/clinical-notes/", include("apps.clinical_notes.urls")),
    path("api/schema/", SpectacularAPIView.as_view()),
    path("api/docs/", SpectacularSwaggerView.as_view(url_name="schema")),
    path("api/assessments/", include("apps.assessments.urls")),
    path("api/articles/", include("apps.articles.urls")),
    path("api/articles/", include("apps.articles.urls")),
    path("api/disorders/", include("apps.disorders.urls")),
    path("api/treatments/", include("apps.treatments.urls")),





]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
