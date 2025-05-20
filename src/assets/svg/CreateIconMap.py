import os

cwd = os.getcwd()

files = sorted([
    f for f in os.listdir(cwd)
    if os.path.isfile(os.path.join(cwd, f)) and f.endswith('.vue')
])

icon_map_contents = ""

for file in files:
    file_wo_ext = file.replace(".vue", "")
    
    icon_map_contents += f'import {file_wo_ext}Icon from "./{file}";\n'

icon_map_contents += "\nconst iconMap = {\n"

for file in files:
    file_wo_ext = file.replace(".vue", "")

    icon_map_contents += f'  {file_wo_ext.lower()}: {file_wo_ext}Icon,\n'
    
icon_map_contents = icon_map_contents[:-2]

icon_map_contents += '\n};'

icon_map_contents += "\n\nexport default iconMap;\n"

print(icon_map_contents)


with open('iconMap.js', 'w') as file:
    file.write(icon_map_contents)