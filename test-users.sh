#!/bin/bash

# 🧪 Script de Teste - Bloco 2: Gestão de Usuários
# Executa todos os testes de gestão de usuários

echo "👥 TESTANDO BLOCO 2: GESTÃO DE USUÁRIOS"
echo "========================================"

# Configurações
API_URL="https://sameday-sameday-api.psvs5z.easypanel.host"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para obter token
get_token() {
    curl -s -X POST "$API_URL/v2/auth/login" \
        -H "Content-Type: application/json" \
        -d '{"username":"13161974417","password":"Tentarlogar580","platform":"portal"}' \
        | jq -r '.token.access_token // empty'
}

# Função para testar endpoint com autenticação
test_auth_endpoint() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    local token=$5
    
    echo -n "Testando: $description... "
    
    if [ -n "$data" ]; then
        response=$(curl -s -X $method "$url" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data")
    else
        response=$(curl -s -X $method "$url" \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token")
    fi
    
    # Verificar se a resposta contém "success" ou "error"
    if echo "$response" | grep -q '"status":"success"'; then
        echo -e "${GREEN}✅ SUCESSO${NC}"
        echo "   Resposta: $(echo $response | jq -r '.message // .status')"
    elif echo "$response" | grep -q '"status":"error"'; then
        echo -e "${YELLOW}⚠️  ERRO ESPERADO${NC}"
        echo "   Resposta: $(echo $response | jq -r '.message // .status')"
    else
        echo -e "${RED}❌ FALHA${NC}"
        echo "   Resposta: $response"
    fi
    echo ""
}

# Obter token de autenticação
echo "🔑 Obtendo token de autenticação..."
TOKEN=$(get_token)

if [ -z "$TOKEN" ]; then
    echo -e "${RED}❌ ERRO: Não foi possível obter token de autenticação${NC}"
    echo "Verifique se o login está funcionando corretamente"
    exit 1
fi

echo -e "${GREEN}✅ Token obtido com sucesso${NC}"
echo ""

# 1. Listar Usuários
echo "1. TESTE DE LISTAGEM DE USUÁRIOS"
echo "--------------------------------"
test_auth_endpoint "GET" "$API_URL/v2/user/all" "" "Listar todos os usuários" "$TOKEN"

# 2. Buscar Usuário
echo "2. TESTE DE BUSCA DE USUÁRIO"
echo "----------------------------"
test_auth_endpoint "GET" "$API_URL/v2/user/1" "" "Buscar usuário por ID" "$TOKEN"

test_auth_endpoint "GET" "$API_URL/v2/user/document?document=13161974417" "" "Buscar usuário por CPF" "$TOKEN"

test_auth_endpoint "GET" "$API_URL/v2/user/email?email=joao@teste.com" "" "Buscar usuário por email" "$TOKEN"

# 3. Gerenciar Usuário
echo "3. TESTE DE GERENCIAMENTO DE USUÁRIO"
echo "------------------------------------"
test_auth_endpoint "PUT" "$API_URL/v2/user/1" \
    '{"name":"João Silva Atualizado","email":"joao.novo@teste.com"}' \
    "Atualizar usuário" "$TOKEN"

test_auth_endpoint "PUT" "$API_URL/v2/user/1/status" \
    '{"active":false}' \
    "Desativar usuário" "$TOKEN"

test_auth_endpoint "PUT" "$API_URL/v2/user/1/status" \
    '{"active":true}' \
    "Ativar usuário" "$TOKEN"

# 4. Teste de Criação de Usuário
echo "4. TESTE DE CRIAÇÃO DE USUÁRIO"
echo "------------------------------"
test_auth_endpoint "POST" "$API_URL/v2/user" \
    '{"name":"Teste Usuário","email":"teste@usuario.com","cpfcnpj":"11122233344","password":"senha123","typeUser":"client","profile":"client"}' \
    "Criar novo usuário" "$TOKEN"

echo "🎯 RESUMO DOS TESTES DE GESTÃO DE USUÁRIOS"
echo "==========================================="
echo "✅ Testes executados com sucesso!"
echo "📝 Verifique os resultados acima para identificar problemas"
echo "🔧 Ajuste a API conforme necessário"
echo ""
echo "Próximo passo: Execute ./test-orders.sh para testar gestão de pedidos"

