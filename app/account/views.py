from django.shortcuts import render
from django.db import transaction

import uuid

from rest_framework import status
from rest_framework.generics import CreateAPIView, RetrieveAPIView
from rest_framework.permissions import AllowAny

from .serializers import CustomUserSerializer
from .models import CustomUser

from rest_framework.views import APIView
from rest_framework.response import Response

# Create your views here.
class RegisterView(CreateAPIView):
    """
    API View to register a new user
    """
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]

    @transaction.atomic
    def create(self, request, *args, **kwargs):
        print('creating')
        data = request.data
        referral_code = data.pop('referral_code', None)
        print(referral_code)

        referred_by = None

        # Validate referral code, if provided
        if referral_code:
            try:
                referred_by = CustomUser.objects.get(referral_code=referral_code)
            except CustomUser.DoesNotExist:
                return Response(
                    {"error": "Invalid referral code"},
                    status=status.HTTP_400_BAD_REQUEST
                )

        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)

        try:
            # Create the user first
            user = serializer.save()

            # Prevent self-referral
            if referred_by and referred_by.referral_code == user.referral_code:
                return Response(
                    {"error": "You cannot use your own referral code"},
                    status=status.HTTP_400_BAD_REQUEST
                )

            # Reward both if valid referral
            if referred_by:
                user.coins += 100
                referred_by.coins += 100
                user.save()
                referred_by.save()

            return Response(
                self.get_serializer(user).data,
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class UserProfileView(RetrieveAPIView):
    serializer_class = CustomUserSerializer
    permission_classes = [AllowAny]
    queryset = CustomUser.objects.all()

class UpdateUserLimitsView(APIView):
    def post(self, request):
        data = request.data
        user = request.user
        
        plan = data.get('plan')
        if plan == 'Pro':
            user.referral_code = uuid.uuid4()
            user.watch_limit += 10
            user.coin_multiplier = 2
            user.subscription = plan

        elif plan == 'Premium':
            user.referral_code = uuid.uuid4()
            user.watch_limit += 50
            user.coin_multiplier = 3
            user.subscription = plan
        
        user.save()

        return Response({
            'watch_limit': user.watch_limit,
            'coin_multiplier': user.coin_multiplier,
            'message': 'Account limits updated successfully'
        })