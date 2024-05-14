from rest_framework import serializers

from credit.models import CreditType


class CreditTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreditType
        fields = "__all__"
