import uuid
from datetime import datetime
import numpy as np
import blurhash


def generate_unique_image_name(image_name):
    timestamp = datetime.now().strftime("%Y%m%d%H%M%S%f")

    random_uuid = uuid.uuid4().hex

    file_extension = image_name.split(".")[-1]
    new_file_name = image_name.split(".")[0]

    unique_image_name = f"{new_file_name}-{timestamp}-{random_uuid}.{file_extension}"

    return unique_image_name


def create_blur_imagehash_from_memory(image):
    """
    This will create blurhash string from image files in django request object.
    """
    max_size = (70, 50)
    image.thumbnail(max_size)

    image_np = np.array(image)
    hastr = blurhash.encode(image_np)

    return hastr
