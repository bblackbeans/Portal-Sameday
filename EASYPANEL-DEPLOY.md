# 🚀 Deploy no EasyPanel - SameDay Portal

## Instruções para Deploy no EasyPanel

### 1. Preparação do Projeto
O projeto já está configurado com:
- ✅ Dockerfile otimizado
- ✅ Configuração nginx para produção
- ✅ Scripts de build automatizados
- ✅ Docker Compose para desenvolvimento

### 2. Deploy no EasyPanel

#### Opção A: Deploy via Git (Recomendado)
1. **Faça push do projeto para um repositório Git**
2. **No EasyPanel:**
   - Crie um novo projeto
   - Selecione "Deploy from Git"
   - Cole a URL do seu repositório
   - Configure as variáveis de ambiente (se necessário)

#### Opção B: Deploy via Dockerfile
1. **No EasyPanel:**
   - Crie um novo projeto
   - Selecione "Docker"
   - Faça upload do projeto ou conecte via Git
   - O EasyPanel detectará automaticamente o Dockerfile

### 3. Configurações Recomendadas

#### Variáveis de Ambiente
```bash
NODE_ENV=production
PORT=80
```

#### Portas
- **Porta interna**: 80
- **Porta externa**: 80 (ou a que preferir)

#### Recursos Recomendados
- **CPU**: 0.5-1 vCPU
- **RAM**: 512MB-1GB
- **Storage**: 1GB

### 4. Comandos Úteis

#### Build Local (para teste)
```bash
# Build da imagem
docker build -t sameday-portal .

# Executar localmente
docker run -p 80:80 sameday-portal
```

#### Docker Compose (desenvolvimento)
```bash
# Executar com docker-compose
docker-compose up --build

# Executar em background
docker-compose up -d --build
```

### 5. Monitoramento

#### Health Check
- **URL**: `http://seu-dominio/health`
- **Resposta esperada**: `healthy`

#### Logs
```bash
# Ver logs do container
docker logs -f <container_name>

# Ver logs do nginx
docker exec <container_name> tail -f /var/log/nginx/access.log
```

### 6. Otimizações Implementadas

#### Dockerfile
- ✅ Multi-stage build (reduz tamanho da imagem)
- ✅ Node.js 16 Alpine (base leve)
- ✅ Nginx Alpine (servidor otimizado)
- ✅ Cache de dependências npm

#### Nginx
- ✅ Compressão gzip
- ✅ Cache de assets estáticos
- ✅ Headers de segurança
- ✅ Configuração para SPA (Single Page Application)
- ✅ Health check endpoint

#### Performance
- ✅ Build otimizado para produção
- ✅ Minificação de código
- ✅ Tree shaking
- ✅ Lazy loading de módulos

### 7. Troubleshooting

#### Problemas Comuns

**Erro de build:**
```bash
# Limpar cache e rebuild
docker system prune -f
docker build --no-cache -t sameday-portal .
```

**Aplicação não carrega:**
- Verifique se a porta 80 está exposta
- Confirme se o health check responde
- Verifique os logs do container

**Performance lenta:**
- Aumente os recursos (CPU/RAM)
- Verifique se a compressão gzip está ativa
- Monitore o uso de recursos

### 8. Estrutura de Arquivos Criados

```
sameday-portal-main/
├── Dockerfile              # Imagem Docker otimizada
├── docker-compose.yml      # Orquestração local
├── nginx.conf              # Configuração nginx
├── .dockerignore           # Arquivos ignorados no build
├── build.sh               # Script de build automatizado
└── README-DOCKER.md       # Documentação completa
```

### 9. Próximos Passos

1. **Deploy no EasyPanel** seguindo as instruções acima
2. **Configure domínio personalizado** (se necessário)
3. **Configure SSL/HTTPS** (recomendado)
4. **Configure monitoramento** (opcional)
5. **Configure backup** (recomendado)

### 10. Suporte

Se encontrar problemas:
1. Verifique os logs do container
2. Teste localmente com Docker
3. Verifique as configurações do EasyPanel
4. Consulte a documentação do EasyPanel

---

**🎉 Seu projeto está pronto para deploy no EasyPanel!**

