import os
from PIL import Image

def resize_and_replace_image(image_path, size=(640, 640)):
    try:
        with Image.open(image_path) as img:
            resized_img = img.resize(size, Image.LANCZOS)

            if resized_img.mode == 'RGBA':
                resized_img = resized_img.convert('RGB')

            ext = os.path.splitext(image_path)[1].lower()


            if ext in ['.jpg', '.jpeg']:
                resized_img.save(image_path, format='JPEG')
            elif ext == '.png':
                resized_img.save(image_path, format='PNG')
            else:
                resized_img.save(image_path)


            print(f"Resized and replaced: {image_path}")
    except Exception as e:
        print(f"Error processing {image_path}: {e}")




def resize_images_in_directory(directory, size=(640, 640)):
    image_extensions = {'.jpg', '.jpeg', '.png', '.gif', '.bmp', '.tiff', '.webp'}

    try:
        files = os.listdir(directory)
        image_files = [f for f in files if os.path.splitext(f)[1].lower() in image_extensions]

        if not image_files:
            print("No image files found in the directory.")
            return

        for filename in image_files:
            full_path = os.path.join(directory, filename)
            resize_and_replace_image(full_path, size)

    except FileNotFoundError:
        print("The specified directory does not exist.")
    except Exception as e:
        print(f"An error occurred: {e}")


directory_path = "../src/assets/ArtistPics"
resize_images_in_directory(directory_path)
