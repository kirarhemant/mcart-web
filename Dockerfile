# Build stage
FROM node:20-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Serve stage
FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Create proper config
RUN printf 'server {\n\
  listen 8080;\n\
  server_name _;\n\
\n\
  location / {\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
    try_files $uri /index.html;\n\
  }\n\
\n\
  location /api/ {\n\
    proxy_pass http://34.111.146.234/api/;\n\
  }\n\
}' > /etc/nginx/conf.d/default.conf

COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

CMD ["nginx", "-g", "daemon off;"]