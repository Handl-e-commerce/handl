# Start with Go base image
FROM golang:1.22-alpine

# Set working directory
WORKDIR /app

# Copy go.mod and go.sum
COPY go.mod go.sum ./

# Download dependencies
RUN go mod download

# Copy the source
COPY . .

# Build the Go binary
RUN go build -o main ./cmd/server

# Expose the app port
EXPOSE 8080

# run the binary
CMD ["./main"]