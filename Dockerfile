FROM node:latest

COPY . /app
WORKDIR /app

# Installing & building
RUN npm install yarn -g
RUN yarn cache clean
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000