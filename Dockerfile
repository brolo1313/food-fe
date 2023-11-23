FROM node:18-alpine AS build
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build
FROM nginx:stable-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /app/dist/food-market/ /usr/share/nginx/html
EXPOSE 80