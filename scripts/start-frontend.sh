#!/bin/bash
# =========================================
# start-frontend.sh — Start the Frontend Dev Server
# =========================================
# This script starts the React (Next.js) frontend in development mode.
# Run from the project root: ./scripts/start-frontend.sh
# =========================================

echo "Starting Frontend Development Server..."
echo "========================================="

# Navigate to project root (assuming script is in /scripts)
cd "$(dirname "$0")/.." || exit 1

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

# Start the development server
echo "Frontend will be available at: http://localhost:3000"
npm run dev
