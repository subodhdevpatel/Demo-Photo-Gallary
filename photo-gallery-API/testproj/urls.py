from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from testapp.views import Home

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include('testapp.urls')),
    path('', Home.as_view())
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
