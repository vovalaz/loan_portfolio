from django.urls import path

from rest_framework.routers import DefaultRouter

from credit.viewsets import CreditViewSet
from credit.views import CreditTypeListAPIView

router = DefaultRouter()

router.register("credits", CreditViewSet, basename="credits")

urlpatterns = router.urls

urlpatterns += [path("credit_types/", CreditTypeListAPIView.as_view(), name="credit_types"),]
