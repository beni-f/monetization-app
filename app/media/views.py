from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from urllib.parse import urlparse, parse_qs

from rest_framework import serializers
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAdminUser
from rest_framework.decorators import action

from .models import Media, WatchedMedia
from .serializers import MediaSerializer
from .permissions import IsAdvertiser, IsViewer, IsMediaOwner

from django_filters.rest_framework import DjangoFilterBackend

# Create your views here.
class MediaViewSet(ModelViewSet):
    serializer_class = MediaSerializer
    queryset = Media.objects.all()
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['category']

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()

        if WatchedMedia.objects.filter(user=request.user, media=instance).exists():
            return Response({'message': 'You have already watched this video.'}, status=status.HTTP_403_FORBIDDEN)
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)
    
    def get_permissions(self):
        if self.action == 'create':
            return [IsAdminUser()]
        elif self.action == 'list':
            return [IsAuthenticated()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        elif self.action == 'retrieve':
            return [IsAuthenticated()]
        return [IsAuthenticated()]

    def perform_create(self, serializer):
        url = serializer.validated_data.get('url')
        media_type = serializer.validated_data.get('category')
        print(media_type)
        video_id = self.extract_video_id(url, media_type)
        print(video_id)
        if not video_id:
            raise serializers.ValidationError(f"Invalid {media_type} URL")
        
        serializer.save(url=video_id)

    def extract_video_id(self, url, media_type):
        parsed_url = urlparse(url)
        
        if media_type == 'Youtube':
            if parsed_url.netloc == 'youtu.be':
                return parsed_url.path.lstrip('/')
            if parsed_url.netloc in ('www.youtube.com', 'youtube.com'):
                if parsed_url.path == '/watch':
                    query = parse_qs(parsed_url.query)
                    return query.get('v', [None])[0]
                if parsed_url.path.startswith('/embed/'):
                    return parsed_url.path.split('/')[2]
        elif media_type == 'Instagram':
            if 'instagram.com/reel/' in url:
                return url.split('/reel/')[1].split('/')[0]
        elif media_type == 'Tiktok':
            if 'tiktok.com/@' in url and '/video/' in url:
                return url.split('/video/')[1].split('/')[0]
        
        return None

    @csrf_exempt
    @action(detail=True, methods=['post'])
    def record_view(self, request, pk=None):
        media = self.get_object()
        user = request.user
        duration = request.data.get('duration', 0)

        watched, created = WatchedMedia.objects.get_or_create(
            user=user,
            media=media,
            defaults={'duration': duration}
        )

        if not created:
            watched.duration = duration
            watched.save()

        if duration >= 60:
            user.coins += media.coins * user.coin_multiplier
            user.videos_watched += 1
            media.views += 1
            media.save()
            user.save()

        return Response({'status': 'view recorded'})