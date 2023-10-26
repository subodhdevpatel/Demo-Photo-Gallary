from django.urls import path
from .views import UploadImageView, ImageListView

urlpatterns = [
    path('upload/', UploadImageView.as_view(), name='upload-image'),
    path('images/', ImageListView.as_view(), name='get-images'),
]
