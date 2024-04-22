import jwt
from django.conf import settings
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.generics import GenericAPIView
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response

from authentication.serializers import ResetPasswordSerializer
from user.models import User


class ResetPasswordAPIView(GenericAPIView):
    permission_classes = (AllowAny,)
    queryset = User.objects.all()
    serializer_class = ResetPasswordSerializer

    def post(self, request: Request, *args, **kwargs) -> Response:
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data["token"]
        data = jwt.decode(token, settings.JWT_SECRET, algorithms=["HS256"])
        user = self.get_user(email=data["email"])
        user.set_password(serializer.validated_data["new_password1"])
        user.is_verified = True
        user.save()
        return Response(status=status.HTTP_204_NO_CONTENT)

    def get_user(self, email: str) -> User:
        queryset = self.get_queryset()
        return get_object_or_404(queryset, email=email)
