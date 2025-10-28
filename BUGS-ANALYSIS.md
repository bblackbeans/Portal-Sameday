# 🐛 ANÁLISE DOS BUGS REPORTADOS

## ✅ BUGS JÁ CORRIGIDOS (mas precisam de rebuild)

1. **Upload de fotos do motorista** - Correção aplicada no `http.service.ts` (FormData)
2. **Dashboard com erro null** - Correção aplicada no `dashboard.component.ts`
3. **Excluir pedido** - Funciona ✅

---

## 🔍 BUGS A CORRIGIR

### 1. ❌ **Deletar usuário não funciona**

**Problema:** Mesmo com a implementação, não está funcionando.

**Análise:**
- O código está em `list-users.component.ts` linha 103-124
- O método está correto
- Pode ser que a API não está funcionando OU o `http.service` precisa de ajuste

**Verificar:**
- Se o DELETE está sendo chamado corretamente
- Se o `http.delete` está sendo executado

**Arquivo:** `src/app/menu/users/list-users/list-users.component.ts`
**Método:** `deleteUser(id)` na linha 103

---

### 2. ❌ **Upload de imagens do motorista ainda dá erro**

**Problema:** Mesmo com a correção do FormData, ainda dá erro.

**Análise:**
- A correção foi aplicada no `http.service.ts` linha 114-123
- Mas pode não estar funcionando corretamente
- Preciso verificar se o FormData está sendo enviado corretamente

**Verificar:**
- Se o `isFormData` está detectando corretamente
- Se o `Content-Type` está sendo removido corretamente

**Arquivo:** `src/app/shared/http.service.ts`
**Método:** `post` linha 108-129

---

### 3. ❌ **Editar pedido - botão "próximo" dá erro**

**Problema:** Ao clicar em "próximo" na edição, dá erro.

**Análise:**
- O método `save()` está nas linhas 231-282 do `new-order.component.ts`
- Usa `putOrder` quando está editando
- Pode estar faltando dados ou validações

**Verificar:**
- Se `idSelectedOrder` está definido
- Se todos os campos estão preenchidos
- Se `gmapLegs` e `gmapSource` estão definidos

**Arquivo:** `src/app/menu/order/new-order/new-order.component.ts`
**Método:** `save()` linha 231

---

### 4. ❌ **Atualizar usuário - erro de CPF/CNPJ inválido**

**Problema:** Mesmo com CPF/CNPJ válido, mostra erro.

**Análise:**
- A validação está em `identification.component.ts` linha 471-653
- Linha 481-483 faz a validação
- O problema pode ser que o CPF/CNPJ está sendo validado com máscara

**Verificar:**
- Se `i.data.cpfcnpj` contém a máscara
- Se `validateCPF/validateCNPJ` está sendo chamado corretamente

**Arquivo:** `src/app/components/identification/identification.component.ts`
**Método:** `validateRequiredFields()` linha 471
**Função:** `validateCPF()` e `validateCNPJ()` em `functions.service.ts` linhas 67-180

---

### 5. ❌ **Dashboard carrega com erro**

**Problema:** Dashboard ainda mostra erro mesmo com a correção de null.

**Análise:**
- A correção foi aplicada no `dashboard.component.ts` linha 112-118
- Mas pode estar acontecendo em outro lugar
- Pode ser no `selectWeekMonthYear` ou nos gráficos

**Verificar:**
- Se `x.totals` existe na resposta da API
- Se os gráficos estão tentando acessar propriedades null

**Arquivo:** `src/app/menu/dashboard/dashboard.component.ts`
**Métodos:** `getDashboardData()` linha 105-133, `selectWeekMonthYear()` linha 54-103

---

### 6. ❌ **Visualizar pedido não mostra info na parte de baixo**

**Problema:** Visualizar pedido carrega mas não mostra informações.

**Análise:**
- Já foi corrigido o problema de coordenadas null
- Mas pode estar faltando outras informações

**Verificar:**
- Se os dados do pedido estão sendo carregados
- Se o HTML está renderizando corretamente

**Arquivo:** `src/app/menu/order/view-order/view-order.component.ts`

---

### 7. ❌ **Financeiro não tem dados**

**Pergunta:** Precisa criar dados no banco ou está funcionando?

**Resposta:** Está funcionando corretamente! Não há dados porque não há pedidos pagos/rascunhos no banco.

---

## 🎯 ORDEM DE CORREÇÃO

1. **Editar pedido** - Prioridade ALTA (crítico)
2. **Upload de fotos** - Prioridade ALTA (cadastro motorista)
3. **Deletar usuário** - Prioridade ALTA (admin)
4. **Atualizar usuário (CPF/CNPJ)** - Prioridade MÉDIA
5. **Dashboard** - Prioridade MÉDIA
6. **Visualizar pedido** - Prioridade BAIXA (já funciona parcialmente)

---

## 📝 PRÓXIMOS PASSOS

1. Ler os arquivos problemáticos
2. Adicionar logs para debug
3. Corrigir os bugs
4. Testar
5. Fazer commit e push

