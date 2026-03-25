#!/bin/bash
#!/bin/bash

echo "Importar coleção filmes..."
mongoimport --host localhost --db autoRepair --collection repairs --file /docker-entrypoint-initdb.d/reparacoes_collection.json --jsonArray


echo "Importação concluída."

# Cria o índice de texto necessário para o parâmetro ?q= funcionar
#mongosh "mongodb://localhost:27017/cinema" --eval '
#db.filmes.createIndex({ title: "text" });
#db.atores.createIndex({ nome: "text" });
#db.generos.createIndex({ nome: 1 });
#'

echo "Base de dados reparações inicializada com sucesso."