import json

INPUT_FILE = "emd.json"
OUTPUT_FILE = "emd_convertido.json"

with open(INPUT_FILE, "r", encoding="utf-8") as f:
    data = json.load(f)

# se for lista, converte _id -> id
if isinstance(data, list):
    for obj in data:
        if isinstance(obj, dict) and "_id" in obj and "id" not in obj:
            obj["id"] = obj.pop("_id")

novo = {"emd": data} if isinstance(data, list) else data

with open(OUTPUT_FILE, "w", encoding="utf-8") as f:
    json.dump(novo, f, ensure_ascii=False, indent=2)

print("OK:", OUTPUT_FILE)