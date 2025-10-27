# 🚀 GUIA RÁPIDO DE TESTES - PORTAL SAMEDAY

## 📍 **Como começar a testar:**

### **1️⃣ Primeiro, faça login:**
- Acesse: `https://seu-portal.easypanel.host`
- Usuário: `13161974417`
- Senha: `Tentarlogar580`

---

## ✅ **CHECKLIST SIMPLIFICADO**

Marque ✅ se funcionou ou ❌ se deu erro

### **🔐 ÁREA DE LOGIN E CADASTRO**
- [ ] Login funciona
- [ ] "Esqueci minha senha" funciona  
- [ ] Cadastro de novo usuário funciona

### **📦 ÁREA DE PEDIDOS**
- [ ] Lista de pedidos carrega
- [ ] Botão "PRÓXIMO" avança nas etapas do formulário
- [ ] Busca de CEP funciona
- [ ] Adicionar objetos funciona
- [ ] Resumo do pedido exibe corretamente
- [ ] Salvar pedido funciona

### **👥 ÁREA DE USUÁRIOS**
- [ ] Lista de usuários carrega
- [ ] Ver detalhes do usuário funciona
- [ ] Editar usuário funciona

### **💰 ÁREA FINANCEIRA**
- [ ] Resumo financeiro carrega
- [ ] Ranking de motoristas funciona

### **🧭 DASHBOARD**
- [ ] Dashboard carrega ao fazer login

---

## 🐛 **O QUE FAZER QUANDO DER ERRO:**

### **1. Tire um screenshot do erro**

### **2. Abra o Console do Navegador (F12):**
```
- Pressione F12 no navegador
- Vá na aba "Console"
- Procure por mensagens em vermelho
- Copie a mensagem de erro
```

### **3. Veja as Requisições (Network):**
```
- Pressione F12
- Vá na aba "Network"
- Faça a ação que deu erro
- Veja qual requisição falhou (aparece em vermelho)
- Clique nela e veja os detalhes
- Copie o status code (ex: 404, 500)
```

### **4. Me envie:**
```
📸 Screenshot do erro
📝 Mensagem do console (se tiver)
🌐 Status code da requisição (ex: 404, 500)
📍 Qual página estava (ex: "Criar novo pedido")
🎯 O que você estava fazendo (ex: "Clicando no botão PRÓXIMO")
```

---

## 📸 **EXEMPLO DE COMO RELATAR ERRO:**

```
ERRO ENCONTRADO:

📸 Screenshot: [anexar imagem]

📍 Página: Criar novo pedido / Etapa "RETIRADA"

🎯 O que estava fazendo: Clicando no botão "PRÓXIMO"

❌ Erro: Botão não avança para próxima etapa

📝 Console: 
Erro ao obter coordenadas: Não foi possível obter as coordenadas.

🌐 Network: 
GET /v2/address/lat_lng - Status: 404
```

---

## 🎯 **PRIORIDADE DE TESTES:**

### **🔴 CRÍTICO (Teste primeiro):**
1. ✅ Login funciona?
2. ✅ Lista de pedidos carrega?
3. ✅ Botão PRÓXIMO avança?
4. ✅ Criar pedido novo funciona?
5. ✅ Dashboard carrega?

### **🟡 IMPORTANTE (Teste depois):**
6. ✅ Lista de usuários funciona?
7. ✅ Busca de CEP funciona?
8. ✅ Editar dados funciona?
9. ✅ Resumo financeiro funciona?

### **🟢 SECUNDÁRIO (Teste por último):**
10. ✅ Notificações aparecem?
11. ✅ Upload de arquivos funciona?
12. ✅ Gráficos aparecem?

---

## 🚨 **PROBLEMAS COMUNS E SOLUÇÕES:**

### **❌ "Erro 404 - Página não encontrada"**
**Causa:** Rota não definida
**Solução:** Vou adicionar a rota que está faltando

### **❌ "Erro 500 - Erro interno do servidor"**
**Causa:** Problema no backend
**Solução:** Vou verificar o endpoint da API

### **❌ "Erro de CORS"**
**Causa:** API não permite acesso do portal
**Solução:** Configurar CORS na API

### **❌ "Token inválido"**
**Causa:** Sessão expirada
**Solução:** Fazer logout e login novamente

### **❌ "Loading infinito"**
**Causa:** API não responde
**Solução:** Adicionar timeout e tratamento de erro

---

## 📊 **COMO MONITORAR OS TESTES:**

### **Opção 1: Teste Manual**
- Use a checklist completa (TESTING-CHECKLIST.md)
- Marque cada item testado
- Anote problemas encontrados

### **Opção 2: Teste Automatizado**
- Execute o script: `./test-api.sh`
- Verá resultados dos testes de API
- Receberá relatório de sucesso/erro

---

## ✅ **APÓS TESTAR:**

### **Me envie:**
1. 📋 Checklist preenchido com ✅ ou ❌
2. 📸 Screenshots dos erros (se houver)
3. 📝 Descrição detalhada dos problemas

### **Eu vou:**
1. 🔍 Analisar cada erro
2. 🛠️ Corrigir todos os problemas
3. ✅ Retestar as correções
4. 🚀 Deploy das correções

---

## 🎯 **OBJETIVO:**

Testar **TODAS** as funcionalidades e identificar **TODOS** os problemas para que eu possa corrigir **TUDO** de uma vez!

**Comece pelos itens 🔴 CRÍTICOS e vá avançando. Me envie o que encontrar e eu corrijo tudo! 🚀**
