from typing import Any
from django.utils import timezone
from rest_framework import exceptions, filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from credit.models import Credit, UserCredit
from credit.serializers import CreditSerializer
from payment.models import UserPayment
from payment.serializers import PaymentSerializer


class CreditViewSet(viewsets.ModelViewSet):
    serializer_class = CreditSerializer
    filter_backends = [filters.OrderingFilter]
    ordering_fields = "__all__"

    def get_permissions(self):
        if self.action == 'create':
            permission_classes = [permissions.AllowAny]
        else:
            permission_classes = [permissions.IsAuthenticated]
        return [permission() for permission in permission_classes]

    def get_queryset(self):
        queryset = Credit.objects.all()
        if self.action == "create" or self.action == "partial_update":
            return queryset
        queryset = queryset.exclude(status="draft")
        user = self.request.user
        return queryset if user.is_superuser else queryset.filter(user_credits__user=user)

    @action(detail=True, methods=['get'], permission_classes=[permissions.IsAuthenticated])
    def payments(self, request, pk=None):
        credit = self.get_object()
        payments = credit.payment_set.all()
        serializer = PaymentSerializer(payments, many=True)
        return Response(serializer.data)

    def get_payments(self, credit: Credit, payments_amount: list[float] = []):
        payments = []
        credit_type = credit.credit_type
        capital = float(credit.amount) * (1.0 + float(credit_type.rate) / 100.0)

        if not payments_amount:
            payments_amount = [float(credit.amount) / credit.term_months] * (
                credit.term_months - 1
            )
        for month_num, payment_amount in enumerate(payments_amount, start=1):
            payment_data = {
                "amount": round(payment_amount, 2),
                "deadline": str((timezone.now() + timezone.timedelta(days=31 * month_num)).date()),
            }
            capital = (capital - payment_amount) * ((1.0 + float(credit_type.rate) / 100.0) ** month_num)
            payments.append(payment_data)

        payment_data = {
            "amount": round(capital, 2),
            "deadline": str((timezone.now() + timezone.timedelta(days=31 * (len(payments_amount) + 1))).date()),
        }
        payments.append(payment_data)

        return payments

    def create_payments(self, payments: list[dict[str, Any]], credit: Credit):
        for payment_data in payments:
            payment_data["credit"] = credit.pk
            payment_serializer = PaymentSerializer(data=payment_data)
            if payment_serializer.is_valid():
                payment_serializer.save()
            else:
                return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def create(self, request: Request, *args, **kwargs):
        payments_amount = request.data.pop("payments", [])
        if payments_amount and len(payments_amount) != int(request.data.get("term_months")) - 1:
            raise exceptions.ValidationError("length of payments list must be same as term_months - 1")

        serializer = CreditSerializer(data=request.data)

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        credit = serializer.instance

        payments = self.get_payments(credit, payments_amount)

        summ_with_loan_interest = sum([payment["amount"] for payment in payments])
        credit_type = serializer.validated_data["credit_type"]
        annual_interest_rate_of_the_loan = (1 + credit_type.rate) ** 12 - 1

        general_expenses = summ_with_loan_interest - float(serializer.validated_data["amount"])

        credit.general_expenses = round(general_expenses, 2)
        credit.save()

        self.create_payments(payments, credit)

        headers = self.get_success_headers(serializer.data)
        credit_data = CreditSerializer(credit).data
        credit_data["payments"] = payments
        credit_data["annual_rate"] = annual_interest_rate_of_the_loan

        return Response(credit_data, status=status.HTTP_201_CREATED, headers=headers)

    def partial_update(self, request: Request, pk=None, *args, **kwargs):
        instance = self.get_object()
        partial = request.data

        if 'status' in partial and instance.status == 'draft' and partial['status'] != 'draft':
            user = request.user
            UserCredit.objects.get_or_create(credit=instance, user=user)
            payments = instance.payment_set.all()
            for payment in payments:
                UserPayment.objects.get_or_create(payment=payment, user=user)

        serializer = self.get_serializer(instance, data=partial, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response(serializer.data)

    @action(detail=False, methods=["post"], permission_classes=[permissions.IsAdminUser])
    def grade_credits(self, request: Request):
        credit_ids = request.data.get("credit_ids", [])
        credits = Credit.objects.filter(id__in=credit_ids)
        grades = {}
        for credit in credits:
            grade = 0
            grades[credit.id] = grade
        return Response(grades)
