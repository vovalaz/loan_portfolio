from django.contrib.auth import get_user_model
from django.db import models

from base.models import CreatedUpdatedAt


class Credit(CreatedUpdatedAt):
    user = models.ForeignKey(get_user_model(), on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    term_months = models.IntegerField()
    rate = models.DecimalField(max_digits=4, decimal_places=2)
    purpose = models.CharField(max_length=120)
