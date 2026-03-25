import json
import sys
from pathlib import Path

def extrair_reparacoes(input_file, output_file):
    try:
        with open(input_file, "r", encoding="utf-8") as f:
            dados = json.load(f)

        if "reparacoes" not in dados:
            raise KeyError("A chave 'reparacoes' não existe no JSON.")

        reparacoes = dados["reparacoes"]

        if not isinstance(reparacoes, list):
            raise TypeError("O valor de 'reparacoes' não é um array/lista.")

        with open(output_file, "w", encoding="utf-8") as f:
            json.dump(reparacoes, f, ensure_ascii=False, indent=2)

        print(f"Ficheiro gerado com sucesso: {output_file}")
        print("Agora podes importar com:")
        print(f"mongoimport --db tuaBD --collection reparacoes --file {output_file} --jsonArray")

    except json.JSONDecodeError as e:
        print(f"Erro: JSON inválido. Detalhe: {e}")
    except Exception as e:
        print(f"Erro: {e}")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Uso:")
        print("python extrair_reparacoes.py input.json output.json")
        sys.exit(1)

    input_file = Path(sys.argv[1])
    output_file = Path(sys.argv[2])

    extrair_reparacoes(input_file, output_file)