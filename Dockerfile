FROM node:latest

COPY . /app
WORKDIR /app

RUN printenv

ARG FRONTEND_HOST

RUN echo $FRONTEND_HOST

# Setting up env variables for frontend
ENV HOST=$FRONTEND_HOST
ENV PORT=$FRONTEND_PORT
ENV FRONTEND_URL=$FRONTEND_URL
ENV BACKEND_URL=$BACKEND_URL
ENV GA_ID=$GA_ID

# Installing yarn
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000