FROM node:24.13-alpine AS build
WORKDIR /app

# Install dependencies first to leverage Docker layer cache.
COPY package*.json ./
RUN npm install --no-audit --no-fund

# Copy source and generate optimized static assets.
COPY . .
RUN npm run build

FROM nginx:1.29-alpine AS runtime

# Serve only the generated static files.
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
