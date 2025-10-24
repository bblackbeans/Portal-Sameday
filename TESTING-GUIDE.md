# 🧪 Guia Completo de Testes - Portal Same Day

## 📋 **Visão Geral**

Este guia organiza os testes por **blocos funcionais** para facilitar a validação sistemática do portal. Cada bloco pode ser testado independentemente.

---

## 🔐 **BLOCO 1: Autenticação e Segurança**

### ✅ **Funcionalidades Integradas:**
- Login de usuário
- Cadastro de usuário
- Recuperação de senha
- Validação de código de recuperação
- Alteração de senha

### 🧪 **Testes de Autenticação:**

#### **1.1 - Teste de Login**
```bash
# Teste com usuário válido
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "13161974417",
    "password": "Tentarlogar580",
    "platform": "portal"
  }'

# Teste com usuário inválido
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "00000000000",
    "password": "senha123",
    "platform": "portal"
  }'
```

#### **1.2 - Teste de Cadastro**
```bash
# Cadastro de cliente
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva",
    "email": "joao@teste.com",
    "cpfcnpj": "12345678901",
    "password": "senha123",
    "typeUser": "client",
    "profile": "client"
  }'

# Cadastro de motorista
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/user \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@teste.com",
    "cpfcnpj": "98765432100",
    "password": "senha123",
    "typeUser": "driver",
    "profile": "driver"
  }'
```

#### **1.3 - Teste de Recuperação de Senha**
```bash
# Solicitar recuperação
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/recover_password \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@teste.com"
  }'

# Validar código
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/recover_password/code/validate \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@teste.com",
    "code": "123456"
  }'

# Alterar senha
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/recover_password/change \
  -H "Content-Type: application/json" \
  -d '{
    "email": "joao@teste.com",
    "code": "123456",
    "newPassword": "novaSenha123"
  }'
```

### 🎯 **Critérios de Sucesso:**
- ✅ Login retorna token válido
- ✅ Cadastro cria usuário com sucesso
- ✅ Recuperação de senha funciona
- ✅ Validação de código funciona
- ✅ Alteração de senha funciona

---

## 👥 **BLOCO 2: Gestão de Usuários**

### ✅ **Funcionalidades Integradas:**
- Listar usuários
- Buscar usuário por ID
- Criar usuário
- Atualizar usuário
- Deletar usuário
- Ativar/Desativar usuário
- Buscar por CPF/CNPJ
- Buscar por email

### 🧪 **Testes de Gestão de Usuários:**

#### **2.1 - Listar Usuários**
```bash
# Listar todos os usuários
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/all \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

#### **2.2 - Buscar Usuário**
```bash
# Buscar por ID
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Buscar por CPF/CNPJ
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/document \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "document=13161974417"

# Buscar por email
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/email \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "email=joao@teste.com"
```

#### **2.3 - Gerenciar Usuário**
```bash
# Atualizar usuário
curl -X PUT https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Silva Atualizado",
    "email": "joao.novo@teste.com"
  }'

# Ativar/Desativar usuário
curl -X PUT https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/1/status \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "active": false
  }'

# Deletar usuário
curl -X DELETE https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 🎯 **Critérios de Sucesso:**
- ✅ Lista todos os usuários
- ✅ Busca usuário por diferentes critérios
- ✅ Atualiza dados do usuário
- ✅ Ativa/Desativa usuário
- ✅ Deleta usuário

---

## 📦 **BLOCO 3: Gestão de Pedidos**

### ✅ **Funcionalidades Integradas:**
- Listar pedidos
- Buscar pedido por ID
- Criar novo pedido
- Atualizar pedido
- Deletar pedido
- Obter histórico de pedidos
- Calcular valor do pedido
- Processar pagamento
- Reembolsar pedido
- Buscar CEP
- Obter coordenadas por endereço

### 🧪 **Testes de Gestão de Pedidos:**

#### **3.1 - Listar Pedidos**
```bash
# Listar todos os pedidos
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/all \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Listar pedidos com filtros
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/order \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "status=pending&limit=10"
```

#### **3.2 - Criar Pedido**
```bash
# Criar novo pedido
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/order \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "origin": {
      "address": "Rua A, 123",
      "zipCode": "01234567",
      "city": "São Paulo",
      "state": "SP"
    },
    "destination": {
      "address": "Rua B, 456",
      "zipCode": "01234568",
      "city": "São Paulo",
      "state": "SP"
    },
    "weight": 1.5,
    "description": "Documentos importantes"
  }'
```

#### **3.3 - Gerenciar Pedido**
```bash
# Buscar pedido por ID
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/view \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "id=1"

# Atualizar pedido
curl -X PUT https://sameday-sameday-api.psvs5z.easypanel.host/v2/order \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "id": 1,
    "status": "in_progress",
    "driverId": 2
  }'

# Calcular valor
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/value \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "distance=10&weight=1.5"
```

#### **3.4 - Pagamento e Reembolso**
```bash
# Processar pagamento
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/1/invoice \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "paymentMethod": "credit_card",
    "tokenCredit": "token_do_cartao"
  }'

# Reembolsar pedido
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/1/refund \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

#### **3.5 - Utilitários**
```bash
# Buscar CEP
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/zip_code \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "zipCode=01234567"

# Obter coordenadas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/address/lat_lng \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "address=Rua A, 123, São Paulo, SP"
```

### 🎯 **Critérios de Sucesso:**
- ✅ Lista pedidos corretamente
- ✅ Cria pedido com sucesso
- ✅ Atualiza status do pedido
- ✅ Calcula valor corretamente
- ✅ Processa pagamento
- ✅ Busca CEP e coordenadas

---

## 💰 **BLOCO 4: Módulo Financeiro**

### ✅ **Funcionalidades Integradas:**
- Resumo financeiro do motorista
- Pagamentos do motorista
- Resumo geral financeiro
- Ranking de motoristas
- Faturas administrativas

### 🧪 **Testes Financeiros:**

#### **4.1 - Resumos Financeiros**
```bash
# Resumo do motorista
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/financial/driver-resume \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "monthReference=2024-10"

# Pagamentos do motorista
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/financial/driver-payment \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "monthReference=2024-10"

# Resumo geral
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/financial/resume \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "monthReference=2024-10"
```

#### **4.2 - Relatórios**
```bash
# Ranking de motoristas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/financial/driver-ranking \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "monthReference=2024-10"

# Faturas administrativas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/financial/admin-invoice \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "monthReference=2024-10"
```

### 🎯 **Critérios de Sucesso:**
- ✅ Retorna resumos financeiros
- ✅ Calcula pagamentos corretamente
- ✅ Gera ranking de motoristas
- ✅ Lista faturas administrativas

---

## 🚗 **BLOCO 5: Gestão de Motoristas**

### ✅ **Funcionalidades Integradas:**
- Listar motoristas
- Buscar motorista por ID
- Criar motorista
- Atualizar motorista
- Deletar motorista
- Ativar/Desativar motorista
- Histórico de entregas
- Estatísticas do motorista
- Ranking de motoristas
- Motoristas disponíveis
- Atribuir pedido ao motorista

### 🧪 **Testes de Motoristas:**

#### **5.1 - Listar Motoristas**
```bash
# Listar todos os motoristas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/all \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Motoristas disponíveis
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/available \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

#### **5.2 - Gerenciar Motorista**
```bash
# Buscar motorista por ID
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Atualizar motorista
curl -X PUT https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "João Motorista",
    "phone": "11999999999",
    "vehicle": "Honda CG 160"
  }'
```

#### **5.3 - Histórico e Estatísticas**
```bash
# Histórico de entregas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/1/history \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Estatísticas do motorista
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/1/stats \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "period=2024-10"

# Ranking de motoristas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/driver/ranking \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "period=2024-10"
```

#### **5.4 - Atribuição de Pedidos**
```bash
# Atribuir pedido ao motorista
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/1/assign \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "driverId": 1
  }'

# Remover atribuição
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/order/1/unassign \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 🎯 **Critérios de Sucesso:**
- ✅ Lista motoristas corretamente
- ✅ Busca motorista por ID
- ✅ Atualiza dados do motorista
- ✅ Retorna histórico de entregas
- ✅ Calcula estatísticas
- ✅ Atribui pedidos corretamente

---

## 📊 **BLOCO 6: Dashboard e Relatórios**

### ✅ **Funcionalidades Integradas:**
- Dados do dashboard
- Gráficos do dashboard

### 🧪 **Testes de Dashboard:**

#### **6.1 - Dados do Dashboard**
```bash
# Obter dados do dashboard
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/dashboard/data \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Obter gráficos
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/dashboard/graphics \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "period=2024-10&type=orders"
```

### 🎯 **Critérios de Sucesso:**
- ✅ Retorna dados do dashboard
- ✅ Gera gráficos corretamente

---

## 🔔 **BLOCO 7: Notificações**

### ✅ **Funcionalidades Integradas:**
- Listar notificações
- Criar notificação
- Marcar como lida
- Enviar para usuários específicos
- Contador de não lidas

### 🧪 **Testes de Notificações:**

#### **7.1 - Gerenciar Notificações**
```bash
# Listar notificações
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/notification/all \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Criar notificação
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/notification \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Novo pedido",
    "message": "Você tem um novo pedido para entregar",
    "type": "order",
    "userId": 1
  }'

# Marcar como lida
curl -X PUT https://sameday-sameday-api.psvs5z.easypanel.host/v2/notification/1/read \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"

# Contador de não lidas
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/notification/unread-count \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### 🎯 **Critérios de Sucesso:**
- ✅ Lista notificações
- ✅ Cria notificação
- ✅ Marca como lida
- ✅ Conta não lidas

---

## 📁 **BLOCO 8: Gestão de Arquivos**

### ✅ **Funcionalidades Integradas:**
- Upload de arquivo
- Download de arquivo
- Listar arquivos
- Deletar arquivo
- Upload múltiplo

### 🧪 **Testes de Arquivos:**

#### **8.1 - Upload e Download**
```bash
# Upload de arquivo (usar form-data)
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/file/upload \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -F "file=@documento.pdf" \
  -F "type=order" \
  -F "orderId=1"

# Listar arquivos
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/file/list \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -G -d "type=order"

# Download de arquivo
curl -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/file/download/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -o arquivo_baixado.pdf
```

### 🎯 **Critérios de Sucesso:**
- ✅ Faz upload de arquivo
- ✅ Lista arquivos
- ✅ Faz download de arquivo
- ✅ Deleta arquivo

---

## 🚀 **Como Executar os Testes**

### **1. Preparação:**
```bash
# 1. Obter token de autenticação
TOKEN=$(curl -s -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"13161974417","password":"Tentarlogar580","platform":"portal"}' \
  | jq -r '.token.access_token')

# 2. Definir variável de ambiente
export API_TOKEN=$TOKEN
```

### **2. Executar Testes por Bloco:**
```bash
# Testar apenas autenticação
./test-auth.sh

# Testar apenas usuários
./test-users.sh

# Testar apenas pedidos
./test-orders.sh

# Testar tudo
./test-all.sh
```

### **3. Validação Automática:**
```bash
# Script de validação completa
curl -s -X GET https://sameday-sameday-api.psvs5z.easypanel.host/v2/dashboard/data \
  -H "Authorization: Bearer $API_TOKEN" \
  | jq '.status == "success"'
```

---

## 📝 **Checklist de Validação**

### ✅ **Autenticação:**
- [ ] Login funciona
- [ ] Cadastro funciona
- [ ] Recuperação de senha funciona
- [ ] Token é válido
- [ ] Logout funciona

### ✅ **Usuários:**
- [ ] Lista usuários
- [ ] Busca usuário
- [ ] Cria usuário
- [ ] Atualiza usuário
- [ ] Deleta usuário

### ✅ **Pedidos:**
- [ ] Lista pedidos
- [ ] Cria pedido
- [ ] Atualiza pedido
- [ ] Calcula valor
- [ ] Processa pagamento

### ✅ **Financeiro:**
- [ ] Resumos financeiros
- [ ] Pagamentos
- [ ] Ranking
- [ ] Faturas

### ✅ **Motoristas:**
- [ ] Lista motoristas
- [ ] Gerencia motorista
- [ ] Histórico
- [ ] Atribuição

### ✅ **Dashboard:**
- [ ] Dados do dashboard
- [ ] Gráficos

### ✅ **Notificações:**
- [ ] Lista notificações
- [ ] Cria notificação
- [ ] Marca como lida

### ✅ **Arquivos:**
- [ ] Upload
- [ ] Download
- [ ] Lista arquivos

---

## 🎯 **Próximos Passos**

1. **Execute os testes por bloco** na ordem sugerida
2. **Valide cada funcionalidade** antes de prosseguir
3. **Documente problemas encontrados** para correção
4. **Teste integrações** entre diferentes blocos
5. **Valide performance** com dados reais

**🚀 O portal está completamente integrado e pronto para testes!**

