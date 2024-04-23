from django.contrib import admin

from payment.models import Payment


@admin.register(Payment)
class PaymentAdmin(admin.ModelAdmin):
    list_display = ("id", "user", "credit", "amount", "created_at", "updated_at")
    date_hierarchy = "created_at"
    readonly_fields = ("created_at", "updated_at")
    search_fields = ("=id",)
    search_help_text = "Search by: id."
