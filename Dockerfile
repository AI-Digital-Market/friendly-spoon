# 🔧 Build Stage
FROM node:20-alpine AS builder

# Update Alpine packages to latest security patches
RUN apk update && apk upgrade

# Set working directory
WORKDIR /app

# Optional: system deps for sharp, sass, etc.
RUN apk add --no-cache libc6-compat=1.2.5.2-r0

# Copy config files
COPY package*.json tsconfig.json vite.config.ts tailwind.config.js components.json ./

# Install dependencies
RUN npm ci

# Copy source code and static assets
COPY src/ ./src/
COPY index.html ./
COPY public/ ./public/

# Optional: copy env file (only if it exists)
# (Comment out if you don't use .env.production)
# COPY .env.production .env.production

# Build the app
RUN npm run build


# 🚀 Production Stage
FROM nginx:alpine

# Create a non-root user and group
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy built assets
COPY --from=builder /app/dist /usr/share/nginx/html

# Copy custom nginx config
COPY nginx.conf /etc/nginx/nginx.conf

# Copy SSL certificates (if present)
COPY ssl/ /etc/nginx/ssl/

# Change ownership of nginx directories to the non-root user
RUN chown -R appuser:appgroup /usr/share/nginx/html /etc/nginx /etc/nginx/ssl

# Expose ports
EXPOSE 80 443

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Switch to non-root user
USER appuser

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
