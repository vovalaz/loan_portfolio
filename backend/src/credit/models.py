from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from django.db import models

from base.models import CreatedUpdatedAt


class CreditType(models.Model):
    name = models.CharField(max_length=100)
    rate = models.FloatField()
    min_amount = models.FloatField()
    max_amount = models.FloatField()
    min_term_months = models.IntegerField()
    max_term_months = models.IntegerField()

    def clean(self):
        if self.min_amount >= self.max_amount:
            raise ValidationError("Minimum amount must be less than maximum amount.")
        if self.min_term_months >= self.max_term_months:
            raise ValidationError("Minimum term months must be less than maximum term months.")

    def __str__(self):
        return self.name


class Credit(CreatedUpdatedAt):
    STATUS_CHOICES = (
        ("draft", "Draft"),
        ("waiting", "Waiting for Approval"),
        ("approved", "Approved"),
        ("rejected", "Rejected"),
        ("ongoing", "Ongoing"),
        ("paid", "Paid"),
        ("written_off", "Written off"),
    )

    amount = models.FloatField()
    term_months = models.IntegerField()
    credit_type = models.ForeignKey(CreditType, on_delete=models.DO_NOTHING)
    purpose = models.CharField(max_length=200)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default="draft")
    general_expenses = models.FloatField(null=True, blank=True)
    net_comprehended_income = models.FloatField(null=True, blank=True)

    def clean(self):
        super().clean()
        if self.amount < self.credit_type.min_amount or self.amount > self.credit_type.max_amount:
            raise ValidationError("Amount is not within the valid range for this credit type.")
        if self.term_months < self.credit_type.min_term_months or self.term_months > self.credit_type.max_term_months:
            raise ValidationError("Term months is not within the valid range for this credit type.")

    def save(self, *args, **kwargs):
        self.full_clean()
        super().save(*args, **kwargs)


class UserCredit(models.Model):
    credit = models.ForeignKey(Credit, on_delete=models.CASCADE, related_name="user_credits")
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
