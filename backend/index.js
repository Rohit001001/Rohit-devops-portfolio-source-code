/**
 * index.js — Express Backend Server for DevOps Portfolio
 * 
 * This is a minimal Express server that provides three API endpoints:
 *   GET  /api/resume  → Returns resume data as JSON
 *   POST /api/contact → Accepts contact form submissions (logs to console)
 *   GET  /api/status  → Returns service health/status information
 * 
 * Environment variables (loaded from .env):
 *   PORT             — Server port (default: 5000)
 *   CORS_ORIGIN      — Allowed CORS origin (default: http://localhost:3000)
 * 
 * How to run:
 *   1. cd backend
 *   2. npm install
 *   3. node index.js
 * 
 * How to Dockerize later:
 *   - Use node:20-alpine as base image
 *   - COPY package*.json and run npm ci --production
 *   - COPY index.js
 *   - EXPOSE the PORT
 *   - CMD ["node", "index.js"]
 */

// Load environment variables from .env file (if present)
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

// ===== Configuration =====
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000";

// ===== Middleware =====
// Enable CORS so frontend (running on a different port) can call these APIs
app.use(cors({ origin: CORS_ORIGIN }));

// Parse JSON request bodies (needed for POST /api/contact)
app.use(express.json());

// Track server start time for uptime calculation
const startTime = Date.now();

// =====================================================
// GET /api/resume
// Returns Rohit Prabhakar Gitte's resume data as JSON.
// To modify: Update the resumeData object below.
// =====================================================
app.get("/api/resume", (req, res) => {
  const resumeData = {
    name: "Rohit Prabhakar Gitte",
    title: "DevOps Engineer",
    location: "Bangalore, India",
    email: "rohitgitte01@gmail.com",
    phone: "+91 9663712525",
    linkedin: "https://linkedin.com/in/rohitgitte",
    github: "https://github.com/rohitgitte",
    summary:
      "Student in Information Science & Engineering with a strong focus on DevOps. " +
      "Experienced in building CI/CD pipelines, containerization, infrastructure as code, " +
      "and cloud services on AWS.",
    skills: [
      "Docker",
      "Kubernetes",
      "Terraform",
      "Jenkins",
      "GitHub Actions",
      "AWS (EC2, VPC, S3, IAM)",
      "Ansible",
      "Bash / Shell Scripting",
      "CI/CD Pipelines",
    ],
    projects: [
      {
        title: "End-to-End DevOps on AWS – E-commerce Microservices",
        description:
          "Designed and deployed a microservices-based e-commerce app on AWS using Docker, Kubernetes (EKS), and Terraform.",
        technologies: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins"],
      },
      {
        title: "Banking Application – DevOps Pipeline",
        description:
          "Built a complete DevOps pipeline for a banking application with Jenkins, Docker, EC2, Terraform, and Ansible.",
        technologies: ["Jenkins", "Docker", "EC2", "Terraform", "Ansible"],
      },
      {
        title: "Kubernetes Cluster Management & Monitoring",
        description:
          "Deployed and managed Kubernetes clusters. Practiced pod orchestration, rolling updates, autoscaling, and GitOps workflows.",
        technologies: ["Kubernetes", "Docker", "GitOps", "ArgoCD"],
      },
    ],
    education: {
      degree: "Information Science & Engineering",
      focus: "DevOps & Cloud Computing",
    },
  };

  res.json(resumeData);
});

// =====================================================
// POST /api/contact
// Accepts { name, email, message } and logs to console.
// To modify: Replace console.log with database write,
// file append, or email service integration.
// =====================================================
app.post("/api/contact", (req, res) => {
  const { name, email, message } = req.body;

  // Validate required fields
  if (!name || !email || !message) {
    return res.status(400).json({
      error: "Missing required fields: name, email, message",
    });
  }

  // Log the contact message (replace with your storage method in production)
  console.log("=== New Contact Message ===");
  console.log(`Name:    ${name}`);
  console.log(`Email:   ${email}`);
  console.log(`Message: ${message}`);
  console.log(`Time:    ${new Date().toISOString()}`);
  console.log("===========================");

  res.json({
    success: true,
    message: "Contact message received successfully",
  });
});

// =====================================================
// GET /api/status
// Returns service health status with uptime and timestamp.
// The statusColor field controls the frontend pulse animation:
//   "green"  = steady pulse (all systems operational)
//   "yellow" = slow pulse (degraded performance)
//   "red"    = fast pulse (service down)
// To modify: Connect to real monitoring (CloudWatch, Prometheus, etc.)
// =====================================================
app.get("/api/status", (req, res) => {
  const uptimeMs = Date.now() - startTime;
  const uptimeSeconds = Math.floor(uptimeMs / 1000);
  const hours = Math.floor(uptimeSeconds / 3600);
  const minutes = Math.floor((uptimeSeconds % 3600) / 60);
  const seconds = uptimeSeconds % 60;

  res.json({
    service: "ok",
    uptime: `${hours}h ${minutes}m ${seconds}s`,
    timestamp: new Date().toISOString(),
    statusColor: "green",
  });
});

// ===== Start Server =====
app.listen(PORT, () => {
  console.log(`🚀 DevOps Portfolio Backend running on port ${PORT}`);
  console.log(`   API endpoints:`);
  console.log(`   GET  http://localhost:${PORT}/api/resume`);
  console.log(`   POST http://localhost:${PORT}/api/contact`);
  console.log(`   GET  http://localhost:${PORT}/api/status`);
});
