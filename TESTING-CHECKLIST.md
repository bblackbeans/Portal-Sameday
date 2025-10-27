# ✅ CHECKLIST DE TESTES - PORTAL SAMEDAY

## 📋 **Como Usar Esta Checklist:**

1. **Teste cada item** do portal
2. **Marque** ✅ se funcionou ou ❌ se deu erro
3. **Anote** detalhes do erro em "Observações"
4. **Screenshot** dos erros quando possível
5. **Envie** o checklist preenchido para eu corrigir

---

## 🔐 **1. AUTENTICAÇÃO E CADASTRO**

### **1.1 - LOGIN**
- [ ] **Teste 1:** Login com usuário válido
  - **Usuário:** `13161974417`
  - **Senha:** `Tentarlogar580`
  - **Resultado esperado:** ✅ Login bem-sucedido, redireciona para dashboard
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 2:** Login com credenciais inválidas
  - **Usuário:** `invalido`
  - **Senha:** `teste`
  - **Resultado esperado:** ❌ Mensagem de erro: "Usuário não cadastrado"
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 3:** Tentar acessar página sem estar logado
  - **Ações:** Fazer logout e acessar `/order/list` diretamente
  - **Resultado esperado:** ❌ Redireciona para login
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **1.2 - RECUPERAÇÃO DE SENHA**
- [ ] **Teste 4:** Solicitar recuperação de senha
  - **Ações:** Clicar em "Esqueci minha senha" → Informar CPF/Email
  - **Resultado esperado:** ✅ Mensagem de sucesso
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 5:** Inserir código de recuperação
  - **Ações:** Informar código recebido
  - **Resultado esperado:** ✅ Permite redefinir senha
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **1.3 - CADASTRO**
- [ ] **Teste 6:** Cadastro de Pessoa Física
  - **Ações:** CPF, Nome completo, Email, Senha
  - **Resultado esperado:** ✅ Cadastro bem-sucedido
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 7:** Cadastro de Pessoa Jurídica
  - **Ações:** CNPJ, Razão social, Email, Senha
  - **Resultado esperado:** ✅ Cadastro bem-sucedido
  - **Status:** _______
  - **Observações:** ___________________________________________________

---

## 📦 **2. GESTÃO DE PEDIDOS**

### **2.1 - LISTAGEM DE PEDIDOS**
- [ ] **Teste 8:** Visualizar lista de pedidos
  - **Ações:** Acessar `/order/list`
  - **Resultado esperado:** ✅ Exibe tabela com pedidos
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 9:** Filtrar pedidos por status
  - **Ações:** Selecionar filtro (Pendente, Em andamento, Concluído)
  - **Resultado esperado:** ✅ Filtra pedidos corretamente
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 10:** Buscar pedido por ID
  - **Ações:** Digitar ID do pedido no campo de busca
  - **Resultado esperado:** ✅ Retorna pedido específico
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **2.2 - CRIAR PEDIDO**
- [ ] **Teste 11:** Preencher dados da retirada
  - **Ações:** Preencher CPF/CNPJ, Nome, Endereço completo
  - **Resultado esperado:** ✅ Valida campos e permite avançar
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 12:** Buscar CEP da retirada
  - **Ações:** Digitar CEP e clicar no ícone de lupa
  - **Resultado esperado:** ✅ Preenche endereço automaticamente
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 13:** Avançar para etapa "OBJETO"
  - **Ações:** Preencher retirada e clicar "PRÓXIMO"
  - **Resultado esperado:** ✅ Avança para próxima aba
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 14:** Preencher dados do objeto
  - **Ações:** Nome, Modelo, Dimensões, Peso, Quantidade
  - **Resultado esperado:** ✅ Permite adicionar objeto
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 15:** Adicionar múltiplos objetos
  - **Ações:** Clicar em "Adicionar" objeto
  - **Resultado esperado:** ✅ Adiciona novo objeto na lista
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 16:** Remover objeto
  - **Ações:** Clicar no ícone de deletar em um objeto
  - **Resultado esperado:** ✅ Remove objeto da lista
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 17:** Avançar para etapa "ENTREGA"
  - **Ações:** Preencher objetos e clicar "PRÓXIMO"
  - **Resultado esperado:** ✅ Avança para aba de entrega
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 18:** Preencher dados da entrega
  - **Ações:** Preencher CPF/CNPJ, Nome, Endereço completo
  - **Resultado esperado:** ✅ Valida campos
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 19:** Buscar CEP da entrega
  - **Ações:** Digitar CEP e clicar no ícone de lupa
  - **Resultado esperado:** ✅ Preenche endereço automaticamente
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 20:** Avançar para etapa "RESUMO"
  - **Ações:** Preencher entrega e clicar "PRÓXIMO"
  - **Resultado esperado:** ✅ Avança para resumo
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 21:** Visualizar mapa no resumo
  - **Ações:** Verificar se mapa aparece no resumo
  - **Resultado esperado:** ✅ Mapa exibe rota (mesmo com coordenadas padrão)
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 22:** Visualizar resumo do pedido
  - **Ações:** Verificar dados de retirada, entrega e objetos
  - **Resultado esperado:** ✅ Exibe informações corretas
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 23:** Editar endereço no resumo
  - **Ações:** Clicar no ícone de editar em endereço
  - **Resultado esperado:** ✅ Volta para aba de endereço
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 24:** Salvar pedido sem pagar
  - **Ações:** Clicar "SALVAR" no resumo
  - **Resultado esperado:** ✅ Salva pedido no sistema
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 25:** Fazer pagamento
  - **Ações:** Clicar "PAGAR" no resumo
  - **Resultado esperado:** ✅ Abre modal de pagamento
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 26:** Redefinir pedido
  - **Ações:** Clicar "REDEFINIR PEDIDO" no resumo
  - **Resultado esperado:** ✅ Limpa formulário e volta ao início
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **2.3 - VISUALIZAR PEDIDO**
- [ ] **Teste 27:** Acessar detalhes do pedido
  - **Ações:** Clicar em pedido na lista
  - **Resultado esperado:** ✅ Abre detalhes do pedido
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 28:** Visualizar informações do pedido
  - **Ações:** Verificar retirada, entrega, objetos, status
  - **Resultado esperado:** ✅ Exibe todas as informações
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 29:** Visualizar mapa no detalhe
  - **Ações:** Verificar se mapa aparece
  - **Resultado esperado:** ✅ Mapa exibe rota
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **2.4 - OPERAÇÕES COM PEDIDOS**
- [ ] **Teste 30:** Excluir pedido
  - **Ações:** Clicar em deletar pedido
  - **Resultado esperado:** ✅ Remove pedido
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 31:** Enviar nota fiscal
  - **Ações:** Clicar em enviar nota fiscal
  - **Resultado esperado:** ✅ Envia por email
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 32:** Reembolsar pedido
  - **Ações:** Clicar em reembolsar
  - **Resultado esperado:** ✅ Inicia reembolso
  - **Status:** _______
  - **Observações:** ___________________________________________________

---

## 👥 **3. GESTÃO DE USUÁRIOS**

### **3.1 - LISTAR USUÁRIOS**
- [ ] **Teste 33:** Visualizar lista de usuários
  - **Ações:** Acessar `/users/list`
  - **Resultado esperado:** ✅ Exibe tabela com usuários
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 34:** Filtrar usuários por tipo
  - **Ações:** Filtrar por Pessoa Física/Jurídica/Motorista
  - **Resultado esperado:** ✅ Filtra corretamente
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **3.2 - GERENCIAR USUÁRIOS**
- [ ] **Teste 35:** Visualizar detalhes do usuário
  - **Ações:** Clicar em usuário na lista
  - **Resultado esperado:** ✅ Exibe perfil completo
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 36:** Editar informações do usuário
  - **Ações:** Alterar nome, email, etc.
  - **Resultado esperado:** ✅ Salva alterações
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 37:** Ativar/Desativar usuário
  - **Ações:** Alternar status do usuário
  - **Resultado esperado:** ✅ Atualiza status
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 38:** Atualizar foto do perfil
  - **Ações:** Fazer upload de imagem
  - **Resultado esperado:** ✅ Atualiza avatar
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 39:** Validar motorista
  - **Ações:** Aprovar documento de motorista
  - **Resultado esperado:** ✅ Valida motorista
  - **Status:** _______
  - **Observações:** ___________________________________________________

---

## 💰 **4. GESTÃO FINANCEIRA**

### **4.1 - RESUMO FINANCEIRO**
- [ ] **Teste 40:** Visualizar resumo financeiro
  - **Ações:** Acessar `/financial/resume`
  - **Resultado esperado:** ✅ Exibe dados financeiros
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 41:** Filtrar por período
  - **Ações:** Selecionar datas
  - **Resultado esperado:** ✅ Filtra por período
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 42:** Visualizar gráficos
  - **Ações:** Verificar gráficos de receita
  - **Resultado esperado:** ✅ Exibe gráficos
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **4.2 - RANKING DE MOTORISTAS**
- [ ] **Teste 43:** Visualizar ranking
  - **Ações:** Acessar ranking de motoristas
  - **Resultado esperado:** ✅ Exibe ranking
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 44:** Detalhes do motorista no ranking
  - **Ações:** Clicar em motorista
  - **Resultado esperado:** ✅ Abre detalhes
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **4.3 - FATURAS**
- [ ] **Teste 45:** Listar faturas
  - **Ações:** Acessar lista de faturas
  - **Resultado esperado:** ✅ Exibe faturas
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 46:** Baixar fatura
  - **Ações:** Clicar para baixar PDF
  - **Resultado esperado:** ✅ Baixa arquivo
  - **Status:** _______
  - **Observações:** ___________________________________________________

---

## 🧭 **5. DASHBOARD**

- [ ] **Teste 47:** Visualizar dashboard principal
  - **Ações:** Acessar dashboard após login
  - **Resultado esperado:** ✅ Exibe dados gerais
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 48:** Verificar estatísticas
  - **Ações:** Verificar métricas no dashboard
  - **Resultado esperado:** ✅ Exibe estatísticas corretas
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 49:** Visualizar gráficos do dashboard
  - **Ações:** Verificar gráficos na tela
  - **Resultado esperado:** ✅ Exibe gráficos
  - **Status:** _______
  - **Observações:** ___________________________________________________

---

## 📄 **6. INFORMAÇÕES GERAIS**

### **6.1 - NOTIFICAÇÕES**
- [ ] **Teste 50:** Visualizar notificações
  - **Ações:** Verificar ícone de notificações
  - **Resultado esperado:** ✅ Exibe notificações
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 51:** Marcar notificação como lida
  - **Ações:** Clicar em notificação
  - **Resultado esperado:** ✅ Marca como lida
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **6.2 - UPLOAD DE ARQUIVOS**
- [ ] **Teste 52:** Upload de foto de perfil
  - **Ações:** Fazer upload de imagem
  - **Resultado esperado:** ✅ Salva arquivo
  - **Status:** _______
  - **Observações:** ___________________________________________________

### **6.3 - NAVEGAÇÃO E INTERFACE**
- [ ] **Teste 53:** Navegar pelo menu
  - **Ações:** Clicar em diferentes seções do menu
  - **Resultado esperado:** ✅ Navega corretamente
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 54:** Responsividade mobile
  - **Ações:** Testar em dispositivo móvel
  - **Resultado esperado:** ✅ Layout responsivo
  - **Status:** _______
  - **Observações:** ___________________________________________________

- [ ] **Teste 55:** Voltar nas páginas
  - **Ações:** Usar botão "Voltar" e navegação do navegador
  - **Resultado esperado:** ✅ Funciona corretamente
  - **Status:** _______
  - **Observações:** ___________________________________________________

---

## 🔍 **7. TESTES DE PERFORMANCE**

- [ ] **Teste 56:** Carregamento de páginas
  - **Tempo esperado:** < 3 segundos
  - **Observações:** ___________________________________________________

- [ ] **Teste 57:** Requisições de API
  - **Verificar:** Tempo de resposta das APIs
  - **Observações:** ___________________________________________________

- [ ] **Teste 58:** Carregamento de listas
  - **Verificar:** Performance com muitas entradas
  - **Observações:** ___________________________________________________

---

## 📋 **RESUMO DA VALIDAÇÃO**

### **✅ Funcionalidades Testadas:** ___/58
### **❌ Erros Encontrados:** ___
### **⚠️ Problemas Menores:** ___
### **📝 Observações Gerais:**

___________________________________________________
___________________________________________________
___________________________________________________

### **🎯 Próximos Passos:**

1. [ ] Testar todas as funcionalidades
2. [ ] Anotar todos os erros
3. [ ] Enviar checklist preenchido
4. [ ] Aguardar correções
5. [ ] Retestar funcionalidades corrigidas

---

## 🚨 **COMO REPORTAR PROBLEMAS:**

### **Para cada erro encontrado, informe:**

1. **Número do teste:** Ex: Teste 13
2. **Descrição do erro:** O que aconteceu
3. **Screenshot:** Se possível
4. **Console do navegador:** Mensagem de erro
5. **Network tab:** Status da requisição

### **Template de Relatório:**

```
Teste XX: [Nome do teste]
Erro: [Descrição]
Screenshot: [Link ou anexo]
Console: [Mensagem de erro]
Network: [Status da requisição]
```

---

## ✅ **Checklist Pronto para Uso!**

Agora é só testar todas as funcionalidades e marcar o que funcionou ou não. Depois me envie o checklist preenchido e eu corrijo todos os problemas encontrados! 🚀
