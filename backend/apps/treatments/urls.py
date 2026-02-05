from django.urls import path
from .views import TreatmentListView, TreatmentDetailView

urlpatterns = [
    path("", TreatmentListView.as_view()),
    path("<slug:slug>/", TreatmentDetailView.as_view()),
]
