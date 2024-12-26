# Use a imagem base do Node.js
FROM node:16-alpine

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e pnpm-lock.yaml para o diretório de trabalho
COPY package.json pnpm-lock.yaml ./

# Instale as dependências do projeto
RUN npm install -g pnpm && pnpm install

# Copie todo o código-fonte para o diretório de trabalho
COPY . .

# Construa o aplicativo para produção
RUN pnpm run build

# Use uma imagem base do Nginx para servir o aplicativo
FROM nginx:alpine

# Copie os arquivos de build do React para o diretório padrão do Nginx
COPY --from=0 /app/build /usr/share/nginx/html

# Exponha a porta 80 para o Nginx
EXPOSE 80

# Comando para iniciar o Nginx
CMD ["nginx", "-g", "daemon off;"]