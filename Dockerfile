# Multi-stage build para otimizar o tamanho da imagem
FROM node:16-alpine AS build

# Definir diretório de trabalho
WORKDIR /app

# Copiar arquivos de dependências
COPY package*.json ./

# Instalar dependências com legacy peer deps para resolver conflitos
RUN npm install --legacy-peer-deps

# Copiar código fonte
COPY . .

# Build da aplicação Angular
RUN npx ng build --prod

# Estágio de produção com nginx
FROM nginx:alpine

# Copiar arquivos buildados do estágio anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuração customizada do nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Expor porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
