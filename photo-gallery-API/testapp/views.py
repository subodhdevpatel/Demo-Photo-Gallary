from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import GetImageSerializer, UploadImageSerializer
from django.core.files.storage import default_storage
from .models import ImageLibrary
from .utils import generate_unique_image_name, create_blur_imagehash_from_memory
from django.views.generic.base import TemplateView
from rest_framework.pagination import PageNumberPagination
from django.conf import settings
from PIL import Image


class UploadImageView(APIView):
    """
    This will get multiple images from frontend, rename them and upload them onto the s3.
    """

    def post(self, request):
        images = request.FILES.getlist("image")
        if len(images) > settings.MAX_ALLOWED_IMAGES_AT_ONCE:
            return Response(
                {"message": "You cannot upload more than 20 images"},
                status=status.HTTP_403_FORBIDDEN,
            )
        serializer = UploadImageSerializer(data=request.data, many=True)
        if serializer.is_valid() and images:
            image_urls = []
            for image in images:
                imagea = Image.open(image)
                imagea = imagea.convert("RGB")
                if not image.content_type.startswith("image/"):
                    return Response(
                        {"message": "All uploaded files are not images"},
                        status=status.HTTP_403_FORBIDDEN,
                    )
                fname = generate_unique_image_name(image.name)
                file_path = f"photos/{fname}"
                default_storage.save(file_path, image)

                image_instance = ImageLibrary(image=file_path)
                image_url = default_storage.url(file_path)
                
                image_instance.blur_hash = create_blur_imagehash_from_memory(imagea)
                image_instance.save()
                image_urls.append(image_url)

            return Response(image_urls, status=status.HTTP_201_CREATED)
        return Response(
            serializer.errors or {"message": "No image selected"},
            status=status.HTTP_400_BAD_REQUEST,
        )


class ImageListView(APIView):
    """
    GET images:
    - This will fetch all images with 20 paginated.

    DELETE images:
    - If deleting any images from database it will first delete it from s3 server and than delete from database.
    """

    pagination_class = PageNumberPagination

    def get(self, request):
        images = ImageLibrary.objects.all()
        paginator = PageNumberPagination()
        paginated_images = paginator.paginate_queryset(images, request)
        serializer = GetImageSerializer(paginated_images, many=True)
        return paginator.get_paginated_response(serializer.data)

    def delete(self, request):
        image_ids = request.data.get("image_ids", [])
        images = ImageLibrary.objects.filter(id__in=image_ids)
        if images.count() == 0:
            return Response(
                {"message": "No images found!"}, status=status.HTTP_404_NOT_FOUND
            )

        for image in images:
            default_storage.delete(image.image.name)
            image.delete()

        return Response(
            {"message": "Images have been deleted!"}, status=status.HTTP_204_NO_CONTENT
        )


class Home(TemplateView):
    """
    Included endpoints with brief description.
    """

    template_name = "home.html"
