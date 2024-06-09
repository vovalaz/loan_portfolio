from django.urls import path
from rest_framework.routers import DefaultRouter

from credit.views import CreditTypeListAPIView
from credit.viewsets import CreditViewSet

router = DefaultRouter()

router.register("credits", CreditViewSet, basename="credits")

urlpatterns = router.urls

urlpatterns += [
    path("credit_types/", CreditTypeListAPIView.as_view(), name="credit_types"),
]
