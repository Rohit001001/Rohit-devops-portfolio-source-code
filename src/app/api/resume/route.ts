/**
 * GET /api/resume
 * 
 * Returns Rohit Prabhakar Gitte's resume data as JSON.
 * This endpoint serves structured resume information that can be consumed
 * by the frontend or any external service.
 * 
 * To modify: Update the resumeData object below with your own details.
 */

import { NextResponse } from "next/server";

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
        "Designed and deployed a microservices-based e-commerce app on AWS using Docker, Kubernetes (EKS), and Terraform. Implemented CI/CD with Jenkins and GitHub Actions.",
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

export async function GET() {
  return NextResponse.json(resumeData);
}
