# Use an official Node.js runtime as a parent image
FROM node:14

# Set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React application (if applicable)
RUN npm run build

# Expose port 80
EXPOSE 80

# Start the application
CMD ["npm", "start"]