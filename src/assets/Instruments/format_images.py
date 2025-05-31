import os
from PIL import Image

MAX_WIDTH = 720

script_dir = os.path.dirname(os.path.abspath(__file__))
directory_path = os.path.abspath(os.path.join(script_dir, '..', 'instrument-pics'))

for filename in os.listdir(directory_path):
    if filename.lower().endswith('.jpg'):
        file_path = os.path.join(directory_path, filename)
        try:
            with Image.open(file_path) as img:
                width, height = img.size

                if width > MAX_WIDTH:
                    new_height = int((MAX_WIDTH / width) * height)
                    resized_img = img.resize((MAX_WIDTH, new_height), Image.LANCZOS)

                    # Convert RGBA to RGB if necessary
                    if resized_img.mode == 'RGBA':
                        resized_img = resized_img.convert('RGB')

                    resized_img.save(file_path, optimize=True, quality=85)
                    print(f"Resized {filename}: {width}x{height} -> {MAX_WIDTH}x{new_height}")
                else:
                    pass
                    # print(f"Skipped {filename}: already smaller than {MAX_WIDTH}px wide")
        except Exception as e:
            print(f"Error processing {filename}: {e}")
