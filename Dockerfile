FROM node:8.9-alpine

COPY . /app
WORKDIR /app

RUN npm cache verify
RUN npm install
RUN npm run build

CMD npm run start

EXPOSE 5000