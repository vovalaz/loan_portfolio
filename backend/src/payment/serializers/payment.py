from rest_framework import serializers

from payment.models import Payment


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id", "user", "credit", "amount", "deadline", "status"]

    def validate(self, data):
        credit_user = data["credit"].user
        payment_user = data["user"]
        if credit_user != payment_user:
            raise serializers.ValidationError("User of the credit and payment must be the same.")
        return data
