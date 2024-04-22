from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView, TokenVerifyView

from authentication.views import RegisterAPIView, ResetPasswordAPIView

# Root: /api/
urlpatterns = [
    path("token/", TokenObtainPairView.as_view(), name="token-obtain-pair"),
    path("token/refresh/", TokenRefreshView.as_view(), name="token-refresh"),
    path("token/verify/", TokenVerifyView.as_view(), name="token-verify"),
    path("auth/register/", RegisterAPIView.as_view(), name="register"),
    path("auth/reset-password/", ResetPasswordAPIView.as_view(), name="reset-password"),
]
