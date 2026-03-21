# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:1.27-alpine
COPY --from=build /app/dist /usr/share/nginx/html
# Optional: single-page-app fallback
RUN printf "try_files \$uri /index.html;" > /etc/nginx/conf.d/rewrite.conf
EXPOSE 8080
CMD ["nginx","-g","daemon off;"]