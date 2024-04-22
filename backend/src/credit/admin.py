from django.contrib import admin

from credit.models import Credit


@admin.register(Credit)
class CreditAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "amount", "term_months", "rate", "created_at", "updated_at")
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("=id",)
    search_help_text = "Search by: id."
