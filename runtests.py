import os
import sys
import pytest


def main():
    ROOT_DIR = os.path.dirname(os.path.abspath(__file__))

    # Garante que o Python encontre backend/
    sys.path.insert(0, os.path.join(ROOT_DIR, "brose_app"))

    # Caminho correto da pasta de testes
    test_path = os.path.join(ROOT_DIR, "brose_app", "backend", "tests")

    print(f"Executando testes em: {test_path}\n")

    if not os.path.exists(test_path):
        print("ERRO: Pasta de testes não encontrada!")
        sys.exit(1)

    exit_code = pytest.main([test_path, "-v"])
    sys.exit(exit_code)


if __name__ == "__main__":
    main()
