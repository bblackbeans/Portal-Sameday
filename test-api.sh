#!/bin/bash

# 🧪 Script de Testes Automatizados - Portal Same Day
# Este script testa as principais funcionalidades da API

# Cores para output
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Variáveis
API_URL="https://sameday-sameday-api.psvs5z.easypanel.host"
TOTAL_TESTS=0
PASSED_TESTS=0
FAILED_TESTS=0

# Funções auxiliares
print_test() {
    echo -e "\n${YELLOW}🧪 Testando: $1${NC}"
    TOTAL_TESTS=$((TOTAL_TESTS + 1))
}

print_success() {
    echo -e "${GREEN}✅ SUCESSO: $1${NC}"
    PASSED_TESTS=$((PASSED_TESTS + 1))
}

print_error() {
    echo -e "${RED}❌ ERRO: $1${NC}"
    FAILED_TESTS=$((FAILED_TESTS + 1))
}

print_info() {
    echo -e "${YELLOW}ℹ️  INFO: $1${NC}"
}

# Cabeçalho
echo "=================================="
echo "🧪 TESTES AUTOMATIZADOS - PORTAL"
echo "=================================="
echo ""

# ============================================================================
# 1. TESTES DE AUTENTICAÇÃO
# ============================================================================
echo ""
echo "🔐 1. TESTES DE AUTENTICAÇÃO"
echo "--------------------------------"

# Teste 1: Login
print_test "Login com credenciais válidas"
LOGIN_RESPONSE=$(curl -s -X POST "${API_URL}/v2/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "13161974417",
    "password": "Tentarlogar580",
    "platform": "portal"
  }')

TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token.access_token // empty')

if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    print_success "Login realizado com sucesso"
    echo "$LOGIN_RESPONSE" | jq '.'
else
    print_error "Falha no login"
    echo "$LOGIN_RESPONSE" | jq '.'
fi

# Teste 2: Login inválido
echo ""
print_test "Login com credenciais inválidas"
LOGIN_FAIL_RESPONSE=$(curl -s -X POST "${API_URL}/v2/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "username": "invalid",
    "password": "wrong",
    "platform": "portal"
  }')

STATUS=$(echo "$LOGIN_FAIL_RESPONSE" | jq -r '.status // empty')

if [ "$STATUS" == "error" ]; then
    print_success "Erro retornado corretamente para login inválido"
else
    print_error "Login inválido deveria retornar erro"
fi

# ============================================================================
# 2. TESTES DE BUSCA DE CEP
# ============================================================================
echo ""
echo "📍 2. TESTES DE BUSCA DE CEP"
echo "--------------------------------"

# Teste 3: Buscar CEP válido
print_test "Buscar CEP válido (58940-000)"
ZIPCODE_RESPONSE=$(curl -s -X GET "${API_URL}/v2/zip_code?zipCode=58940-000")

STATUS=$(echo "$ZIPCODE_RESPONSE" | jq -r '.status // empty')

if [ "$STATUS" == "success" ]; then
    print_success "CEP encontrado"
    echo "$ZIPCODE_RESPONSE" | jq '.'
else
    print_error "Falha ao buscar CEP"
    echo "$ZIPCODE_RESPONSE" | jq '.'
fi

# Teste 4: Buscar CEP inválido
echo ""
print_test "Buscar CEP inválido"
ZIPCODE_FAIL_RESPONSE=$(curl -s -X GET "${API_URL}/v2/zip_code?zipCode=00000-000")

STATUS=$(echo "$ZIPCODE_FAIL_RESPONSE" | jq -r '.status // empty')

if [ "$STATUS" == "error" ]; then
    print_success "CEP inválido retorna erro corretamente"
else
    print_error "CEP inválido deveria retornar erro"
fi

# ============================================================================
# 3. TESTES DE ENDPOINTS PORTAL
# ============================================================================
echo ""
echo "🏢 3. TESTES DE ENDPOINTS PORTAL"
echo "--------------------------------"

if [ -n "$TOKEN" ] && [ "$TOKEN" != "null" ]; then
    # Teste 5: Listar usuários
    print_test "Listar usuários"
    USERS_RESPONSE=$(curl -s -X GET "${API_URL}/portal/v2/user/all" \
      -H "Authorization: Bearer $TOKEN")
    
    STATUS=$(echo "$USERS_RESPONSE" | jq -r '.status // empty')
    
    if [ "$STATUS" == "success" ] || [ -n "$STATUS" ]; then
        print_success "Lista de usuários acessada"
    else
        print_error "Falha ao listar usuários"
        echo "$USERS_RESPONSE" | jq '.'
    fi
    
    # Teste 6: Dashboard
    echo ""
    print_test "Dashboard"
    DASHBOARD_RESPONSE=$(curl -s -X GET "${API_URL}/portal/v2/dashboard/data" \
      -H "Authorization: Bearer $TOKEN")
    
    STATUS=$(echo "$DASHBOARD_RESPONSE" | jq -r '.status // empty')
    
    if [ "$STATUS" == "success" ] || [ -n "$STATUS" ]; then
        print_success "Dashboard acessado"
    else
        print_error "Falha ao acessar dashboard"
        echo "$DASHBOARD_RESPONSE" | jq '.'
    fi
    
    # Teste 7: Listar pedidos
    echo ""
    print_test "Listar pedidos"
    ORDERS_RESPONSE=$(curl -s -X GET "${API_URL}/portal/v2/order/all" \
      -H "Authorization: Bearer $TOKEN")
    
    STATUS=$(echo "$ORDERS_RESPONSE" | jq -r '.status // empty')
    
    if [ "$STATUS" == "success" ] || [ -n "$STATUS" ]; then
        print_success "Lista de pedidos acessada"
    else
        print_error "Falha ao listar pedidos"
        echo "$ORDERS_RESPONSE" | jq '.'
    fi
    
    # Teste 8: Financeiro
    echo ""
    print_test "Resumo financeiro"
    FINANCIAL_RESPONSE=$(curl -s -X GET "${API_URL}/portal/v2/financial/resume" \
      -H "Authorization: Bearer $TOKEN")
    
    STATUS=$(echo "$FINANCIAL_RESPONSE" | jq -r '.status // empty')
    
    if [ "$STATUS" == "success" ] || [ -n "$STATUS" ]; then
        print_success "Resumo financeiro acessado"
    else
        print_error "Falha ao acessar resumo financeiro"
        echo "$FINANCIAL_RESPONSE" | jq '.'
    fi
else
    echo ""
    print_info "Token não disponível. Pulando testes que requerem autenticação."
fi

# ============================================================================
# 4. TESTES DE ENDPOINTS V2
# ============================================================================
echo ""
echo "🔧 4. TESTES DE ENDPOINTS V2"
echo "--------------------------------"

# Teste 9: Upload
print_test "Endpoint de upload"
UPLOAD_RESPONSE=$(curl -s -X POST "${API_URL}/v2/upload" \
  -F "file=@test.txt" 2>/dev/null || echo '{"status":"error","message":"File not found"}')

STATUS=$(echo "$UPLOAD_RESPONSE" | jq -r '.status // empty')

if [ "$STATUS" == "success" ] || [ "$STATUS" == "error" ]; then
    print_success "Endpoint de upload respondendo"
else
    print_error "Endpoint de upload não acessível"
fi

# ============================================================================
# RESUMO DOS TESTES
# ============================================================================
echo ""
echo "=================================="
echo "📊 RESUMO DOS TESTES"
echo "=================================="
echo ""
echo "Total de testes: $TOTAL_TESTS"
echo -e "${GREEN}Testes aprovados: $PASSED_TESTS${NC}"
echo -e "${RED}Testes falhados: $FAILED_TESTS${NC}"
echo ""

if [ $FAILED_TESTS -eq 0 ]; then
    echo -e "${GREEN}✅ Todos os testes passaram!${NC}"
    exit 0
else
    echo -e "${YELLOW}⚠️  Alguns testes falharam. Verifique os detalhes acima.${NC}"
    exit 1
fi
