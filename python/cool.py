import json
import re



def extract_tags(name_with_parens):
    match = re.search(r'\((.*?)\)', name_with_parens)
    if match:
        inner = match.group(1)
        return [tag.strip() for tag in inner.split('/')]
    return []




with open("../src/assets/Data/songs.json", "r") as file:
    content = json.load(file)


all_keys = []

for song_key, song_data in content.items():
    appearances = song_data.get("Appearances", [])
    for appearance in appearances:
        name = appearance.get("appearance", "Unknown Appearance")
        link = appearance.get("link", "No Link")
        # print(name)

        appear_list = extract_tags(name)

        for appear in appear_list:
            if appear not in all_keys:
                all_keys.append(appear)

for the_key in all_keys:
    print(the_key)
print(len(all_keys))