"""
Goes through every file in src/assets/Data and simply fixes the 
indentation to be 4
"""

import os
import json
from pathlib import Path

current_file = Path(__file__).resolve()


directory = current_file.parent / "../src/assets/Data"
directory = directory.resolve()

for filename in os.listdir(directory):
    if filename.endswith(".json"):
        file_path = os.path.join(directory, filename)


        with open(file_path, 'r', encoding='utf-8') as file:
            data = json.load(file)


        with open(file_path, 'w', encoding='utf-8') as file:
            json.dump(data, file, indent=4, ensure_ascii=False)
