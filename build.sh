#!/bin/bash

# Script para build e deploy do projeto Angular
set -e

echo "🚀 Iniciando build do projeto..."

# Verificar se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Instale o Node.js primeiro."
    exit 1
fi

# Verificar versão do Node.js
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 14 ]; then
    echo "⚠️  Versão do Node.js muito antiga. Recomendado: Node.js 14+"
fi

echo "📦 Instalando dependências..."
npm install --legacy-peer-deps

echo "🔧 Executando lint..."
npm run lint || echo "⚠️  Lint encontrou problemas, mas continuando..."

echo "🏗️  Fazendo build de produção..."
npm run build

echo "✅ Build concluído com sucesso!"
echo "📁 Arquivos de build estão em: ./dist"
echo "🐳 Para criar a imagem Docker, execute: docker build -t sameday-portal ."

