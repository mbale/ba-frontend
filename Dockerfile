FROM node:latest

COPY . /app
WORKDIR /app

# Setting passed arg as ENV
ENV FRONTEND_BACKEND_URL=$FRONTEND_BACKEND_URL

# Installing & building
RUN npm install yarn -g
RUN yarn cache clean
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000