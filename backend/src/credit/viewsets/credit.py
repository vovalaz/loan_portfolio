from django.utils import timezone
from rest_framework import exceptions, filters, permissions, status, viewsets
from rest_framework.decorators import action
from rest_framework.request import Request
from rest_framework.response import Response

from credit.models import Credit
from credit.serializers import CreditSerializer, UnauthorisedCreditSerializer
from payment.serializers import PaymentSerializer


class CreditViewSet(viewsets.ModelViewSet):
    serializer_class = CreditSerializer
    permission_classes = [permissions.IsAuthenticated]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = "__all__"

    def get_queryset(self):
        queryset = Credit.objects.all()
        user = self.request.user
        return queryset if user.is_superuser else queryset.filter(user=user)

    def get_payments(self, credit_data: dict, user_id: int = 0, payments_amount: list[float] = []):
        payments = []
        capital = float(credit_data["amount"]) * (1.0 + float(credit_data["rate"]) / 100.0)

        if not payments_amount:
            payments_amount = [float(credit_data["amount"]) / credit_data["term_months"]] * (
                credit_data["term_months"] - 1
            )  # noqa
        for month_num, payment_amount in enumerate(payments_amount, start=1):
            payment_data = {
                "user": user_id,
                "credit": credit_data["id"] if "id" in credit_data else 0,
                "amount": round(payment_amount, 2),
                "deadline": str((timezone.now() + timezone.timedelta(days=31 * month_num)).date()),
            }
            capital = (capital - payment_amount) * ((1.0 + float(credit_data["rate"]) / 100.0) ** month_num)
            payments.append(payment_data)

        payment_data = {
            "user": user_id,
            "credit": credit_data["id"] if "id" in credit_data else 0,
            "amount": round(capital, 2),
            "deadline": str((timezone.now() + timezone.timedelta(days=31 * (len(payments_amount) + 1))).date()),
        }
        payments.append(payment_data)

        return payments

    def create(self, request: Request, *args, **kwargs):
        payments_amount = request.data.pop("payments", [])
        if payments_amount and len(payments_amount) != request.data.get("term_months") - 1:
            raise exceptions.ValidationError("length of payments list must be same as term_months - 1")

        user = request.user
        request.data["user"] = user.id
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            self.perform_create(serializer)
            credit = serializer.instance

            payments = self.get_payments(serializer.data, user.id, payments_amount)
            for payment_data in payments:
                payment_serializer = PaymentSerializer(data=payment_data)
                if payment_serializer.is_valid():
                    payment_serializer.save()
                else:
                    credit.delete()
                    return Response(payment_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            headers = self.get_success_headers(serializer.data)
            credit_data = serializer.data
            credit_data["payments"] = payments

            return Response(credit_data, status=status.HTTP_201_CREATED, headers=headers)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["get"], permission_classes=[permissions.AllowAny])
    def calculate_details(self, request: Request):
        serializer = UnauthorisedCreditSerializer(data=request.data)
        if serializer.is_valid():
            rate = float(serializer.data["rate"])
            summ_with_loan_interest = 0
            payments = self.get_payments(serializer.data)
            for i, payment in enumerate(payments, start=1):
                summ_with_loan_interest += payment["amount"] / ((1 + rate) ** i)

            amount_lost_to_loan_interest = summ_with_loan_interest - float(serializer.data["amount"])
            annual_interest_rate_of_the_loan = 0
            response_data = serializer.validated_data
            response_data["amount_lost_to_loan_interest"] = amount_lost_to_loan_interest
            response_data["annual_interest_rate_of_the_loan"] = annual_interest_rate_of_the_loan
            return Response(serializer.validated_data)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=["post"], permission_classes=[permissions.IsAdminUser])
    def grade_credits(self, request: Request):
        credit_ids = request.data.get("credit_ids", [])
        credits = Credit.objects.filter(id__in=credit_ids)
        grades = {}  # Dictionary to store credit_id: grade pairs
        # Logic to grade credits
        # Example grading logic:
        for credit in credits:
            grade = 0  # Example grade calculation
            grades[credit.id] = grade
        return Response(grades)
