#!/bin/bash

# 🧪 Script de Teste - Todos os Blocos
# Executa todos os testes do portal de forma organizada

echo "🚀 TESTE COMPLETO DO PORTAL SAME DAY"
echo "====================================="

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Função para executar script e capturar resultado
run_test_block() {
    local script_name=$1
    local block_name=$2
    
    echo -e "${BLUE}📋 Executando: $block_name${NC}"
    echo "=================================="
    
    if [ -f "$script_name" ]; then
        chmod +x "$script_name"
        if bash "$script_name"; then
            echo -e "${GREEN}✅ $block_name - CONCLUÍDO${NC}"
        else
            echo -e "${RED}❌ $block_name - FALHOU${NC}"
        fi
    else
        echo -e "${YELLOW}⚠️  Script $script_name não encontrado${NC}"
    fi
    
    echo ""
    echo "----------------------------------------"
    echo ""
}

# Verificar se jq está instalado
if ! command -v jq &> /dev/null; then
    echo -e "${RED}❌ ERRO: jq não está instalado${NC}"
    echo "Instale com: sudo apt-get install jq"
    exit 1
fi

# Verificar se curl está instalado
if ! command -v curl &> /dev/null; then
    echo -e "${RED}❌ ERRO: curl não está instalado${NC}"
    echo "Instale com: sudo apt-get install curl"
    exit 1
fi

echo -e "${GREEN}🔧 Verificações iniciais concluídas${NC}"
echo ""

# Executar todos os blocos de teste
run_test_block "test-auth.sh" "BLOCO 1: Autenticação"
run_test_block "test-users.sh" "BLOCO 2: Gestão de Usuários"
run_test_block "test-orders.sh" "BLOCO 3: Gestão de Pedidos"
run_test_block "test-financial.sh" "BLOCO 4: Módulo Financeiro"
run_test_block "test-drivers.sh" "BLOCO 5: Gestão de Motoristas"
run_test_block "test-dashboard.sh" "BLOCO 6: Dashboard"
run_test_block "test-notifications.sh" "BLOCO 7: Notificações"
run_test_block "test-files.sh" "BLOCO 8: Gestão de Arquivos"

# Resumo final
echo "🎯 RESUMO FINAL DOS TESTES"
echo "=========================="
echo ""
echo -e "${GREEN}✅ Todos os testes foram executados!${NC}"
echo ""
echo "📝 Próximos passos:"
echo "1. Revise os resultados de cada bloco"
echo "2. Identifique endpoints que precisam ser implementados"
echo "3. Corrija problemas na API"
echo "4. Execute testes individuais conforme necessário"
echo ""
echo "🔧 Scripts disponíveis:"
echo "• ./test-auth.sh - Testes de autenticação"
echo "• ./test-users.sh - Testes de usuários"
echo "• ./test-orders.sh - Testes de pedidos"
echo "• ./test-financial.sh - Testes financeiros"
echo "• ./test-drivers.sh - Testes de motoristas"
echo "• ./test-dashboard.sh - Testes de dashboard"
echo "• ./test-notifications.sh - Testes de notificações"
echo "• ./test-files.sh - Testes de arquivos"
echo ""
echo -e "${BLUE}🚀 Portal Same Day - Testes Concluídos!${NC}"

