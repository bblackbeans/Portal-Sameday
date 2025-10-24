#!/bin/bash

# 🧪 Script de Teste - Bloco 1: Autenticação
# Executa todos os testes de autenticação do portal

echo "🔐 TESTANDO BLOCO 1: AUTENTICAÇÃO"
echo "=================================="

# Configurações
API_URL="https://sameday-sameday-api.psvs5z.easypanel.host"
TEST_USER="13161974417"
TEST_PASSWORD="Tentarlogar580"
TEST_EMAIL="joao@teste.com"

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Função para testar endpoint
test_endpoint() {
    local method=$1
    local url=$2
    local data=$3
    local description=$4
    
    echo -n "Testando: $description... "
    
    if [ -n "$data" ]; then
        response=$(curl -s -X $method "$url" \
            -H "Content-Type: application/json" \
            -d "$data")
    else
        response=$(curl -s -X $method "$url" \
            -H "Content-Type: application/json")
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

# 1. Teste de Login
echo "1. TESTE DE LOGIN"
echo "-----------------"
test_endpoint "POST" "$API_URL/v2/auth/login" \
    "{\"username\":\"$TEST_USER\",\"password\":\"$TEST_PASSWORD\",\"platform\":\"portal\"}" \
    "Login com usuário válido"

test_endpoint "POST" "$API_URL/v2/auth/login" \
    "{\"username\":\"00000000000\",\"password\":\"senha123\",\"platform\":\"portal\"}" \
    "Login com usuário inválido"

# 2. Teste de Cadastro
echo "2. TESTE DE CADASTRO"
echo "-------------------"
test_endpoint "POST" "$API_URL/v2/user" \
    "{\"name\":\"João Silva\",\"email\":\"$TEST_EMAIL\",\"cpfcnpj\":\"12345678901\",\"password\":\"senha123\",\"typeUser\":\"client\",\"profile\":\"client\"}" \
    "Cadastro de cliente"

test_endpoint "POST" "$API_URL/v2/user" \
    "{\"name\":\"Maria Santos\",\"email\":\"maria@teste.com\",\"cpfcnpj\":\"98765432100\",\"password\":\"senha123\",\"typeUser\":\"driver\",\"profile\":\"driver\"}" \
    "Cadastro de motorista"

# 3. Teste de Recuperação de Senha
echo "3. TESTE DE RECUPERAÇÃO DE SENHA"
echo "--------------------------------"
test_endpoint "POST" "$API_URL/v2/recover_password" \
    "{\"email\":\"$TEST_EMAIL\"}" \
    "Solicitar recuperação de senha"

test_endpoint "POST" "$API_URL/v2/recover_password/code/validate" \
    "{\"email\":\"$TEST_EMAIL\",\"code\":\"123456\"}" \
    "Validar código de recuperação"

test_endpoint "POST" "$API_URL/v2/recover_password/change" \
    "{\"email\":\"$TEST_EMAIL\",\"code\":\"123456\",\"newPassword\":\"novaSenha123\"}" \
    "Alterar senha"

# 4. Teste de Usuário (Debug)
echo "4. TESTE DE DEBUG DE USUÁRIO"
echo "----------------------------"
test_endpoint "POST" "$API_URL/v2/auth/test-user" \
    "{\"username\":\"$TEST_USER\"}" \
    "Buscar usuário por CPF"

echo "🎯 RESUMO DOS TESTES DE AUTENTICAÇÃO"
echo "===================================="
echo "✅ Testes executados com sucesso!"
echo "📝 Verifique os resultados acima para identificar problemas"
echo "🔧 Ajuste a API conforme necessário"
echo ""
echo "Próximo passo: Execute ./test-users.sh para testar gestão de usuários"

