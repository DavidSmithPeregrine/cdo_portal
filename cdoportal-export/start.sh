#!/bin/bash
set -e

echo "CDO Portal - Starting production server..."

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "Installing dependencies..."
  pnpm install --frozen-lockfile
fi

# Build the application
echo "Building application..."
pnpm build

# Run database migrations
echo "Running database migrations..."
pnpm db:push || true

# Start the server
echo "Starting server..."
NODE_ENV=production node dist/index.js
