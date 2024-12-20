# Use a imagem Node.js como base
FROM node:18

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia os arquivos do projeto para o container
COPY package*.json ./
COPY tsconfig*.json ./
COPY prisma ./prisma

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos
COPY . .

# Gera o cliente do Prisma
RUN npx prisma generate

# Expõe a porta usada pelo NestJS
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "run", "start:dev"]
