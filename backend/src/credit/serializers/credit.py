from rest_framework import serializers

from credit.models import Credit


class CreditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credit
        fields = ["id", "user", "amount", "term_months", "rate", "purpose", "status"]


class UnauthorisedCreditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Credit
        fields = ["id", "amount", "term_months", "rate", "purpose", "status"]
