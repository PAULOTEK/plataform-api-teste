# -------------------- Fase de Build --------------------
FROM public.ecr.aws/docker/library/node:23.10-slim AS builder

WORKDIR /usr/src/app

# Instalar dependências do sistema
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    build-essential \
    python3 \
    && rm -rf /var/lib/apt/lists/*

# Copiar pacotes e Prisma schema
COPY package*.json ./
COPY prisma ./prisma

# Instalar dependências
RUN npm install

# Gerar Prisma Client
RUN npx prisma generate

# Copiar restante da aplicação
COPY . .

# Build da aplicação
RUN npm run build
RUN npm audit fix || true


# -------------------- Fase Final --------------------
FROM public.ecr.aws/docker/library/node:23.10-slim

WORKDIR /usr/src/app

# Instalar dependências mínimas
RUN apt-get update && apt-get install -y --no-install-recommends \
    openssl \
    ca-certificates \
    && rm -rf /var/lib/apt/lists/*

# Copiar somente arquivos necessários
COPY package*.json ./
COPY prisma ./prisma
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY .env .

# --- IMPORTANTE ---
# Rodar prisma generate como root
RUN npx prisma generate

# Agora mudar para usuário seguro
USER node

# Definir ambiente
ENV NODE_ENV=production

# Expor porta
EXPOSE 3000

# Rodar app
CMD ["node", "dist/server.js"]

