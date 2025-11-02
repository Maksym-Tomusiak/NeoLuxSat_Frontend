# Stage 1: Build the React app
FROM node:20-alpine AS build
WORKDIR /app

# Copy the package files from the subdirectory
COPY neoluxsat_frontend/package*.json ./

# Run install
RUN npm install

# Copy the rest of the frontend source code
COPY neoluxsat_frontend/ .

# Run the build
RUN npm run build

# ---

# Stage 2: Serve with Nginx
FROM nginx:1.27-alpine
# Copy the built files from the build stage
COPY --from=build /app/dist /usr/share/nginx/html
# Note: Vite builds to 'dist' by default. If you changed this, update the path.
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
