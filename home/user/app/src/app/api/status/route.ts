/**
 * GET /api/status
 * 
 * Returns a sample DevOps service status JSON.
 * Used by the frontend "DevOps Status" card to show animated pulse indicators.
 * 
 * Response fields:
 * - service: "ok" | "degraded" | "down"
 * - uptime: human-readable uptime string
 * - timestamp: ISO 8601 timestamp
 * - statusColor: "green" | "yellow" | "red" — controls the pulse animation
 * 
 * To modify: Connect this to real monitoring data (e.g., AWS CloudWatch,
 * Prometheus, or your own health check endpoint).
 */

import { NextResponse } from "next/server";

// Track server start time for uptime calculation
const startTime = Date.now();

export async function GET() {
  const uptimeMs = Date.now() - startTime;
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  return NextResponse.json({
    service: "ok",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    timestamp: new Date().toISOString(),
    statusColor: "green", // Change to "yellow" or "red" to test other pulse animations
  });
}
