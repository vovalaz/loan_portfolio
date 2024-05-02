from rest_framework import filters, permissions, viewsets

from payment.models import Payment
from payment.serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = "__all__"

    def get_queryset(self):
        queryset = Payment.objects.all()
        user = self.request.user
        return queryset if user.is_superuser else queryset.filter(user=user)
