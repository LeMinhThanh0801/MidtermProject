FROM node:16


WORKDIR /app-chat

COPY package*.json ./
COPY tsconfig.json ./
COPY src /app-chat/src
COPY ecosystem.config.js /app-chat/


RUN npm install
RUN npm install pm2 -g
RUN npm run build


EXPOSE 3000

CMD ["npm","start"]


