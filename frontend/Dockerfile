FROM node:18
ARG PORT=80
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
RUN npm run build

# FROM nginx:alpine
# COPY --from=react /app/build /usr/share/nginx/html