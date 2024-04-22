from django.shortcuts import get_object_or_404
from rest_framework import serializers

from credit.models import Credit
from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "user", "credit", "amount"]
        read_only_fields = ["user"]

    def validate_credit(self, value):
        user = self.context["request"].user
        credit = get_object_or_404(Credit, id=value)
        if credit.user != user:
            raise serializers.ValidationError("You can only make payments for your own credits.")
        return value
