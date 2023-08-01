#!/bin/bash

# Define a diretório raiz
ROOT_DIR=$(pwd)

# Lista dos projetos
PROJECTS=("statement-service" "account-service", "auth-service")

# Função para instalar dependências em um projeto
function install_dependencies {
  PROJECT_PATH="$ROOT_DIR/$1"

  if [ -d "$PROJECT_PATH" ]; then
    echo "Testando o projeto: $PROJECT_PATH"
    cd "$PROJECT_PATH" && npm run test:cov
  else
    echo "Diretório do projeto não encontrado: $PROJECT_PATH"
  fi
}

# Navega para o diretório raiz
cd "$ROOT_DIR"

# Loop através dos projetos e chama a função para instalar as dependências
for PROJECT in "${PROJECTS[@]}"; do
  install_dependencies "$PROJECT"
done

echo "Testes concluídos"
