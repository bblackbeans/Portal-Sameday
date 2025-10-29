# 📋 LISTA COMPLETA DE AJUSTES NECESSÁRIOS

## 🚨 **PROBLEMAS CRÍTICOS IDENTIFICADOS:**

---

## 1. ❌ **RECUPERAÇÃO DE SENHA - Erro "Telefone não encontrado"**

### **Problema:**
- Frontend envia `email`, mas backend ainda espera `phone`
- Erro: "Telefone de usuário não informado!"

### **Correções Necessárias:**

**a) Verificar endpoint da API:**
- Endpoint: `/v2/recover_password`
- **Se backend ainda não aceita `email`**, precisamos:
  - Opção 1: Corrigir backend para aceitar `email`
  - Opção 2: Mapear `email` → buscar telefone do usuário → enviar `phone`

**b) Ajustar componentes Step2 e Step3:**
- Remover referências a `phone` das interfaces (já tem, mas não usa)
- Atualizar HTML do Step2 (mudar texto "recebeu um código por SMS" para "por e-mail")

**Arquivos a ajustar:**
- `src/app/components/forgot-password/step2/step2.component.ts` - interface ainda tem `phone`
- `src/app/components/forgot-password/step2/step2.component.html` - texto ainda menciona SMS
- `src/app/components/forgot-password/step3/step3.component.ts` - interface ainda tem `phone`

---

## 2. ❌ **UPLOAD DE IMAGENS - Erro ao fazer upload**

### **Problema:**
- Erro: "Erro ao fazer upload do arquivo"
- Pode ser: endpoint não existe, FormData incorreto, ou permissões

### **Investigação Necessária:**

**a) Verificar endpoint da API:**
- Endpoint usado: `/v2/upload`
- **Verificar se existe na API:**
  - Se não existe → criar endpoint ou usar endpoint correto
  - Se existe → verificar se aceita FormData corretamente

**b) Verificar FormData:**
- Já corrigimos o `http.service.ts` para FormData
- Mas pode ser que o serviço `attach-file.service.ts` não esteja enviando corretamente

**c) Verificar persistência:**
- Após upload, verificar se arquivo está sendo salvo
- Verificar se URL retornada é válida
- Verificar se imagem aparece após recarregar página

**Arquivos a verificar:**
- `src/app/components/attach-file/attach-file.service.ts` - método `docUpload`
- `src/app/components/attach-file/attach-file.component.ts` - método `add`
- Endpoint `/v2/upload` na API (verificar documentação/backend)

---

## 3. ❌ **PAGAMENTO DE PEDIDOS - Erro genérico**

### **Problema:**
- Erro genérico ao pagar (PIX ou Cartão)
- Mensagem não é específica o suficiente

### **Correções Necessárias:**

**a) Melhorar tratamento de erros:**
- ✅ Já melhoramos parcialmente
- Mas precisa investigar erros específicos do IUGU
- Verificar se token do cartão está sendo gerado corretamente

**b) Verificar integração IUGU:**
- Verificar se Account ID está correto
- Verificar se está em modo teste/produção correto
- Verificar se cartão de teste é válido para IUGU sandbox

**c) Verificar backend:**
- Endpoint: `/portal/order/:id/invoice`
- Verificar se backend está processando pagamento corretamente
- Verificar logs do backend para entender o erro

**Arquivos a verificar:**
- `src/app/shared/iugu.service.ts` - configuração IUGU
- `src/app/menu/order/order-summary/order-summary.component.ts` - método `sendOrderInvoice`
- `src/app/menu/order/order.service.ts` - método `sendOrderInvoice`
- Backend: endpoint de pagamento

---

## 4. ❌ **CADASTRO DE MOTORISTA - Campos de conversão + Upload**

### **Problema:**
- Campos de conversão (Largura, Altura, etc.) não são reconhecidos
- Upload de fotos falha

### **Correções Necessárias:**

**a) Corrigir validação de campos de conversão:**
- Investigar `identification.component.ts` linha 531-592
- Verificar binding dos campos
- Verificar se valores estão sendo salvos corretamente

**b) Corrigir upload de fotos:**
- Mesmo problema do item 2
- Verificar se todas as 6 fotos estão sendo enviadas
- Verificar se persistência está funcionando

**Arquivos a verificar:**
- `src/app/components/identification/identification.component.ts` - validação e upload
- `src/app/components/identification/identification.component.html` - binding dos campos

---

## 📊 **RESUMO POR PRIORIDADE:**

### **🔥 PRIORIDADE CRÍTICA (Bloqueiam funcionalidades):**

1. **Upload de Imagens** ⚠️
   - Bloqueia: Cadastro de motorista, Upload de documentos
   - Ação: Verificar endpoint `/v2/upload` e FormData

2. **Recuperação de Senha** ⚠️
   - Bloqueia: Recuperação de senha por e-mail
   - Ação: Verificar se backend aceita `email` ou ajustar mapeamento

3. **Pagamento** ⚠️
   - Bloqueia: Pagamento de pedidos
   - Ação: Investigar erro específico (IUGU ou backend)

4. **Cadastro Motorista (campos conversão)** ⚠️
   - Bloqueia: Finalizar cadastro de motorista
   - Ação: Corrigir validação e binding

---

## 🔍 **VERIFICAÇÕES NECESSÁRIAS:**

### **Backend/API:**
1. ✅ Verificar se `/v2/recover_password` aceita `email` ou só `phone`
2. ✅ Verificar se `/v2/upload` existe e está funcionando
3. ✅ Verificar se `/portal/order/:id/invoice` está processando pagamentos
4. ✅ Verificar logs do backend para erros específicos

### **Frontend:**
1. ✅ Corrigir Step2 e Step3 da recuperação de senha
2. ✅ Verificar FormData no upload de imagens
3. ✅ Melhorar logs de erro no pagamento
4. ✅ Corrigir validação campos de conversão

---

## 📝 **PRÓXIMOS PASSOS:**

1. **Investigar cada problema individualmente**
2. **Verificar logs do backend/API**
3. **Testar endpoints manualmente (Postman/curl)**
4. **Aplicar correções específicas**
5. **Testar novamente**

---

## ⚠️ **OBSERVAÇÃO:**

Alguns problemas podem ser do **BACKEND**, não do frontend:
- Se `/v2/recover_password` só aceita `phone` → precisa ajustar backend
- Se `/v2/upload` não existe → precisa criar endpoint
- Se pagamento falha no backend → precisa verificar integração IUGU no backend

**Recomendação:** Verificar backend primeiro, depois ajustar frontend.

