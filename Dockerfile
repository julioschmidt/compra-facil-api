# Usa a imagem oficial do Bun
FROM oven/bun:1.0.0

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json bun.lockb ./

# Instala as dependências com Bun
RUN bun install

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o Prisma Client e aplica as migrações
RUN bun prisma generate
RUN bun prisma migrate deploy

# Compila o projeto TypeScript (caso seja necessário)
RUN bun tsc

# Expõe a porta que o servidor utiliza
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["bun", "start"]