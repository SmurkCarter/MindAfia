from django.urls import path
from .views import DisorderListView, DisorderDetailView

urlpatterns = [
    path("", DisorderListView.as_view()),
    path("<slug:slug>/", DisorderDetailView.as_view()),
]
