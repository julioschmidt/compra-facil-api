# Usa uma imagem base do Bun
FROM oven/bun:latest

# Define o diretório de trabalho dentro do container
WORKDIR /app

# Copia o package.json e o lockfile (caso existam)
COPY package.json bun.lockb /app/

# Instala as dependências
RUN bun install

# Copia o código-fonte para o container
COPY . .

# Compila o TypeScript para JavaScript
RUN bun run build

# Gera o Prisma Client
RUN bun prisma generate

# Aplica migrações no banco de dados em produção
CMD bun prisma migrate deploy && bun run dist/server.js
