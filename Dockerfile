FROM node:latest

COPY . /app
WORKDIR /app

# Setting up env variables for frontend
ENV HOST=$FRONTEND_HOST
ENV PORT=$FRONTEND_PORT
ENV FRONTEND_URL=$FRONTEND_URL
ENV BACKEND_URL=$BACKEND_URL

# Installing yarn
RUN curl -o- -L https://yarnpkg.com/install.sh | bash
RUN yarn install
RUN yarn build

CMD yarn start

EXPOSE 5000