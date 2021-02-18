FROM node:14-slim

WORKDIR /client/src/app

COPY package.json ./

RUN npm i

COPY . .

EXPOSE 3000

CMD ["npm", "start"]