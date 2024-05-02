# crafters-corner

# Docker setup

## Build and run the frontend
docker build -t crafters-corner-frontend -f Dockerfile.frontend .
docker run -p 3000:3000 -d crafters-corner-frontend

## Build and run the backend
docker build -t crafters-corner-backend -f Dockerfile.backend .
docker run -p 4000:4000 -d crafters-corner-backend