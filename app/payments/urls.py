from django.urls import path
from .views import InitiatePaymentView, VerifyPaymentView, withdraw

urlpatterns = [
    path('pay/initiate/', InitiatePaymentView.as_view(), name='initiate-payment'),
    path('pay/verify/<str:tx_ref>/', VerifyPaymentView.as_view(), name='verify-payment'),
    path('withdraw/', withdraw, name='withdraw'),
]