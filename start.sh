#!/bin/bash
set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
log_info() {
  echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
  echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
  echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
  echo -e "${RED}[ERROR]${NC} $1"
}

# Start deployment
log_info "=========================================="
log_info "CDO Portal - Railway Deployment"
log_info "=========================================="

# Check environment
log_info "Checking environment variables..."
if [ -z "$DATABASE_URL" ]; then
  log_error "DATABASE_URL is not set"
  exit 1
fi
log_success "DATABASE_URL is configured"

if [ -z "$NODE_ENV" ]; then
  log_warning "NODE_ENV not set, defaulting to production"
  export NODE_ENV=production
fi
log_success "NODE_ENV: $NODE_ENV"

# Check if node_modules exists
log_info "Checking dependencies..."
if [ ! -d "node_modules" ]; then
  log_warning "node_modules not found, installing dependencies..."
  pnpm install --frozen-lockfile
  log_success "Dependencies installed"
else
  log_success "node_modules found, skipping installation"
fi

# Build the application
log_info "Building application..."
if pnpm build; then
  log_success "Application built successfully"
else
  log_error "Build failed"
  exit 1
fi

# Check if dist directory exists
if [ ! -d "dist" ]; then
  log_error "Build output directory (dist) not found"
  exit 1
fi
log_success "Build output verified"

# Run database migrations
log_info "Running database migrations..."
if pnpm db:push 2>&1 | tee /tmp/db_migration.log; then
  log_success "Database migrations completed"
else
  # Don't fail on migration errors - database might already be set up
  log_warning "Database migration had issues, but continuing..."
  cat /tmp/db_migration.log
fi

# Verify database connection
log_info "Verifying database connection..."
if timeout 10 node -e "
  const mysql = require('mysql2/promise');
  const url = new URL(process.env.DATABASE_URL);
  const config = {
    host: url.hostname,
    port: url.port || 3306,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    waitForConnections: true,
    connectionLimit: 1,
    queueLimit: 0,
  };
  mysql.createPool(config).getConnection()
    .then(conn => {
      console.log('Database connection successful');
      conn.release();
      process.exit(0);
    })
    .catch(err => {
      console.error('Database connection failed:', err.message);
      process.exit(1);
    });
" 2>/dev/null; then
  log_success "Database connection verified"
else
  log_warning "Database connection check skipped or failed, but continuing..."
fi

# Start the server
log_info "Starting server..."
log_info "Environment: $NODE_ENV"
log_info "Port: ${PORT:-3000}"
log_info "=========================================="

# Export environment for the server
export NODE_ENV=${NODE_ENV:-production}
export PORT=${PORT:-3000}

# Start the application
exec node dist/index.js
