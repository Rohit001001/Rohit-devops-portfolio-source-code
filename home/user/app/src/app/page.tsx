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

import { useEffect, useRef, useState, useCallback } from "react";

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
          observer.unobserve(el); // only animate once
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

/* ===== Section: Hero =====
   Entrance animation: fade-in + slide-up with staggered delays.
   See .animate-hero-enter in globals.css.
*/
function HeroSection() {
  return (
    <section
      className="min-h-screen flex items-center justify-center"
      style={{ paddingTop: "5rem" }}
      aria-label="Hero introduction"
    >
      <div className="section-container text-center">
        {/* Terminal-style greeting — staggered animation */}
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

        {/* CTA Buttons */}
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
          {/* Photo placeholder */}
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

          {/* Summary */}
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

            {/* Contact details */}
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

/* ===== Section: Projects =====
   Each card has:
   - Small animated SVG icon (line-draw)
   - Hover lift effect (card-hover class)
*/
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
              {/* Animated SVG icon */}
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

/* ===== Section: Skills =====
   Animated progress bars: width animates when scrolled into view.
   Triggered by IntersectionObserver adding .in-view class.
*/
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
                {/* 
                  skill-bar-fill: starts at width 0%, transitions to target width.
                  The .in-view class is added when the section enters the viewport.
                  The inline style sets the target width.
                */}
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

/* ===== Section: DevOps Status =====
   Fetches /api/status and displays with animated pulse.
   Pulse color classes: status-pulse-green, status-pulse-yellow, status-pulse-red
*/
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

  // Map statusColor to CSS pulse class
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
                {/* Animated pulse dot */}
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
   Form submits to POST /api/contact
*/
function ContactSection() {
  const { ref, inView } = useInView();
  const [formState, setFormState] = useState<"idle" | "sending" | "sent" | "error">("idle");

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("sending");

    const formData = new FormData(e.currentTarget);
    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setFormState("sent");
        (e.target as HTMLFormElement).reset();
      } else {
        setFormState("error");
      }
    } catch {
      setFormState("error");
    }
  }, []);

  return (
    <section id="contact" className="border-t border-[var(--color-border)]" aria-label="Contact form">
      <div ref={ref} className={`section-container animate-fade-in-up ${inView ? "in-view" : ""}`}>
        <h2 className="text-3xl font-bold mb-8" style={{ color: "var(--color-accent)" }}>
          Contact Me
        </h2>
        <div className="max-w-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2.5 rounded-lg border text-sm"
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-1" style={{ color: "var(--color-text)" }}>
                Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="w-full px-4 py-2.5 rounded-lg border text-sm resize-none"
                style={{
                  background: "var(--color-card)",
                  borderColor: "var(--color-border)",
                  color: "var(--color-text)",
                }}
                placeholder="Tell me about your project..."
              />
            </div>
            <button
              type="submit"
              disabled={formState === "sending"}
              className="px-6 py-2.5 rounded-lg text-sm font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              style={{ background: "var(--color-accent)", color: "#fff" }}
            >
              {formState === "sending" ? "Sending..." : "Send Message"}
            </button>
            {formState === "sent" && (
              <p className="text-sm" style={{ color: "#22c55e" }}>
                Message sent successfully!
              </p>
            )}
            {formState === "error" && (
              <p className="text-sm" style={{ color: "#ef4444" }}>
                Failed to send. Please try again or email directly.
              </p>
            )}
          </form>
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
  /*
   * On mount, add .in-view to all SVG line-draw elements within the viewport.
   * Uses IntersectionObserver to trigger the stroke animation.
   */
  useEffect(() => {
    const svgElements = document.querySelectorAll(".svg-line-draw");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
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
