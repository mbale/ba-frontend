FROM node:latest

COPY . /app
WORKDIR /app

ARG FRONTEND_BACKEND_URL

RUN echo $FRONTEND_BACKEND_URL

# Installing & building
RUN npm install yarn -g
RUN yarn cache clean
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000