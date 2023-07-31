# Base image
FROM node:18

EXPOSE 3000 5672 50051 50052

WORKDIR /usr/src/app

ENV NODE_ENV=DEVELOPMENT

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD [ "node", "dist/main.js" ]