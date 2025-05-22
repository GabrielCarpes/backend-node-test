# Etapa 1: build da aplicação
FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: imagem final para produção
FROM node:20

WORKDIR /app

# Copia apenas o necessário da imagem de build
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

# Inicia a aplicação
CMD ["node", "dist/main.js"]
