FROM node:14.2-alpine as build
WORKDIR /app

# Copy dependencies first.
COPY package*.json /app/
RUN npm install .

# Copy source files and then compile.
COPY ./src /app/src
COPY ./public /app/public

RUN npm run build

FROM nginx:1.15

WORKDIR /app

# Copy build files over for Nginx.
COPY --from=build /app/build/ /usr/share/nginx/html
COPY nginx.conf nginx.conf

COPY run.sh ./
CMD /bin/sh run.sh