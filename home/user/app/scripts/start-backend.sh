#!/bin/bash
# =========================================
# start-backend.sh — Start the Backend API Server
# =========================================
# This script starts the Express backend server.
# Run from the project root: ./scripts/start-backend.sh
# =========================================

echo "Starting Backend API Server..."
echo "========================================="

# Navigate to backend directory
cd "$(dirname "$0")/../backend" || exit 1

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing backend dependencies..."
  npm install
fi

# Copy .env.example to .env if .env doesn't exist
if [ ! -f ".env" ]; then
  echo "No .env found. Copying from .env.example..."
  cp .env.example .env 2>/dev/null || echo "No .env.example found, using defaults."
fi

# Start the server
echo "Backend will be available at: http://localhost:${PORT:-5000}"
node index.js
