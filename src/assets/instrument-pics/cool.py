import os
from PIL import Image

def get_image_dimensions(directory):
    supported_extensions = ('.png', '.jpg', '.jpeg', '.bmp', '.gif', '.tiff', '.webp')

    for root, _, files in os.walk(directory):
        for file in files:
            if file.lower().endswith(supported_extensions):
                filepath = os.path.join(root, file)
                try:
                    with Image.open(filepath) as img:
                        width, height = img.size
                        print(f"{filepath}: {width} x {height}")
                except Exception as e:
                    print(f"Could not open {filepath}: {e}")


directory_path = os.getcwd()
get_image_dimensions(directory_path)
