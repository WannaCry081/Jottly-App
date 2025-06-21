# Base image
FROM node:22-alpine

# Install git and other dependencies
RUN apk add --no-cache git

# Set working directory
WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy lockfile and package.json first to improve build cache
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install

# Copy rest of the app
COPY . .

# Expose app port
EXPOSE 3000

# Start dev server
CMD ["pnpm", "dev"]