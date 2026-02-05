from django.urls import path
from .views import SubmitAssessmentView, PatientAssessmentListView

urlpatterns = [
    path("submit/", SubmitAssessmentView.as_view()),
    path("my-results/", PatientAssessmentListView.as_view()),
]
