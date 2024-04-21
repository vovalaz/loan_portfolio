from django.contrib.auth import get_user_model
from django.db import models


class Model(models.Model):
    class Meta:
        abstract = True

    def __str__(self) -> str:
        return f"<{self.__class__.__name__}: #{self.id}>"

    def __repr__(self) -> str:
        return self.__str__()


class CreatedUpdatedAt(Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
        ordering = ("-id",)


class CreatedLastModifiedBy(Model):
    created_by = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="created_%(class)s_set")
    last_modified_by = models.ForeignKey(
        get_user_model(), on_delete=models.CASCADE, related_name="modified_%(class)ss_set"
    )

    class Meta:
        abstract = True
        ordering = ("-id",)
