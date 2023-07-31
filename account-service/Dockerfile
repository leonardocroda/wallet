# Base image
FROM node:18-alpine

EXPOSE 3000 5672 50051 50052

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY package*.json ./

RUN npm install -g @nestjs/cli

RUN npm ci 

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]