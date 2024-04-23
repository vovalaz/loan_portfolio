from rest_framework import serializers

from credit.models import Credit


class CreditSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source="user.id")

    class Meta:
        model = Credit
        fields = "__all__"
        read_only_fields = ["user"]

    def create(self, validated_data):
        user = self.context["request"].user
        credit_request = Credit.objects.create(user=user, **validated_data)
        return credit_request
