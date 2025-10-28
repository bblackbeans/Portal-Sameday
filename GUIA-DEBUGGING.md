# 🐛 GUIA DE DEBUGGING - COMO ME PASSAR AS INFORMAÇÕES

## 📋 **PARA CADA ERRO, ME PASSE:**

### **1. Screenshot do erro**
- Tire print da tela com o erro
- Inclua a mensagem de erro completa

### **2. Console do Navegador (F12)**
- Abra o Console (F12 → Console tab)
- Copie TODAS as mensagens em vermelho
- Envie como texto

### **3. Network Tab (F12)**
- Abra Network tab (F12 → Network)
- Reproduza o erro
- Me diga:
  - Qual URL foi chamada?
  - Status da resposta (200, 404, 500, etc.)
  - Response (copie o JSON retornado)

### **4. Steps para Reproduzir**
- Me diga os passos exatos que você fez
- Onde você clicou
- O que você digitou

---

## 🔍 **EXEMPLOS DE INFORMAÇÕES QUE EU PRECISO:**

### **Exemplo 1: Deletar usuário não funciona**

**Console:**
```
GET https://sameday-api.com/portal/v2/user/123 404 (Not Found)
Error: User not found
```

**Network:**
```
Request URL: https://sameday-api.com/portal/v2/user/123
Status: 404
Response: {"status":"error","message":"User not found"}
```

### **Exemplo 2: Upload de imagem dá erro**

**Console:**
```
POST https://sameday-api.com/v2/upload 500 (Internal Server Error)
Error: Cannot read property 'file' of undefined
```

**Network:**
```
Request URL: https://sameday-api.com/v2/upload
Status: 500
Request Body: {url: "data:image/jpeg;base64,..."}
```

---

## 📝 **TEMPLATE DE RELATÓRIO:**

```
PROBLEMA: [Nome do problema]

SCREENSHOT: [link ou anexo]

CONSOLE (F12):
[copiar e colar mensagens de erro]

NETWORK (F12):
- URL: [URL da requisição]
- Status: [200/404/500/etc]
- Request: [O que foi enviado]
- Response: [O que foi retornado]

STEPS PARA REPRODUZIR:
1. [passo 1]
2. [passo 2]
3. [passo 3]

O QUE ESPERAVA:
[O que deveria acontecer]

O QUE ACONTECEU:
[O que aconteceu de fato]
```

---

## 🚀 **APÓS RECEBER AS INFORMAÇÕES:**

Vou:
1. ✅ Identificar a causa raiz
2. ✅ Aplicar a correção
3. ✅ Testar logicamente
4. ✅ Enviar commit
5. ✅ Você testa novamente

**Muito mais eficiente que eu ficar adivinhando!**

---

## 📞 **FALE COMIGO:**

Envie as informações acima para cada erro e eu corrojo rapidamente! 🚀


