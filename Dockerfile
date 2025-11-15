# Stage 1: Build the Next.js app
FROM node:20-alpine AS build

# Set build-time arguments
ARG NEXT_PUBLIC_API_BASE_URL
ARG NEXT_PUBLIC_MAPTILER_API_KEY

# Set environment variables for the build
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_MAPTILER_API_KEY=$NEXT_PUBLIC_MAPTILER_API_KEY

WORKDIR /app
COPY neoluxsat_frontend_next/package*.json ./
RUN npm install
COPY neoluxsat_frontend_next/ ./

# Run the production build
RUN npm run build

# ---

# Stage 2: Create the final production image
FROM node:20-alpine

WORKDIR /app

# Set environment to production
# This is what hides errors and enables optimizations
ENV NODE_ENV=production

# Copy the standalone server output from the build stage
COPY --from=build /app/.next/standalone ./

# Copy the public assets and static build assets
COPY --from=build /app/public ./public
COPY --from=build /app/.next/static ./.next/static

# Expose the port Next.js runs on (default 3000)
EXPOSE 3000

# Start the server
CMD ["node", "server.js"]
