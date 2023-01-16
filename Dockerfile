FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN yarn install --production

COPY . .

EXPOSE 5000
CMD [ "node", "index.js" ]