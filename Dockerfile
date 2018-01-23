FROM node:8.9-alpine

COPY . /app
WORKDIR /app

RUN npm cache verify
RUN npm install
RUN npm build

CMD npm start

EXPOSE 5000