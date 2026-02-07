#!/bin/bash
# =========================================
# start-all.sh — Start Both Frontend and Backend
# =========================================
# This script starts both the frontend and backend servers.
# Run from the project root: ./scripts/start-all.sh
# =========================================

echo "Starting DevOps Portfolio (Frontend + Backend)..."
echo "=================================================="

# Start backend in background
echo "[1/2] Starting Backend..."
cd "$(dirname "$0")" || exit 1
bash start-backend.sh &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

# Start frontend in background
echo "[2/2] Starting Frontend..."
bash start-frontend.sh &
FRONTEND_PID=$!

echo ""
echo "Both servers are running:"
echo "  Frontend: http://localhost:3000"
echo "  Backend:  http://localhost:5000"
echo ""
echo "Press Ctrl+C to stop both servers."

# Handle Ctrl+C — stop both processes
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; exit 0" SIGINT SIGTERM

# Wait for both processes
wait
