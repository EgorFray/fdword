# Step 1. Create the binary file  
FROM golang:1.25-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./ 
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o app ./cmd/

# Step 2. Run the binary file
FROM alpine:latest
RUN apk add --no-cache
WORKDIR /app
COPY --from=builder /app/app .
EXPOSE 8080
CMD ["./app"]