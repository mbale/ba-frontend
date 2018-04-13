FROM node:latest

COPY . /app
WORKDIR /app

ENV HOST=$FRONTEND_HOST
ENV PORT=$FRONTEND_PORT
ENV FRONTEND_URL=$FRONTEND_URL
ENV BACKEND_URL=$BACKEND_URL

# Installing & building
RUN npm install
RUN num run build

CMD npm run start

EXPOSE 5000