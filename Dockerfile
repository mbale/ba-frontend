FROM node:8.9-alpine

COPY . /app
WORKDIR /app

# Setting passed arg as ENV
ENV FRONTEND_BACKEND_URL=$FRONTEND_BACKEND_URL

# Installing & building
RUN npm cache verify
RUN npm install
RUN npm run build

CMD npm run start

EXPOSE 5000