import json

# ler ficheiro
with open("cinema.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# adicionar id a cada filme
for i, filme in enumerate(data["filmes"], start=1):
    filme["id"] = i

# guardar novo ficheiro
with open("cinemaIDs.json", "w", encoding="utf-8") as f:
    json.dump(data, f, indent=2, ensure_ascii=False)

print("IDs adicionados com sucesso.")