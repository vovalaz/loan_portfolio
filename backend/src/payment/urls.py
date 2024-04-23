from rest_framework.routers import DefaultRouter

from payment.viewsets import PaymentViewSet

router = DefaultRouter()

router.register("payments", PaymentViewSet, basename="payments")

urlpatterns = router.urls
