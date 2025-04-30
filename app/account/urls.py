from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from django.urls import path

from .views import RegisterView, UserProfileView, UpdateUserLimitsView

urlpatterns = [
    path('register/', RegisterView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('user/<int:pk>', UserProfileView.as_view(), name='user_profile'),
    path('user/update-limits/', UpdateUserLimitsView.as_view(), name='update_user_limits'),
]