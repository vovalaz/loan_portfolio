from collections import OrderedDict

from django.contrib.auth import get_user_model
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        exclude = ("user_permissions", "groups")
        read_only_fields = ("last_login", "is_staff", "is_superuser")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data: OrderedDict) -> get_user_model:
        password = validated_data.pop("password", None)
        instance = super().create(validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance

    def update(self, instance, validated_data: OrderedDict) -> get_user_model:
        password = validated_data.pop("password", None)
        instance = super().update(instance, validated_data)
        if password is not None:
            instance.set_password(password)
            instance.save()
        return instance
