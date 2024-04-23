from django.contrib.auth import get_user_model
from django.db import models

from base.models import CreatedUpdatedAt
from credit.models import Credit


class Payment(CreatedUpdatedAt):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    credit = models.ForeignKey(Credit, on_delete=models.DO_NOTHING)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
