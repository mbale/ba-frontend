FROM node:8-alpine

COPY . /app
WORKDIR /app

ARG FRONTEND_HOST
ARG FRONTEND_PORT
ARG FRONTEND_URL
ARG BACKEND_URL
ARG GA_ID
ARG NODE_ENV=$NODE_ENV

# Setting up env variables for frontend
ENV HOST=$FRONTEND_HOST
ENV PORT=$FRONTEND_PORT
ENV FRONTEND_URL=$FRONTEND_URL
ENV BACKEND_URL=$BACKEND_URL
ENV GA_ID=$GA_ID
ENV NODE_ENV=$NODE_ENV

# Installing yarn
RUN yarn install --production=false
RUN yarn run build

CMD yarn run start

EXPOSE 5000