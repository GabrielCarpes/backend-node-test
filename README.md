# 🚀 NestJS API - Transactions

Este projeto é uma API desenvolvida com [NestJS](https://nestjs.com/) para gerenciar transações. Inclui boas práticas de segurança, testes automatizados e execução facilitada com Docker e Docker Compose.

---

## 📦 Tecnologias Utilizadas

- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [Docker](https://www.docker.com/)
- [Helmet](https://helmetjs.github.io/)
- [Rate Limiting](https://docs.nestjs.com/security/rate-limiting)
- [Jest](https://jestjs.io/) para testes
- [ESLint](https://eslint.org/) e [Prettier](https://prettier.io/)

---

## 🛠️ Requisitos

- [Docker](https://www.docker.com/)
- [Docker Compose](https://docs.docker.com/compose/)

---

# Porta padrão da aplicação NestJS

PORT=3000

# Configurações de rate limiting

THROTTLE_TTL=60 # Tempo de vida da janela (segundos)
THROTTLE_LIMIT=100 # Número máximo de requisições por janela

## 🚀 Executando com Docker

```bash
docker-compose up --build
```
