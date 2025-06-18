from PIL import Image
import os

"""
Converts png, jpeg, and webp to jpg
"""

def convert_to_jpg():
    supported_extensions = [".png", ".jpeg", ".webp"]
    
    for filename in os.listdir("."):
        ext = os.path.splitext(filename)[1].lower()
        if ext in supported_extensions:
            try:
                with Image.open(filename) as img:
                    rgb_img = img.convert("RGB")
                    new_filename = os.path.splitext(filename)[0] + ".jpg"
                    rgb_img.save(new_filename, "JPEG")
                    os.remove(filename)
                    print(f"Converted and removed: {filename}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")

def print_image_sizes():
    supported_extensions = ('.jpg', '.jpeg', '.png', '.webp', '.bmp', '.gif', '.tiff')

    for filename in os.listdir("."):
        if filename.lower().endswith(supported_extensions):
            try:
                with Image.open(filename) as img:
                    width, height = img.size
                    print(f"{filename} - {width}x{height}")
            except Exception as e:
                print(f"Could not open {filename}: {e}")

def resize_images_to_fixed_height(target_height=640):
    supported_extensions = ('.jpg', '.jpeg', '.png', '.webp')

    for filename in os.listdir("."):
        if filename.lower().endswith(supported_extensions):
            try:
                with Image.open(filename) as img:
                    img = img.convert("RGB")
                    width, height = img.size

                    # Calculate new width while preserving aspect ratio
                    new_width = int((target_height / height) * width)
                    resized_img = img.resize((new_width, target_height), Image.LANCZOS)

                    new_filename = os.path.splitext(filename)[0] + ".jpg"
                    resized_img.save(new_filename, "JPEG", quality=90)
                    print(f"Resized: {filename} -> {new_width}x{target_height}")
            except Exception as e:
                print(f"Error processing {filename}: {e}")




"""
FUNCTION CALLS
"""
# convert_to_jpg()
print_image_sizes()
