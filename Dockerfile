# Use Node.js as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package files first (to leverage Docker caching)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the frontend app (if needed)
RUN npm run build

# Expose the port the app runs on
EXPOSE 3000

# Command to run the frontend server
CMD ["npm", "start"]
