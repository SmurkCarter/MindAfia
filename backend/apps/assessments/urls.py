from django.urls import path
from .views import PopulationRiskView, MostCommonConditionView
from .views import (
    SubmitAssessmentView,
    PatientAssessmentListView,
    ClinicianAssessmentListView,
)

urlpatterns = [
    path("submit/", SubmitAssessmentView.as_view()),
    path("my/", PatientAssessmentListView.as_view()),
      path("analytics/population-risk/", PopulationRiskView.as_view()),
    path("analytics/most-common/", MostCommonConditionView.as_view()),
    path("patient/<int:patient_id>/", ClinicianAssessmentListView.as_view()),
]
