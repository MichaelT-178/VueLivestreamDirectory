import json


with open("CardData.json", 'r', encoding='utf-8') as file:
    content = json.load(file)


card_data = content['CardData']

for index, card in enumerate(card_data, start=1):
    card['id'] = index



with open("CardData.json", 'w', encoding='utf-8') as wfile:
    json.dump({"CardData": card_data}, wfile, indent=4, ensure_ascii=False)
