from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin

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
    )
    search_fields = ("=id", "first_name", "last_name", "email__icontains")
    search_help_text = "Search by: id, first_name, last_name, email."

    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
