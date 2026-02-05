from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Treatment
from .serializers import TreatmentSerializer


class TreatmentListView(ListAPIView):
    queryset = Treatment.objects.filter(is_active=True)
    serializer_class = TreatmentSerializer


class TreatmentDetailView(RetrieveAPIView):
    queryset = Treatment.objects.filter(is_active=True)
    serializer_class = TreatmentSerializer
    lookup_field = "slug"
