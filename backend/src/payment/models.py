from django.contrib.auth import get_user_model
from django.db import models

from base.models import CreatedUpdatedAt


class Payment(CreatedUpdatedAt):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
