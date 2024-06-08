from rest_framework import serializers

from credit.models import Credit, CreditType, UserCredit
from user.serializers import UserSerializer


class CreditSerializer(serializers.ModelSerializer):
    credit_type = serializers.PrimaryKeyRelatedField(queryset=CreditType.objects.all())
    user = serializers.SerializerMethodField()

    class Meta:
        model = Credit
        fields = [
            "id",
            "amount",
            "term_months",
            "credit_type",
            "purpose",
            "status",
            "general_expenses",
            "net_comprehended_income",
            "user",
        ]
        extra_kwargs = {"general_expenses": {"read_only": True}}

    def get_user(self, obj):
        user_credit = UserCredit.objects.filter(credit=obj).first()
        return UserSerializer(user_credit.user).data if user_credit else None
