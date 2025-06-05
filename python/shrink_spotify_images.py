from PIL import Image

def resize_image(input_path, output_path, size=(640, 640)):
    try:
        with Image.open(input_path) as img:
            resized_img = img.resize(size, Image.LANCZOS)

            if resized_img.mode == 'RGBA':
                resized_img = resized_img.convert('RGB')

            resized_img.save(output_path, format='JPEG')
            print(f"Image resized and saved to {output_path}")
    except Exception as e:
        print(f"Error: {e}")