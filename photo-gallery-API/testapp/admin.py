from django.contrib import admin
from .models import ImageLibrary

class ImageLibraryAdmin(admin.ModelAdmin):
    list_display        = ['id', 'image_tag', 'blur_hash']

admin.site.register(ImageLibrary, ImageLibraryAdmin)
