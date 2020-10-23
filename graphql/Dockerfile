FROM node:14.2-alpine as build
WORKDIR /app

COPY *.json ./
RUN npm install .

COPY src src
RUN npm run build

EXPOSE 80
CMD npm start