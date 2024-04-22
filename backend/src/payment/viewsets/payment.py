from rest_framework import permissions, viewsets

from payment.models import Payment
from payment.serializers import PaymentSerializer


class PaymentViewSet(viewsets.ModelViewSet):
    serializer_class = PaymentSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Payment.objects.all()
        user = self.request.user
        return queryset if user.is_superuser else queryset.filter(user=user)
