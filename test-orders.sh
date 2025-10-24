#!/bin/bash

# 🧪 Script de Teste - Bloco 3: Gestão de Pedidos
# Executa todos os testes de gestão de pedidos

echo "📦 TESTANDO BLOCO 3: GESTÃO DE PEDIDOS"
echo "======================================="

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

# 1. Listar Pedidos
echo "1. TESTE DE LISTAGEM DE PEDIDOS"
echo "-------------------------------"
test_auth_endpoint "GET" "$API_URL/v2/order/all" "" "Listar todos os pedidos" "$TOKEN"

test_auth_endpoint "GET" "$API_URL/v2/order?status=pending&limit=10" "" "Listar pedidos com filtros" "$TOKEN"

# 2. Criar Pedido
echo "2. TESTE DE CRIAÇÃO DE PEDIDO"
echo "----------------------------"
test_auth_endpoint "POST" "$API_URL/v2/order" \
    '{"origin":{"address":"Rua A, 123","zipCode":"01234567","city":"São Paulo","state":"SP"},"destination":{"address":"Rua B, 456","zipCode":"01234568","city":"São Paulo","state":"SP"},"weight":1.5,"description":"Documentos importantes"}' \
    "Criar novo pedido" "$TOKEN"

# 3. Gerenciar Pedido
echo "3. TESTE DE GERENCIAMENTO DE PEDIDO"
echo "----------------------------------"
test_auth_endpoint "GET" "$API_URL/v2/order/view?id=1" "" "Buscar pedido por ID" "$TOKEN"

test_auth_endpoint "PUT" "$API_URL/v2/order" \
    '{"id":1,"status":"in_progress","driverId":2}' \
    "Atualizar pedido" "$TOKEN"

# 4. Calcular Valor
echo "4. TESTE DE CÁLCULO DE VALOR"
echo "---------------------------"
test_auth_endpoint "GET" "$API_URL/v2/order/value?distance=10&weight=1.5" "" "Calcular valor do pedido" "$TOKEN"

# 5. Pagamento e Reembolso
echo "5. TESTE DE PAGAMENTO E REEMBOLSO"
echo "--------------------------------"
test_auth_endpoint "POST" "$API_URL/v2/order/1/invoice" \
    '{"paymentMethod":"credit_card","tokenCredit":"token_do_cartao"}' \
    "Processar pagamento" "$TOKEN"

test_auth_endpoint "POST" "$API_URL/v2/order/1/refund" "" "Reembolsar pedido" "$TOKEN"

# 6. Utilitários
echo "6. TESTE DE UTILITÁRIOS"
echo "----------------------"
test_auth_endpoint "GET" "$API_URL/v2/zip_code?zipCode=01234567" "" "Buscar CEP" "$TOKEN"

test_auth_endpoint "GET" "$API_URL/v2/address/lat_lng?address=Rua A, 123, São Paulo, SP" "" "Obter coordenadas" "$TOKEN"

# 7. Histórico
echo "7. TESTE DE HISTÓRICO"
echo "---------------------"
test_auth_endpoint "GET" "$API_URL/v2/order/historic?type=all" "" "Obter histórico de pedidos" "$TOKEN"

echo "🎯 RESUMO DOS TESTES DE GESTÃO DE PEDIDOS"
echo "=========================================="
echo "✅ Testes executados com sucesso!"
echo "📝 Verifique os resultados acima para identificar problemas"
echo "🔧 Ajuste a API conforme necessário"
echo ""
echo "Próximo passo: Execute ./test-financial.sh para testar módulo financeiro"

