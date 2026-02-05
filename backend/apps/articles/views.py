from rest_framework.generics import ListAPIView, RetrieveAPIView
from .models import Article
from .serializers import (
    ArticleListSerializer,
    ArticleDetailSerializer,
)


class ArticleListView(ListAPIView):
    queryset = Article.objects.filter(is_published=True)
    serializer_class = ArticleListSerializer


class ArticleDetailView(RetrieveAPIView):
    queryset = Article.objects.filter(is_published=True)
    serializer_class = ArticleDetailSerializer
    lookup_field = "slug"
