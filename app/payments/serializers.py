from .models import Transaction

from rest_framework.serializers import ModelSerializer

class TransactionSerializer(ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'
        read_only_fields = ('status', 'created_at', 'updated_at')
