FROM node:8.9-alpine

COPY . /app
WORKDIR /app

RUN npm cache verify
RUN npm install

ENV NODE_ENV production
CMD npm start

EXPOSE 5000