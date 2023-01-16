FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

EXPOSE 8080
CMD [ "node", "index.js" ]