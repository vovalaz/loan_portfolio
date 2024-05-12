from rest_framework import filters, permissions
from rest_framework.generics import ListAPIView

from credit.models import CreditType
from credit.serializers import CreditTypeSerializer


class CreditTypeListAPIView(ListAPIView):
    serializer_class = CreditTypeSerializer
    permission_classes = [permissions.AllowAny]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = "__all__"

    def get_queryset(self):
        queryset = CreditType.objects.all()
        return queryset
