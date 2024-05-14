from rest_framework import serializers

from credit.models import Credit, CreditType


class CreditSerializer(serializers.ModelSerializer):
    credit_type = serializers.PrimaryKeyRelatedField(queryset=CreditType.objects.all())

    class Meta:
        model = Credit
        fields = ["id", "amount", "term_months", "credit_type", "purpose", "status", "general_expenses"]
        extra_kwargs = {"general_expenses": {"read_only": True}}
