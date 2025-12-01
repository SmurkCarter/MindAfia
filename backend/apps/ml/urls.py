from django.urls import path
from . import predictors

urlpatterns = [
    path("risk/", predictors.risk_score, name="risk-score"),
]
