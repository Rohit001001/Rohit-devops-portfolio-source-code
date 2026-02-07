/**
 * page.tsx — Main Portfolio Page
 * 
 * One-page DevOps portfolio for Rohit Prabhakar Gitte.
 * Sections: Hero, About, Projects, Skills, Contact, DevOps Status
 * 
 * All animations are CSS-based (defined in globals.css).
 * IntersectionObserver is used to trigger .in-view class for scroll animations.
 */

"use client";

import { useEffect, useRef, useState } from "react";

/* ===== SVG Icons for DevOps Tools =====
   These use stroke-dasharray/stroke-dashoffset for line-draw animation.
   The .svg-line-draw class animates when .in-view is added via IntersectionObserver.
*/

function DockerIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" width="40" height="40" fill="none" stroke="var(--color-accent)" strokeWidth="2" className={className} aria-hidden="true">
      <rect x="20" y="2" width="10" height="8" rx="1" className="svg-line-draw" />
      <rect x="8" y="12" width="10" height="8" rx="1" className="svg-line-draw" />
      <rect x="20" y="12" width="10" height="8" rx="1" className="svg-line-draw" />
      <rect x="32" y="12" width="10" height="8" rx="1" className="svg-line-draw" />
      <rect x="8" y="22" width="10" height="8" rx="1" className="svg-line-draw" />
      <rect x="20" y="22" width="10" height="8" rx="1" className="svg-line-draw" />
      <rect x="32" y="22" width="10" height="8" rx="1" className="svg-line-draw" />
      <path d="M2 35 C2 35 8 45 25 45 C42 45 48 35 48 35" className="svg-line-draw" />
    </svg>
  );
}

function KubernetesIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" width="40" height="40" fill="none" stroke="var(--color-accent-2)" strokeWidth="2" className={className} aria-hidden="true">
      <polygon points="25,3 45,15 45,35 25,47 5,35 5,15" className="svg-line-draw" />
      <circle cx="25" cy="25" r="8" className="svg-line-draw" />
      <line x1="25" y1="3" x2="25" y2="17" className="svg-line-draw" />
      <line x1="45" y1="15" x2="33" y2="21" className="svg-line-draw" />
      <line x1="45" y1="35" x2="33" y2="29" className="svg-line-draw" />
      <line x1="25" y1="47" x2="25" y2="33" className="svg-line-draw" />
      <line x1="5" y1="35" x2="17" y2="29" className="svg-line-draw" />
      <line x1="5" y1="15" x2="17" y2="21" className="svg-line-draw" />
    </svg>
  );
}

function TerraformIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 50 50" width="40" height="40" fill="none" stroke="var(--color-accent)" strokeWidth="2" className={className} aria-hidden="true">
      <polygon points="3,10 17,3 17,20 3,27" className="svg-line-draw" />
      <polygon points="20,3 34,10 34,27 20,20" className="svg-line-draw" />
      <polygon points="20,23 34,30 34,47 20,40" className="svg-line-draw" />
      <polygon points="37,10 47,15 47,32 37,27" className="svg-line-draw" />
    </svg>
  );
}

/* ===== Hook: useInView =====
   Adds .in-view class when element enters viewport.
   Used for scroll-triggered animations (skill bars, fade-in, SVG draw).
*/
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, inView };
}

/* ===== Section: Navigation ===== */
function Navbar() {
  const links = [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      style={{ background: "rgba(15, 23, 36, 0.9)", backdropFilter: "blur(10px)" }}
      className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)]"
      aria-label="Main navigation"
    >
      <div className="section-container flex items-center justify-between" style={{ padding: "1rem 1.5rem" }}>
        <a href="#" className="text-xl font-bold" style={{ color: "var(--color-accent)" }}>
          {"<RG />"}
        </a>
        <div className="flex gap-6">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link text-sm font-medium"
              style={{ color: "var(--color-text-muted)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

/* ===== Section: Hero ===== */
function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ paddingTop: "5rem" }}
      aria-label="Hero introduction"
    >
      <div className="section-container text-center">
        <p
          className="animate-hero-enter animate-hero-delay-1 text-sm font-mono mb-4"
          style={{ color: "var(--color-accent-2)" }}
        >
          $ whoami
        </p>

        <h1
          className="animate-hero-enter animate-hero-delay-2 text-5xl md:text-7xl font-bold mb-4"
          style={{ color: "var(--color-text)" }}
        >
          Rohit Prabhakar Gitte
        </h1>

        <p
          className="animate-hero-enter animate-hero-delay-2 text-xl md:text-2xl mb-2"
          style={{ color: "var(--color-accent)" }}
        >
          DevOps Engineer
        </p>

        <p
          className="animate-hero-enter animate-hero-delay-3 text-base max-w-2xl mx-auto mb-8"
          style={{ color: "var(--color-text-muted)" }}
        >
          Building scalable infrastructure with Docker, Kubernetes, Terraform & CI/CD pipelines.
          Based in Bangalore, India.
        </p>

        <div className="animate-hero-enter animate-hero-delay-3 flex flex-wrap gap-4 justify-center">
          <a
            href="#projects"
            className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            View My Work
          </a>
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 rounded-lg text-sm font-medium border"
            style={{ borderColor: "var(--color-accent)", color: "var(--color-accent)" }}
          >
            Get In Touch
          </a>
        </div>
      </div>
    </section>
  );
}

/* ===== Section: About ===== */
function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="border-t border-[var(--color-border)]" aria-label="About me">
      <div ref={ref} className={`section-container animate-fade-in-up ${inView ? "in-view" : ""}`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-accent)" }}>
          About Me
        </h2>
        <div className="grid md:grid-cols-3 gap-8 items-start">
          <div
            className="flex items-center justify-center rounded-xl border border-[var(--color-border)] aspect-square"
            style={{ background: "var(--color-card)" }}
            aria-label="Profile photo placeholder"
          >
            <div className="text-center">
              <div className="text-6xl mb-2" style={{ color: "var(--color-accent)" }}>RG</div>
              <p className="text-xs" style={{ color: "var(--color-text-muted)" }}>Photo Placeholder</p>
            </div>
          </div>

          <div className="md:col-span-2">
            <p className="text-base mb-4" style={{ color: "var(--color-text)" }}>
              I am a student in <strong>Information Science &amp; Engineering</strong> with a strong focus on
              DevOps practices and cloud infrastructure. I am passionate about automating software delivery
              pipelines, containerization, and infrastructure as code.
            </p>
            <p className="text-base mb-6" style={{ color: "var(--color-text-muted)" }}>
              My expertise spans across Docker, Kubernetes, Terraform, Jenkins, GitHub Actions, and AWS services
              (EC2, VPC, S3, IAM). I enjoy building end-to-end CI/CD pipelines and deploying microservices at scale.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm" style={{ color: "var(--color-text-muted)" }}>
              <div>📍 Bangalore, India</div>
              <div>📧 rohitgitte01@gmail.com</div>
              <div>📱 +91 9663712525</div>
              <div>
                🔗{" "}
                <a
                  href="https://linkedin.com/in/rohitgitte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{ color: "var(--color-accent)" }}
                >
                  LinkedIn
                </a>
                {" | "}
                <a
                  href="https://github.com/rohitgitte"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-link"
                  style={{ color: "var(--color-accent)" }}
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Section: Projects ===== */
function ProjectsSection() {
  const { ref, inView } = useInView();

  const projects = [
    {
      title: "End-to-End DevOps on AWS – E-commerce Microservices",
      description:
        "Designed and deployed a microservices-based e-commerce application on AWS using Docker, Kubernetes (EKS), and Terraform. Implemented full CI/CD with Jenkins and GitHub Actions for automated build, test, and deployment. Managed infrastructure with Terraform and configured monitoring with CloudWatch.",
      tags: ["AWS", "Docker", "Kubernetes", "Terraform", "Jenkins", "CI/CD"],
      icon: <DockerIcon />,
    },
    {
      title: "Banking Application – DevOps Pipeline",
      description:
        "Built a complete DevOps pipeline for a banking application. Set up Jenkins pipelines for automated testing and deployment, containerized the app with Docker, and deployed to EC2 instances. Implemented infrastructure as code using Terraform and configured Ansible for server provisioning.",
      tags: ["Jenkins", "Docker", "EC2", "Terraform", "Ansible", "Bash"],
      icon: <TerraformIcon />,
    },
    {
      title: "Kubernetes Cluster Management & Monitoring",
      description:
        "Deployed and managed Kubernetes clusters for learning and experimentation. Practiced pod orchestration, service mesh concepts, rolling updates, and autoscaling. Configured monitoring dashboards and explored GitOps workflows with ArgoCD.",
      tags: ["Kubernetes", "Docker", "GitOps", "Monitoring", "Shell Scripting"],
      icon: <KubernetesIcon />,
    },
  ];

  return (
    <section id="projects" className="border-t border-[var(--color-border)]" aria-label="Projects">
      <div ref={ref} className={`section-container animate-fade-in-up ${inView ? "in-view" : ""}`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-accent)" }}>
          Projects
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <article
              key={index}
              className="card-hover rounded-xl border border-[var(--color-border)] p-6"
              style={{ background: "var(--color-card)" }}
            >
              <div className="mb-4">{project.icon}</div>
              <h3 className="text-lg font-semibold mb-3" style={{ color: "var(--color-text)" }}>
                {project.title}
              </h3>
              <p className="text-sm mb-4" style={{ color: "var(--color-text-muted)" }}>
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-1 rounded"
                    style={{
                      background: "rgba(14, 165, 255, 0.1)",
                      color: "var(--color-accent)",
                      border: "1px solid rgba(14, 165, 255, 0.2)",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section: Skills ===== */
function SkillsSection() {
  const { ref, inView } = useInView(0.3);

  const skills = [
    { name: "Docker", level: 90 },
    { name: "Kubernetes", level: 85 },
    { name: "Terraform", level: 80 },
    { name: "Jenkins", level: 85 },
    { name: "GitHub Actions", level: 88 },
    { name: "AWS (EC2, VPC, S3, IAM)", level: 82 },
    { name: "Ansible", level: 75 },
    { name: "Bash / Shell Scripting", level: 88 },
  ];

  return (
    <section id="skills" className="border-t border-[var(--color-border)]" aria-label="Skills">
      <div ref={ref} className={`section-container animate-fade-in-up ${inView ? "in-view" : ""}`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-accent)" }}>
          Skills
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-medium" style={{ color: "var(--color-text)" }}>
                  {skill.name}
                </span>
                <span className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                  {skill.level}%
                </span>
              </div>
              <div
                className="h-2.5 rounded-full overflow-hidden"
                style={{ background: "rgba(14, 165, 255, 0.1)" }}
                role="progressbar"
                aria-valuenow={skill.level}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${skill.name} proficiency: ${skill.level}%`}
              >
                <div
                  className={`skill-bar-fill h-full rounded-full ${inView ? "in-view" : ""}`}
                  style={{
                    width: inView ? `${skill.level}%` : "0%",
                    background: `linear-gradient(90deg, var(--color-accent), var(--color-accent-2))`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ===== Section: DevOps Status ===== */
function StatusSection() {
  const { ref, inView } = useInView();
  const [status, setStatus] = useState<{
    service: string;
    uptime: string;
    timestamp: string;
    statusColor: string;
  } | null>(null);

  useEffect(() => {
    fetch("/api/status")
      .then((res) => res.json())
      .then((data) => setStatus(data))
      .catch(() =>
        setStatus({
          service: "unreachable",
          uptime: "N/A",
          timestamp: new Date().toISOString(),
          statusColor: "red",
        })
      );
  }, []);

  const pulseClass =
    status?.statusColor === "green"
      ? "status-pulse-green"
      : status?.statusColor === "yellow"
      ? "status-pulse-yellow"
      : "status-pulse-red";

  const dotColor =
    status?.statusColor === "green"
      ? "#22c55e"
      : status?.statusColor === "yellow"
      ? "#eab308"
      : "#ef4444";

  return (
    <section className="border-t border-[var(--color-border)]" aria-label="DevOps service status">
      <div ref={ref} className={`section-container animate-fade-in-up ${inView ? "in-view" : ""}`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-accent)" }}>
          DevOps Status
        </h2>
        <div
          className="card-hover rounded-xl border border-[var(--color-border)] p-6 max-w-md"
          style={{ background: "var(--color-card)" }}
        >
          {status ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${pulseClass}`}
                  style={{ background: dotColor }}
                  aria-label={`Service status: ${status.statusColor}`}
                />
                <span className="text-lg font-semibold" style={{ color: "var(--color-text)" }}>
                  Service: {status.service}
                </span>
              </div>
              <div className="text-sm" style={{ color: "var(--color-text-muted)" }}>
                <p>Uptime: {status.uptime}</p>
                <p>Last checked: {new Date(status.timestamp).toLocaleString()}</p>
              </div>
            </div>
          ) : (
            <p style={{ color: "var(--color-text-muted)" }}>Loading status...</p>
          )}
        </div>
      </div>
    </section>
  );
}

/* ===== Section: Contact =====
   Direct contact links — no form (avoids hydration mismatch from browser extensions).
*/
function ContactSection() {
  const { ref, inView } = useInView();

  return (
    <section id="contact" className="border-t border-[var(--color-border)]" aria-label="Contact">
      <div ref={ref} className={`section-container animate-fade-in-up ${inView ? "in-view" : ""}`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-accent)" }}>
          Contact Me
        </h2>
        <div className="max-w-lg">
          <p className="text-base mb-6" style={{ color: "var(--color-text-muted)" }}>
            Have a project in mind or want to collaborate? Feel free to reach out directly.
          </p>
          <a
            href="mailto:rohitgitte01@gmail.com"
            className="inline-block px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90"
            style={{ background: "var(--color-accent)", color: "#fff" }}
          >
            Send me an Email
          </a>
          <div className="flex gap-4 mt-6">
            <a
              href="https://linkedin.com/in/rohitgitte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm nav-link"
              style={{ color: "var(--color-accent)" }}
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/rohitgitte"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm nav-link"
              style={{ color: "var(--color-accent)" }}
            >
              GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ===== Section: Footer ===== */
function Footer() {
  return (
    <footer className="border-t border-[var(--color-border)] py-8 text-center text-sm" style={{ color: "var(--color-text-muted)" }}>
      <div className="section-container" style={{ padding: "2rem 1.5rem" }}>
        <p>
          &copy; {new Date().getFullYear()} Rohit Prabhakar Gitte. Built with React, Node.js &amp; DevOps principles.
        </p>
        <div className="flex justify-center gap-4 mt-3">
          <a href="https://linkedin.com/in/rohitgitte" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: "var(--color-accent)" }}>
            LinkedIn
          </a>
          <a href="https://github.com/rohitgitte" target="_blank" rel="noopener noreferrer" className="nav-link" style={{ color: "var(--color-accent)" }}>
            GitHub
          </a>
          <a href="mailto:rohitgitte01@gmail.com" className="nav-link" style={{ color: "var(--color-accent)" }}>
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ===== Main Page Component ===== */
export default function Home() {
  useEffect(() => {
    const svgElements = document.querySelectorAll(".svg-line-draw");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
          }
        });
      },
      { threshold: 0.5 }
    );
    svgElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <AboutSection />
        <ProjectsSection />
        <SkillsSection />
        <StatusSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
