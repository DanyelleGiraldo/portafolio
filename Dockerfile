# Etapa 1: build
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

# Etapa 2: servir app con nginx
FROM nginx:alpine

# Copia el build de React al path público de nginx
COPY --from=builder /app/build /usr/share/nginx/html

# Opcional: copia tu propia configuración de nginx si la tienes
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
