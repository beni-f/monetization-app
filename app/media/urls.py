from rest_framework import routers
from django.urls import path, include
from .views import MediaViewSet
router = routers.DefaultRouter()
router.register(r'media', MediaViewSet, basename='media')

urlpatterns = [
    path('', include(router.urls)),
    path('media/<int:pk>/record_view/', MediaViewSet.record_view, name='record_view'),
]