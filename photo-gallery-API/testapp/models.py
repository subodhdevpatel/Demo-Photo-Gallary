from django.db import models
from django.utils.safestring import mark_safe

class ImageLibrary(models.Model):
    image = models.ImageField(upload_to='photos/')
    blur_hash = models.TextField(null=True)

    def doc_link(self): #to show image link in image table in django-admin
        return self.image.url

    def image_tag(self): #to show image like thumbnails in django-admin
        if self.image.url is not None:
            return mark_safe('<img src="{}" width="70"/>'.format(self.image.url))
        else:
            return ""
