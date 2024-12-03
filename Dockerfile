# Usa a imagem oficial do Node.js
FROM node:20

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json package-lock.json ./

# Instala as dependências do projeto
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o Prisma Client e aplica as migrações
RUN npx prisma generate
RUN npx prisma migrate deploy

# Compila o projeto TypeScript (caso necessário)
RUN npx tsc

# Expõe a porta que o servidor utiliza
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]