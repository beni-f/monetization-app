from rest_framework import serializers
from urllib.parse import urlparse

from .models import Media

class MediaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Media
        fields = ['id', 'url', 'title', 'uploaded_at', 'views', 'category', 'coins']
        extra_kwargs = {
            'uploaded_at': {'read_only': True},
            'views': {'read_only': True},
        }

