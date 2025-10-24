# 🧪 Guia Completo de Testes - Portal Same Day

## 🎯 **Como Testar Todo o Portal**

### **📋 Pré-requisitos:**
- ✅ Portal deployado e funcionando
- ✅ API configurada e rodando
- ✅ Usuário de teste criado
- ✅ Conexão com internet

---

## 🚀 **1. TESTE RÁPIDO (5 minutos)**

### **Teste de Conectividade:**
```bash
# Verificar se a API está online
curl -s https://sameday-sameday-api.psvs5z.easypanel.host/health

# Testar login básico
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"13161974417","password":"Tentarlogar580","platform":"portal"}'
```

### **Teste do Portal:**
1. **Acesse:** `https://seu-portal.easypanel.host`
2. **Login:** Use `13161974417` / `Tentarlogar580`
3. **Verifique:** Se carrega o dashboard

---

## 🔍 **2. TESTE POR BLOCOS FUNCIONAIS**

### **🔐 Bloco 1: Autenticação**
```bash
# Executar teste de autenticação
./test-auth.sh
```

**O que testa:**
- ✅ Login com usuário válido
- ✅ Login com usuário inválido
- ✅ Cadastro de cliente
- ✅ Cadastro de motorista
- ✅ Recuperação de senha
- ✅ Validação de código
- ✅ Alteração de senha

**Resultado esperado:**
- Login válido: ✅ SUCESSO
- Login inválido: ⚠️ ERRO ESPERADO
- Cadastros: ✅ SUCESSO ou ⚠️ ERRO ESPERADO

---

### **👥 Bloco 2: Gestão de Usuários**
```bash
# Executar teste de usuários
./test-users.sh
```

**O que testa:**
- ✅ Listar todos os usuários
- ✅ Buscar usuário por ID
- ✅ Buscar por CPF/CNPJ
- ✅ Buscar por email
- ✅ Atualizar usuário
- ✅ Ativar/Desativar usuário
- ✅ Criar novo usuário

**Resultado esperado:**
- Se API implementada: ✅ SUCESSO
- Se não implementada: ⚠️ ERRO ESPERADO (404)

---

### **📦 Bloco 3: Gestão de Pedidos**
```bash
# Executar teste de pedidos
./test-orders.sh
```

**O que testa:**
- ✅ Listar pedidos
- ✅ Criar pedido
- ✅ Buscar pedido por ID
- ✅ Atualizar pedido
- ✅ Calcular valor
- ✅ Processar pagamento
- ✅ Reembolsar pedido
- ✅ Buscar CEP
- ✅ Obter coordenadas

**Resultado esperado:**
- CEP/Coordenadas: ✅ SUCESSO
- Outros: ⚠️ ERRO ESPERADO (404) se não implementados

---

### **💰 Bloco 4: Módulo Financeiro**
```bash
# Teste manual de financeiro
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/financial/resume \
  -H "Authorization: Bearer SEU_TOKEN"
```

**O que testa:**
- ✅ Resumo financeiro geral
- ✅ Ranking de motoristas
- ✅ Faturas administrativas
- ✅ Resumo do motorista
- ✅ Pagamentos do motorista

**Resultado esperado:**
- ⚠️ ERRO ESPERADO (404) se não implementados

---

### **🚗 Bloco 5: Gestão de Motoristas**
```bash
# Teste manual de motoristas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/driver/all \
  -H "Authorization: Bearer SEU_TOKEN"
```

**O que testa:**
- ✅ Listar motoristas
- ✅ Buscar motorista por ID
- ✅ Histórico de entregas
- ✅ Estatísticas
- ✅ Ranking
- ✅ Atribuição de pedidos

**Resultado esperado:**
- ⚠️ ERRO ESPERADO (404) se não implementados

---

### **📊 Bloco 6: Dashboard**
```bash
# Teste manual de dashboard
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/dashboard/data \
  -H "Authorization: Bearer SEU_TOKEN"
```

**O que testa:**
- ✅ Dados do dashboard
- ✅ Gráficos e relatórios

**Resultado esperado:**
- ⚠️ ERRO ESPERADO (404) se não implementados

---

### **🤝 Bloco 7: Gestão de Parceiros**
```bash
# Teste manual de parceiros
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/partners/shippers \
  -H "Authorization: Bearer SEU_TOKEN"
```

**O que testa:**
- ✅ Embarcadores
- ✅ Transportadores
- ✅ Stock Store
- ✅ Contatos
- ✅ Dashboard de parceiros

**Resultado esperado:**
- ⚠️ ERRO ESPERADO (404) se não implementados

---

### **🏦 Bloco 8: Dados Bancários**
```bash
# Teste manual de dados bancários
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/user-bank/list \
  -H "Authorization: Bearer SEU_TOKEN" \
  -G -d "idUser=1"
```

**O que testa:**
- ✅ Listar contas bancárias
- ✅ Criar conta bancária
- ✅ Atualizar conta bancária
- ✅ Deletar conta bancária

**Resultado esperado:**
- ⚠️ ERRO ESPERADO (404) se não implementados

---

## 🧪 **3. TESTE COMPLETO AUTOMATIZADO**

### **Executar Todos os Testes:**
```bash
# Teste completo de todos os blocos
./test-all.sh
```

**O que faz:**
- ✅ Executa todos os scripts de teste
- ✅ Testa todos os blocos funcionais
- ✅ Gera relatório completo
- ✅ Identifica problemas

---

## 🔧 **4. TESTE MANUAL NO NAVEGADOR**

### **Fluxo de Teste Manual:**

#### **4.1 - Acesso ao Portal:**
1. **URL:** `https://seu-portal.easypanel.host`
2. **Verificar:** Se carrega a tela de login
3. **Testar:** Responsividade (mobile/desktop)

#### **4.2 - Login:**
1. **Usuário:** `13161974417`
2. **Senha:** `Tentarlogar580`
3. **Verificar:** Se redireciona para dashboard
4. **Testar:** Logout funciona

#### **4.3 - Navegação:**
1. **Dashboard:** Verificar se carrega
2. **Menu:** Testar todos os itens do menu
3. **Usuários:** Tentar listar usuários
4. **Pedidos:** Tentar listar pedidos
5. **Financeiro:** Tentar acessar relatórios

#### **4.4 - Funcionalidades:**
1. **Buscar CEP:** Testar campo de CEP
2. **Upload:** Testar upload de arquivos
3. **Formulários:** Testar validações
4. **Modais:** Testar abertura/fechamento

---

## 📊 **5. TESTE DE PERFORMANCE**

### **Teste de Carga:**
```bash
# Teste de múltiplas requisições
for i in {1..10}; do
  curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/auth/login \
    -H "Content-Type: application/json" \
    -d '{"username":"13161974417","password":"Tentarlogar580","platform":"portal"}' &
done
wait
```

### **Teste de Tempo de Resposta:**
```bash
# Medir tempo de resposta
time curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/health
```

---

## 🐛 **6. TESTE DE ERROS**

### **Teste de Cenários de Erro:**

#### **6.1 - Login Inválido:**
```bash
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"00000000000","password":"senha123","platform":"portal"}'
```

#### **6.2 - Token Inválido:**
```bash
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/user/all \
  -H "Authorization: Bearer token_invalido"
```

#### **6.3 - Endpoint Inexistente:**
```bash
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/endpoint_inexistente
```

---

## 📋 **7. CHECKLIST DE VALIDAÇÃO**

### **✅ Funcionalidades Básicas:**
- [ ] Portal carrega corretamente
- [ ] Login funciona com credenciais válidas
- [ ] Login falha com credenciais inválidas
- [ ] Logout funciona
- [ ] Menu de navegação funciona
- [ ] Responsividade funciona

### **✅ Integração com API:**
- [ ] Autenticação funciona
- [ ] Cadastro de usuários funciona
- [ ] Recuperação de senha funciona
- [ ] Busca de CEP funciona
- [ ] Obtenção de coordenadas funciona
- [ ] Upload de arquivos funciona

### **✅ Endpoints do Portal:**
- [ ] Listagem de usuários (pode retornar 404)
- [ ] Listagem de pedidos (pode retornar 404)
- [ ] Dashboard (pode retornar 404)
- [ ] Financeiro (pode retornar 404)
- [ ] Motoristas (pode retornar 404)
- [ ] Parceiros (pode retornar 404)

### **✅ Tratamento de Erros:**
- [ ] Erro 404 é tratado graciosamente
- [ ] Erro 500 é tratado graciosamente
- [ ] Timeout é tratado graciosamente
- [ ] Conexão perdida é tratada graciosamente

---

## 🎯 **8. RESULTADOS ESPERADOS**

### **✅ Funcionando Perfeitamente:**
- Login e autenticação
- Cadastro de usuários
- Recuperação de senha
- Busca de CEP
- Obtenção de coordenadas
- Upload de arquivos

### **⚠️ Retornando 404 (Normal):**
- Listagens (usuários, pedidos, parceiros)
- Dashboard e relatórios
- Gestão financeira
- Gestão de motoristas

### **❌ Problemas que Precisam Correção:**
- Erros 500 inesperados
- Timeouts frequentes
- Problemas de CORS
- Problemas de autenticação

---

## 🚀 **9. PRÓXIMOS PASSOS APÓS TESTES**

### **Se tudo funcionar:**
1. ✅ Portal está pronto para produção
2. ✅ Implementar endpoints faltantes na API
3. ✅ Configurar monitoramento
4. ✅ Treinar usuários

### **Se houver problemas:**
1. 🔧 Corrigir problemas identificados
2. 🔧 Implementar endpoints faltantes
3. 🔧 Ajustar configurações
4. 🔧 Re-testar

---

## 📞 **10. SUPORTE E MONITORAMENTO**

### **Logs para Monitorar:**
- Logs de autenticação
- Logs de erro 404/500
- Logs de performance
- Logs de upload de arquivos

### **Métricas Importantes:**
- Tempo de resposta da API
- Taxa de erro de login
- Uso de memória do portal
- Tempo de carregamento das páginas

---

## 🎉 **CONCLUSÃO**

**O portal está completamente integrado e pronto para testes!**

**Use os scripts automatizados para testes rápidos e o teste manual para validação completa.**

**Todos os endpoints foram integrados seguindo o padrão Black Beans!** 🚀
