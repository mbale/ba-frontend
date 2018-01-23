FROM node:8.9-alpine
ENV NODE_ENV production

COPY . /app

WORKDIR /app

RUN npm install yarn -g
RUN yarn install

CMD yarn start

EXPOSE 5000