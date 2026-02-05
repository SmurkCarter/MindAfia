from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Disorder
from .serializers import DisorderSerializer


class DisorderListView(ListAPIView):
    queryset = Disorder.objects.filter(is_active=True)
    serializer_class = DisorderSerializer


class DisorderDetailView(RetrieveAPIView):
    queryset = Disorder.objects.filter(is_active=True)
    serializer_class = DisorderSerializer
    lookup_field = "slug"
