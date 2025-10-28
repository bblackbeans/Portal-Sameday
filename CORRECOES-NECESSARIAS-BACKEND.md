# 🔧 CORREÇÕES NECESSÁRIAS NA API - BACKEND

**Data:** 28/10/2024  
**Desenvolvedor Frontend:** KaueRonald  
**Portal:** Same Day

---

## ⚠️ **PROBLEMAS IDENTIFICADOS NO BACKEND**

### **1. ENDPOINT DE UPLOAD DE ARQUIVOS**

**Status:** ❌ NÃO IMPLEMENTADO / RETORNA 404

**Erro:**
```
POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/upload
Response: 404 Route not found
```

**Impacto:**
- Usuários não conseguem fazer upload de fotos no cadastro de motorista
- Não conseguem anexar documentos (CNH, Foto do Motorista, Foto do Veículo, CRLV, Comprovante de Endereço)

**Solicitação:**
Implementar endpoint de upload:

```javascript
POST /v2/upload
Content-Type: multipart/form-data

Body: {
  file: File // Arquivo da imagem/documento
}

Response: {
  status: 'success',
  data: {
    url: {
      secure_url: 'https://...',  // URL da imagem no Cloudinary
      public_id: '...'            // ID público no Cloudinary
    }
  }
}
```

**Importante:** O frontend está enviando `FormData` com o arquivo anexado.

---

### **2. ENDPOINT DE DELETAR USUÁRIO**

**Status:** ⚠️ NECESSITA VERIFICAÇÃO

**Erro:**
```
DELETE https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/user/8
Response: 404 Route not found: DELETE /portal/v2/user/8
```

**Problema:** A rota está com prefixo `/portal` mas deveria ser:
```
DELETE /v2/user/{id}
```

**Solicitação:**
Verificar se o endpoint correto existe e está acessível em:
```
DELETE /v2/user/{id}

Response: {
  status: 'success',
  message: 'Usuário deletado com sucesso'
}
```

**Nota:** O frontend foi corrigido para usar `/v2/user/{id}`, mas o backend ainda retorna 404.

---

### **3. COORDENADAS - GOOGLE MAPS API**

**Status:** ❌ VARIÁVEL DE AMBIENTE NÃO CONFIGURADA

**Erro:**
```
GET undefined/geocode/json?address=Avenida Brigadeiro Faria Lima,Canaa&key=undefined
TypeError: Invalid URL
```

**Problema:** 
- Variável de ambiente `GOOGLE_API_KEY` não está configurada no servidor
- `BASE_URL` também está `undefined`

**Solicitação:**
Configurar variáveis de ambiente no backend:

```env
GOOGLE_API_KEY=sua_chave_api_aqui
GOOGLE_MAPS_BASE_URL=https://maps.googleapis.com/maps/api
```

**Endpoint que está falhando:**
```
GET /portal/v2/get_lat_lng_through_address
```

**Exemplo de request esperado:**
```
GET /portal/v2/get_lat_lng_through_address?address=Rua+Exemplo,123&city=Sao+Paulo&state=SP&zipCode=01234-567
```

**Response esperado:**
```json
{
  "status": "success",
  "location": {
    "lat": -23.550520,
    "lng": -46.633308
  }
}
```

---

### **4. BUSCAR PEDIDO PARA EDIÇÃO**

**Status:** ⚠️ NECESSITA VERIFICAÇÃO

**Endpoint:** 
```
GET /portal/v2/order?idOrder={id}
```

**Problema:** 
O frontend não consegue carregar os dados do pedido quando clica em "Editar".

**Solicitação:**
Verificar se o endpoint retorna todos os dados necessários:

```json
{
  "status": "success",
  "order": {
    "orderInformation": {
      "withdraw": {
        "cpfcnpj": "12345678900",
        "name": "Nome do Remetente",
        "fantasyName": "Nome Fantasia",
        "phone": "(11) 99999-9999",
        "email": "email@exemplo.com",
        "address": "Rua Exemplo",
        "number": "123",
        "district": "Bairro",
        "city": "São Paulo",
        "state": "SP",
        "zipCode": "01234-567",
        "complement": "Apartamento 10",
        "typeUser": "business",
        "location": {
          "lat": -23.550520,
          "lng": -46.633308
        }
      },
      "destiny": {
        // ... mesma estrutura
      }
    },
    "items": [
      {
        "description": "Descrição do item",
        "quantity": 1,
        "value": 10.50
      }
    ],
    "messageToDriver": "Mensagem para o motorista"
  }
}
```

**Importante:** Todos os campos devem ser retornados, mesmo que vazios.

---

## 📋 **RESUMO DAS SOLICITAÇÕES**

### **Prioridade ALTA (Bloqueante):**
1. ✅ Implementar `POST /v2/upload` (Upload de arquivos)
2. ✅ Corrigir/Verificar `DELETE /v2/user/{id}` (Deletar usuário)
3. ✅ Configurar `GOOGLE_API_KEY` e `GOOGLE_MAPS_BASE_URL` (Coordenadas)

### **Prioridade MÉDIA (Funcionalidade):**
4. ⚠️ Verificar `GET /portal/v2/order?idOrder={id}` (Editar pedido)

---

## 🧪 **COMO TESTAR APÓS CORREÇÕES:**

### **1. Teste de Upload:**
```bash
curl -X POST https://sameday-sameday-api.psvs5z.easypanel.host/v2/upload \
  -H "Authorization: Bearer {token}" \
  -F "file=@test.jpg"
```

**Esperado:** Retorno com `secure_url` e `public_id`

### **2. Teste de Deletar Usuário:**
```bash
curl -X DELETE https://sameday-sameday-api.psvs5z.easypanel.host/v2/user/8 \
  -H "Authorization: Bearer {token}"
```

**Esperado:** Status 200 com mensagem de sucesso

### **3. Teste de Coordenadas:**
```bash
curl -X GET "https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/get_lat_lng_through_address?address=Rua+Exemplo,123&city=Sao+Paulo&state=SP" \
  -H "Authorization: Bearer {token}"
```

**Esperado:** Retorno com `lat` e `lng` válidos

### **4. Teste de Buscar Pedido:**
```bash
curl -X GET "https://sameday-sameday-api.psvs5z.easypanel.host/portal/v2/order?idOrder=1" \
  -H "Authorization: Bearer {token}"
```

**Esperado:** Retorno com todos os dados do pedido formatados conforme exemplo acima

---

## 📞 **CONTATO:**

Qualquer dúvida sobre o que o frontend espera, consultar:
- `src/app/components/attach-file/attach-file.service.ts` (Upload)
- `src/app/menu/users/users.service.ts` (Deletar usuário)
- `src/app/menu/order/order.service.ts` (Buscar pedido)
- `src/app/menu/order/new-order.component.ts` (Coordenadas)

---

**Obrigado pela atenção! Após as correções, o portal estará 100% funcional!** 🚀

