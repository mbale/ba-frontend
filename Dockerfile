FROM node:latest

COPY . /app
WORKDIR /app

ENV HOST=$FRONTEND_HOST
ENV PORT=$FRONTEND_PORT
ENV FRONTEND_URL=$FRONTEND_HOST:FRONTEND_PORT
ENV BACKEND_URL=$BACKEND_URL

# Installing & building
RUN npm install yarn -g
RUN yarn cache clean
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000