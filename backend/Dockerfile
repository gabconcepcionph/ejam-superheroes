# Base image
FROM node:18-alpine

# Create app directory
WORKDIR /app

# Install global dependencies
RUN npm install -g nodemon

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies with legacy peer deps
RUN npm install --legacy-peer-deps

# Copy all files
COPY . .

# Build the application
RUN npm run build

# Expose the port
EXPOSE 3000

# Set environment to development
ENV NODE_ENV=development

# Use nodemon for development with hot-reloading
CMD ["npm", "run", "start:dev"]
