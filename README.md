# 🚀 SameDay Portal

Portal web desenvolvido em Angular para gerenciamento de entregas no mesmo dia.

## 📋 **Sobre o Projeto**

O SameDay Portal é uma aplicação web completa para gerenciamento de entregas, desenvolvida em Angular 10 com integração completa de APIs. O sistema suporta três tipos de usuários: clientes, motoristas e administradores.

## 🎯 **Funcionalidades Principais**

### 🔐 **Autenticação**
- ✅ Login com CPF/CNPJ
- ✅ Cadastro de usuários (Pessoa Física, Jurídica, Motorista)
- ✅ Recuperação de senha em 3 etapas
- ✅ Gerenciamento de sessão e tokens

### 👥 **Tipos de Usuário**
- **Cliente:** Gestão de pedidos e identificação
- **Motorista:** Financeiro, relatórios e identificação
- **Administrador:** Dashboard completo, gestão de usuários, pedidos e parceiros

### 📊 **Módulos**
- Dashboard com gráficos e estatísticas
- Gestão de pedidos e entregas
- Sistema financeiro completo
- Gestão de parceiros (embarcadores, transportadores, stock store)
- Upload de documentos e fotos

## 🛠️ **Tecnologias**

- **Frontend:** Angular 10, Material Design, Bootstrap
- **Backend:** APIs RESTful
- **Containerização:** Docker
- **Servidor:** Nginx
- **Deploy:** EasyPanel

## 🚀 **Deploy**

### **Pré-requisitos**
- Docker instalado
- Conta no EasyPanel

### **Deploy no EasyPanel**

1. **Criar repositório Git:**
   ```bash
   git init
   git add .
   git commit -m "SameDay Portal - Ready for Deploy"
   git branch -M main
   git remote add origin <SEU_REPOSITORIO>
   git push -u origin main
   ```

2. **No EasyPanel:**
   - Crie um novo projeto
   - Selecione "Deploy from Git"
   - Cole a URL do repositório
   - Configure porta 80

### **Deploy Local (Docker)**

```bash
# Build da imagem
docker build -t sameday-portal .

# Executar container
docker run -p 80:80 sameday-portal

# Com Docker Compose
docker-compose up --build
```

## 🌐 **APIs Integradas**

### **Autenticação (Sem autenticação necessária):**
- `POST /v2/auth/login` - Login do portal
- `POST /v2/user` - Criar usuário
- `POST /v2/recover_password` - Recuperar senha
- `POST /v2/recover_password/code/validate` - Validar código
- `POST /v2/recover_password/change` - Alterar senha

### **Usuários (Com autenticação):**
- `GET /portal/v2/user` - Obter dados do usuário
- `PUT /portal/v2/user` - Atualizar usuário
- `PUT /portal/v2/user/avatar` - Atualizar avatar
- `POST /portal/v2/user/driver/validate` - Validar entregador

### **Pedidos, Entregas, Financeiro e Parceiros:**
- Todas as rotas documentadas nas imagens da API

## 🔧 **Configuração**

### **API Endpoint:**
```
https://sameday-sameday-api.psvs5z.easypanel.host
```

### **Variáveis de Ambiente:**
```bash
NODE_ENV=production
PORT=80
```

## 📱 **URLs de Acesso**

- **Login:** `/login`
- **Cadastro:** `/register`
- **Recuperação de Senha:** `/forgot-password`
- **Health Check:** `/health`

## 🧪 **Desenvolvimento Local**

```bash
# Instalar dependências
npm install --legacy-peer-deps

# Executar em desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar servidor
npm run serve
```

## 📊 **Scripts Disponíveis**

- `npm start` - Servidor de desenvolvimento
- `npm run dev` - Executa na porta 5010
- `npm run build` - Build de produção
- `npm run build:docker` - Build da imagem Docker
- `npm run docker:run` - Executa o container
- `npm run serve` - Servidor Node.js
- `npm run lint` - Linting
- `npm run test` - Testes
- `npm run audit:fix` - Corrigir vulnerabilidades

## 🔒 **Segurança**

- Validação de CPF/CNPJ com máscara
- Senhas com critérios de segurança
- Tokens de autenticação
- Headers de segurança
- Validação de permissões por módulo

## 📈 **Performance**

- Multi-stage Docker build (~25MB)
- Compressão gzip
- Cache de assets estáticos
- Lazy loading de módulos
- Build otimizado para produção

## 🐳 **Docker**

### **Estrutura:**
- **Base:** Node.js 16 Alpine (build)
- **Produção:** Nginx Alpine
- **Tamanho:** ~25MB otimizado

### **Comandos:**
```bash
# Build
docker build -t sameday-portal .

# Executar
docker run -p 80:80 sameday-portal

# Docker Compose
docker-compose up --build
```

## 📝 **Documentação**

- `AUTHENTICATION-GUIDE.md` - Guia de autenticação
- `EASYPANEL-DEPLOY-FINAL.md` - Instruções de deploy
- `README-DOCKER.md` - Documentação Docker

## 🤝 **Contribuição**

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 **Licença**

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE.md` para mais detalhes.

## 📞 **Suporte**

Para suporte, entre em contato através dos canais oficiais da SameDay.

---

**🎉 SameDay Portal - Pronto para produção!**