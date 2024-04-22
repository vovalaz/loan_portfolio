from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("authentication.urls")),
    path("api/", include("credit.urls")),
    path("api/", include("payment.urls")),
    path("api/", include("user.urls")),
]
