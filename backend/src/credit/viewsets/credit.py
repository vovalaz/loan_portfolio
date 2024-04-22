from rest_framework import permissions, viewsets

from credit.models import Credit
from credit.serializers import CreditSerializer


class CreditViewSet(viewsets.ModelViewSet):
    serializer_class = CreditSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        queryset = Credit.objects.all()
        user = self.request.user
        return queryset if user.is_superuser else queryset.filter(user=user)
