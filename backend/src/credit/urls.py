from rest_framework.routers import DefaultRouter

from credit.viewsets import CreditViewSet

router = DefaultRouter()

router.register("credits", CreditViewSet, basename="credits")

urlpatterns = router.urls
