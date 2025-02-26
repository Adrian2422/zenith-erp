FROM node:alpine as build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build:client


FROM nginx:alpine

COPY apps/client/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist/apps/client /usr/share/nginx/html

EXPOSE 80
