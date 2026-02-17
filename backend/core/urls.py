from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static



from drf_spectacular.views import (
    SpectacularAPIView,
    SpectacularSwaggerView,
)

urlpatterns = [
    # Admin
    path("admin/", admin.site.urls),

    # Auth
    path("api/auth/", include("apps.authentication.urls")),

    # Core APIs
    path("api/clinicians/", include("apps.clinicians.urls")),
    path("api/patient/", include("apps.profiles.urls")),
    path("api/appointments/", include("apps.appointments.urls")),
    path("api/clinical-notes/", include("apps.clinical_notes.urls")),
    path("api/assessments/", include("apps.assessments.urls")),

    # Knowledge base
    path("api/articles/", include("apps.articles.urls")),
    path("api/disorders/", include("apps.disorders.urls")),
    path("api/treatments/", include("apps.treatments.urls")),

    # OpenAPI / Swagger
    path("api/schema/", SpectacularAPIView.as_view(), name="schema"),
    path(
        "api/docs/",
        SpectacularSwaggerView.as_view(url_name="schema"),
        name="swagger-ui",
    ),
    path("api/analytics/", include("apps.analytics.urls")),

]



if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
