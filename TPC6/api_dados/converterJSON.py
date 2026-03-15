import json

# ler o ficheiro original
with open("cinema.json", "r", encoding="utf-8") as f:
    data = json.load(f)

filmes = []
atores = {}
generos = {}

ator_id = 1
genero_id = 1

for filme in data["filmes"]:
    filme_entry = {
        "title": filme["title"],
        "year": filme["year"],
        "cast": [],
        "genres": []
    }

    # processar atores
    for ator in filme["cast"]:
        if ator not in atores:
            atores[ator] = {
                "id": ator_id,
                "name": ator
            }
            ator_id += 1
        
        filme_entry["cast"].append(atores[ator]["id"])

    # processar géneros
    for genero in filme["genres"]:
        if genero not in generos:
            generos[genero] = {
                "id": genero_id,
                "name": genero
            }
            genero_id += 1
        
        filme_entry["genres"].append(generos[genero]["id"])

    filmes.append(filme_entry)

# converter atores e generos para listas
atores_lista = list(atores.values())
generos_lista = list(generos.values())

# guardar coleções
with open("filmes_collection.json", "w", encoding="utf-8") as f:
    json.dump(filmes, f, indent=2, ensure_ascii=False)

with open("atores_collection.json", "w", encoding="utf-8") as f:
    json.dump(atores_lista, f, indent=2, ensure_ascii=False)

with open("generos_collection.json", "w", encoding="utf-8") as f:
    json.dump(generos_lista, f, indent=2, ensure_ascii=False)

print("Coleções criadas: filmes, atores e generos")