from django.urls import path
from .views import PopulationStatsView

urlpatterns = [
    path("population/", PopulationStatsView.as_view()),
]
