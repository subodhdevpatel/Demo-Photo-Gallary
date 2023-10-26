from django.db.models.signals import post_delete, post_save
from django.dispatch import receiver
from django.core.files.storage import default_storage
from .models import ImageLibrary

@receiver(post_delete, sender=ImageLibrary)
def delete_image_from_s3(sender, instance, **kwargs):
    """
    Signal handler to delete image from AWS S3 when ImageModel instance is deleted.
    """
    file_path = instance.image.name

    default_storage.delete(file_path)
