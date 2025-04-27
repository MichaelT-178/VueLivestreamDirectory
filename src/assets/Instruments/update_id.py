import json
import re
from nice import clean_text
from termcolor import colored as c

def remove_prefix(text):
    # Remove things like (GPPCB) - at the beginning
    return re.sub(r'^\([^)]*\)\s*-\s*', '', text)

with open("instruments.json", 'r', encoding='utf-8') as file:
    content = json.load(file)
    instruments = content['Instruments']

for idx, instrument in enumerate(instruments, start=1):
    instrument['id'] = idx
    cleaned_name = remove_prefix(instrument['name'])
    pic_name = f"{clean_text(cleaned_name)}.jpg"
    instrument['pic'] = pic_name if pic_name != ".jpg" else ""

with open("instruments.json", 'w', encoding='utf-8') as file:
    json.dump({"Instruments": instruments}, file, ensure_ascii=False, indent=4)

print(c("\nIDs updated successfully!", "green"))
