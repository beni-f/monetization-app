from django.shortcuts import render

import requests
import json
import uuid
from django.conf import settings

from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import Transaction
from .serializers import TransactionSerializer

MIN_WITHDRAWAL = 100
EXCHANGE_RATE = 1
CHAPA_URL = "https://api.chapa.co/v1/transfers"


class InitiatePaymentView(APIView):
    def post(self, request):
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            transaction = serializer.save()

            tx_ref = f"chapa-{uuid.uuid4().hex}"
            transaction.tx_ref = tx_ref
            transaction.save()

            chapa_url = "https://api.chapa.co/v1/transaction/initialize"
            headers = {
                "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}",
                "Content-Type": "application/json"
            }

            payload = {
                "plan": transaction.plan,
                "amount": str(transaction.amount),
                "currency": transaction.currency,
                "email": transaction.email,
                "first_name": transaction.first_name,
                "last_name": transaction.last_name,
                "phone_number": transaction.phone_number,
                "tx_ref": tx_ref,
                "callback_url": f"{settings.BASE_URL}/api/pay/verify/{tx_ref}",
                "return_url": f"{settings.FRONTEND_URL}/payment/status/{tx_ref}",
                "customization": {
                    "title": "Upgrade Payment",
                    "description": "Complete your payment"
                },
                "payment_methods": ["telebirr", "card", "bank"]
            }

            try:
                response = requests.post(chapa_url, json=payload, headers=headers)
                response.raise_for_status()

                data = response.json()           

                return Response({
                    "checkout_url": data['data']['checkout_url'],
                    "tx_ref": tx_ref
                }, status=status.HTTP_200_OK)
            except:
                transaction.status = 'failed'
                transaction.save()
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class VerifyPaymentView(APIView):
    def get(self, request, tx_ref):
        try:
            transaction = Transaction.objects.get(tx_ref=tx_ref)
            chapa_url = f"https://api.chapa.co/v1/transaction/verify/{tx_ref}"
            headers = {
                "Authorization": f"Bearer {settings.CHAPA_SECRET_KEY}"
            }

            response = requests.get(chapa_url, headers=headers)
            response.raise_for_status()
            data = response.json()

            if data['status'] == 'success':
                transaction.status = 'completed'
                transaction.payment_method = data['data']['method']
                transaction.save()
                return Response({
                    "status": "completed",
                    "plan": transaction.plan,
                }, status=status.HTTP_200_OK)
            
            else:
                transaction.status = 'failed'
                transaction.save()
                return Response({"status": "failed"}, status=status.HTTP_400_BAD_REQUEST)
        except Transaction.DoesNotExist:
            return Response(
                {"error": "Transaction not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except requests.exceptions.RequestException as e:
            return Response(
                {"error": "Payment verification failed"},
                status=status.HTTP_400_BAD_REQUEST
            )

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def withdraw(request):
    user = request.user
    data = request.data
    
    try:
        # Validate required fields
        required_fields = ['account_name', 'account_number', 'bank_code', 'amount']
        if not all(field in data for field in required_fields):
            return Response({'message': 'Missing required fields'}, status=400)

        payload = {
            "account_name": data['account_name'],
            "account_number": data['account_number'],
            "bank_code": data['bank_code'],
            "amount": str(data['amount']),
            "currency": "ETB",
            "reference": str(uuid.uuid4()),
        }

        headers = {
            'Authorization': f'Bearer {settings.CHAPA_SECRET_KEY}',
            'Content-Type': 'application/json'
        }

        # Make request to Chapa API
        response = requests.post(
            "https://api.chapa.co/v1/transfers",
            json=payload,
            headers=headers
        )

        if response.status_code == 200:
            user.coins -= float(data['amount'])
            user.save()
            
            return Response({
                'message': 'Transfer initiated successfully',
                'reference': payload['reference'],
                'data': response.json()
            })
        else:
            return Response({
                'message': 'Transfer failed',
                'error': response.json()
            }, status=400)

    except Exception as e:
        return Response({
            'message': 'Processing failed',
            'error': str(e)
        }, status=500)