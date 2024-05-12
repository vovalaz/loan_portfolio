from django.contrib.auth.models import AbstractUser
from django.db import models

from base.models import CreatedUpdatedAt


class User(AbstractUser, CreatedUpdatedAt):
    # Model configuration
    EMAIL_FIELD = "email"
    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = []
    # Custom object manager
    # Overridden AbstractUser's fields
    username = None
    date_joined = None
    email = models.EmailField(help_text="User Email", unique=True, max_length=64)
    risk = models.FloatField(default=0.1)

    class Meta:
        ordering = ("-id",)
        db_table = "users"
        abstract = False

    def __str__(self) -> str:
        return f"<User: #{self.id} {self.email}>"
