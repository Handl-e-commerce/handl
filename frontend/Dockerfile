# Use the official Node.js image as the base image for building the React app
FROM node:20 AS build
# Set the working directory inside the container to /app
WORKDIR /app
# Copy the TypeScript configuration file to the working directory
COPY tsconfig.json ./
# Copy the package.json and package-lock.json files to the working directory
COPY package*.json ./
# Install the application dependencies defined in package.json
RUN npm install
# Copy the rest of the application source code into the container
COPY . .
# Build the React application for production
RUN npm run build


# Use the official Nginx image as the base image for serving the built app
FROM nginx:alpine
# Copy the .conf template
COPY ./.nginx/nginx.conf /etc/nginx/nginx.conf
# Remove default nginx index page and replace it with the static files we created in the first step
RUN rm -rf /usr/share/nginx/html/*
# Copy the built React app from the previous stage to the nginx HTML directory
COPY --from=build /app/build /usr/share/nginx/html
# Expose port 80 to allow external access to the application
EXPOSE 80
# Start Nginx in the foreground
CMD ["nginx", "-g", "daemon off;"]