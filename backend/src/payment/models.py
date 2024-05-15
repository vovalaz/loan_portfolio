from django.contrib.auth import get_user_model
from django.db import models

from base.models import CreatedUpdatedAt
from credit.models import Credit


class Payment(CreatedUpdatedAt):
    STATUS_CHOICES = (
        ("pending", "Pending"),
        ("missed", "Missed"),
        ("paid", "Paid"),
        ("paid_late", "Paid late"),
    )

    credit = models.ForeignKey(Credit, on_delete=models.CASCADE)
    amount = models.FloatField()
    deadline = models.DateField(null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="pending")


class UserPayment(models.Model):
    payment = models.ForeignKey(Payment, on_delete=models.CASCADE, related_name="user_payments")
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
