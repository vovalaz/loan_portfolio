from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _

from user.models import User

admin.site.site_header = "Loan portfolio administration"
admin.site.site_title = "Administration"
admin.site.index_title = "Loan portfolio"


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    ordering = ("-id",)
    list_display = (
        "id",
        "email",
        "first_name",
        "last_name",
        "created_at",
        "updated_at",
        "risk",
    )
    exclude = ("date_joined",)
    search_fields = ("=id", "first_name", "last_name", "email__icontains")
    search_help_text = "Search by: id, first_name, last_name, email."

    fieldsets = (
        (
            _("Main info"),
            {
                "fields": (
                    "email",
                    "password",
                    "first_name",
                    "last_name",
                )
            },
        ),
        (
            _("Permissions"),
            {
                "fields": (
                    "is_active",
                    "is_staff",
                    "is_superuser",
                ),
            },
        ),
        (
            _("Important dates"),
            {
                "fields": (
                    "last_login",
                    "created_at",
                    "updated_at",
                )
            },
        ),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": ("email", "password1", "password2"),
            },
        ),
    )

    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
