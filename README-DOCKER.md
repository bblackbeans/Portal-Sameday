# SameDay Portal

Portal web desenvolvido em Angular para gerenciamento de entregas no mesmo dia.

## 🚀 Deploy com Docker

### Pré-requisitos
- Docker instalado
- Docker Compose (opcional)

### Build e Execução

#### Opção 1: Docker Compose (Recomendado)
```bash
# Build e execução
docker-compose up --build

# Execução em background
docker-compose up -d --build
```

#### Opção 2: Docker direto
```bash
# Build da imagem
docker build -t sameday-portal .

# Execução do container
docker run -p 80:80 sameday-portal
```

#### Opção 3: Script automatizado
```bash
# Executar script de build
./build.sh

# Build da imagem Docker
npm run build:docker

# Executar container
npm run docker:run
```

### Acessar a aplicação
- **URL**: http://localhost
- **Health Check**: http://localhost/health

## 🛠️ Desenvolvimento Local

### Pré-requisitos
- Node.js 14+ (recomendado: Node.js 16+)
- npm 6+

### Instalação e Execução
```bash
# Instalar dependências
npm install --legacy-peer-deps

# Executar em modo desenvolvimento
npm run dev

# Build de produção
npm run build

# Executar servidor de produção
npm run serve
```

## 📋 Scripts Disponíveis

- `npm start` - Executa o servidor de desenvolvimento
- `npm run dev` - Executa na porta 5010
- `npm run build` - Build de produção
- `npm run build:docker` - Build da imagem Docker
- `npm run docker:run` - Executa o container
- `npm run serve` - Executa servidor Node.js
- `npm run lint` - Executa linting
- `npm run test` - Executa testes
- `npm run audit:fix` - Corrige vulnerabilidades

## 🔧 Configurações

### Variáveis de Ambiente
- **Desenvolvimento**: `src/environments/environment.ts`
- **Produção**: `src/environments/environment.prod.ts`

### Endpoints
- **Desenvolvimento**: `http://localhost:8010`
- **Produção**: `https://api-v2-sameday.herokuapp.com`

## 🐳 Docker

### Estrutura da Imagem
- **Base**: Node.js 16 Alpine (build stage)
- **Produção**: Nginx Alpine
- **Tamanho**: ~25MB (otimizado)

### Otimizações
- Multi-stage build
- Compressão gzip
- Cache de assets estáticos
- Configurações de segurança
- Health checks

## 📊 Monitoramento

### Health Check
```bash
curl http://localhost/health
```

### Logs
```bash
# Docker Compose
docker-compose logs -f

# Docker direto
docker logs -f <container_id>
```

## 🔒 Segurança

A aplicação inclui headers de segurança:
- X-Frame-Options
- X-XSS-Protection
- X-Content-Type-Options
- Content-Security-Policy

## 📝 Notas Importantes

- O projeto usa Angular 10 com dependências legadas
- Algumas vulnerabilidades podem existir devido às versões antigas
- Para produção, considere atualizar para versões mais recentes do Angular
- Use `--legacy-peer-deps` para resolver conflitos de dependências

