FROM node:latest

COPY . /app
WORKDIR /app

ENV FRONTEND_BACKEND_URL='http://dockerhost.ba-staging.development.c66.me:3000'
ENV FRONTEND_URL=$HOST:$PORT

# Installing & building
RUN npm install yarn -g
RUN yarn cache clean
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000