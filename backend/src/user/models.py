from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models

from base.models import CreatedUpdatedAt


class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


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

    objects = CustomUserManager()

    class Meta:
        ordering = ("-id",)
        db_table = "users"
        abstract = False

    def __str__(self) -> str:
        return f"<User: #{self.id} {self.email}>"
