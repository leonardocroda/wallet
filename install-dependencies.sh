#!/bin/bash

# Define a diretório raiz
ROOT_DIR=$(pwd)

# Lista dos projetos
PROJECTS=("statement-service" "account-service" "api-gateway" "auth-service")

# Função para instalar dependências em um projeto
function install_dependencies {
  PROJECT_PATH="$ROOT_DIR/$1"

  if [ -d "$PROJECT_PATH" ]; then
    echo "Instalando as dependências no diretório: $PROJECT_PATH"
    cd "$PROJECT_PATH" && npm install
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

echo "Instalação de dependências concluída para todos os projetos NestJS."
