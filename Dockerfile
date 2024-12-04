# Usa a imagem oficial do Bun
FROM oven/bun:latest

# Define o diretório de trabalho no container
WORKDIR /app

# Copia os arquivos de dependências
COPY package.json bun.lockb ./

# Instala as dependências do projeto com Bun
RUN bun install

# Copia o restante dos arquivos do projeto
COPY . .

# Gera o Prisma Client
RUN bun prisma generate

# Compila o projeto TypeScript (caso necessário)
RUN bun tsc

# Exponha a porta que o servidor utiliza
EXPOSE 3000

# Comando para aplicar migrações e iniciar o servidor
CMD bun prisma migrate deploy && bun start