FROM node:20 AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npx nx build server --prod

FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app/dist/apps/server /app
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/prisma/schema.prisma /app/prisma/schema.prisma

RUN npx prisma generate

EXPOSE 3000

CMD ["node", "main.js"]
