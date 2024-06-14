FROM node:18
ARG PORT=8080
ENV PORT=$PORT
EXPOSE $PORT

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install application dependencies
RUN npm install && npm install typescript -g

# Copy the rest of your application code to the container
COPY . .
# Run typescript to build the app
RUN tsc

# Specify the command to run your Node.js application
CMD ["node", "build/index.js"]