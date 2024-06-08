from django.contrib import admin

from credit.models import Credit, CreditType, UserCredit


@admin.register(Credit)
class CreditAdmin(admin.ModelAdmin):
    list_display = (
        "id",
        "amount",
        "term_months",
        "credit_type",
        "created_at",
        "updated_at",
        "purpose",
        "status",
        "general_expenses",
        "net_comprehended_income",
    )
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("=id",)
    search_help_text = "Search by: id."


@admin.register(CreditType)
class CreditTypeAdmin(admin.ModelAdmin):
    list_display = ("id", "name", "rate", "min_amount", "max_amount", "min_term_months", "max_term_months")
    search_fields = ("=id",)
    search_help_text = "Search by: id."


@admin.register(UserCredit)
class UserCreditAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "credit")
