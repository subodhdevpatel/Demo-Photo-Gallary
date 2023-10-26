from rest_framework import serializers
from .models import ImageLibrary

class UploadImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageLibrary
        fields = ('image',)

class GetImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ImageLibrary
        fields = '__all__'