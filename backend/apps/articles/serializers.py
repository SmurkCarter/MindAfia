from rest_framework import serializers
from .models import Article


class ArticleListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            "title",
            "slug",
            "category",
            "summary",
            "assessment_type",
        )


class ArticleDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Article
        fields = (
            "title",
            "category",
            "content",
            "assessment_type",
            "created_at",
        )
