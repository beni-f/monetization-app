from rest_framework.permissions import BasePermission

class IsAdvertiser(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Advertiser'
    
class IsViewer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'Viewer'
    
class IsMediaOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj.advertiser