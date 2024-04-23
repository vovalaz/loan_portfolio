from collections import OrderedDict

import jwt
from django.conf import settings
from django.core.validators import EmailValidator
from rest_framework import serializers


class ResetPasswordSerializer(serializers.Serializer):
    new_password1 = serializers.CharField(min_length=6)
    new_password2 = serializers.CharField(min_length=6)
    token = serializers.CharField()

    class Meta:
        email_validator = EmailValidator(message="Value 'email' is not valid.")

    def validate_token(self, value: str) -> str:
        try:
            data: dict = jwt.decode(value, settings.JWT_SECRET, algorithms=["HS256"])
        except jwt.exceptions.PyJWTError as exc:
            raise serializers.ValidationError(exc)

        if "email" in data:
            self._validate_email(data["email"])
        else:
            raise serializers.ValidationError("Value 'email' is missing.")
        return value

    def _validate_email(self, value: str) -> str:
        validator = self.Meta.email_validator
        return validator(value)

    def validate(self, attrs: OrderedDict) -> OrderedDict:
        new_password1, new_password2 = attrs["new_password1"], attrs["new_password2"]
        if new_password1 != new_password2:
            raise serializers.ValidationError("Make sure 'new_password1' and 'new_password2' are exactly the same.")
        return super().validate(attrs)
