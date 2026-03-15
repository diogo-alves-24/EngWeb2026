#!/bin/bash
#!/bin/bash

echo "Importar coleção filmes..."
mongoimport --host localhost --db cinema --collection filmes --file /docker-entrypoint-initdb.d/filmes_collection.json --jsonArray

echo "Importar coleção atores..."
mongoimport --host localhost --db cinema --collection atores --file /docker-entrypoint-initdb.d/atores_collection.json --jsonArray

echo "Importar coleção generos..."
mongoimport --host localhost --db cinema --collection generos --file /docker-entrypoint-initdb.d/generos_collection.json --jsonArray

echo "Importação concluída."

# Cria o índice de texto necessário para o parâmetro ?q= funcionar
#mongosh "mongodb://localhost:27017/cinema" --eval '
#db.filmes.createIndex({ title: "text" });
#db.atores.createIndex({ nome: "text" });
#db.generos.createIndex({ nome: 1 });
#'

echo "Base de dados cinema inicializada com sucesso."