FROM node:lts-alpine AS builder
ARG APP
WORKDIR /app
COPY package*.json ./
COPY nx.json ./
COPY tsconfig.base.json ./
RUN npm install
COPY . .
RUN npx nx build ${APP}


FROM docker.io/nginxinc/nginx-unprivileged
ARG APP
USER root
WORKDIR /app
COPY nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=builder /app/dist/apps/${APP}/browser /usr/share/nginx/html/
EXPOSE 8080:8080
CMD ["/bin/sh",  "-c",  "envsubst < /usr/share/nginx/html/assets/env.template.js > /usr/share/nginx/html/assets/env.js && exec nginx -g 'daemon off;'"]