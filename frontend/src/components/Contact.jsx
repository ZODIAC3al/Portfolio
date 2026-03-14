import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL } from "../data/portfolio";
import styles from "./Contact.module.css";

// Use env var only if it's set and not still the placeholder template value.
// For local dev the Vite proxy rewrites /api → localhost:4000 so the
// relative path works perfectly and avoids all CORS issues.
const rawApiUrl = import.meta.env.VITE_API_URL || "";
const API_BASE =
  rawApiUrl && !rawApiUrl.includes("your-portfolio-api") ? rawApiUrl : "/api";

const PROJECT_TYPES = [
  "Web Application",
  "Mobile App",
  "E-Commerce",
  "Landing Page",
  "API / Backend",
  "Other",
];

const BUDGETS = [
  "Under $500",
  "$500 – $1,500",
  "$1,500 – $5,000",
  "$5,000+",
  "Let's discuss",
];

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    projectType: "",
    budget: "",
    message: "",
  });
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  const update = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (status === "loading") return;
    setStatus("loading");
    setErrorMsg("");

    try {
      console.log("[Contact] Sending form:", form);
      const res = await fetch(`${API_BASE}/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) {
        setStatus("success");
        setForm({
          name: "",
          email: "",
          subject: "",
          projectType: "",
          budget: "",
          message: "",
        });
      } else {
        setStatus("error");
        // Log the exact errors so you can see them in the browser console
        console.error(
          "[Contact] Validation errors from server:",
          data.errors || data.message,
        );
        setErrorMsg(
          Array.isArray(data.errors) && data.errors.length > 0
            ? data.errors.join(" ")
            : data.message || "Something went wrong.",
        );
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="contact" className={`section ${styles.contact}`} ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left: info */}
          <div className={styles.left}>
            <motion.span
              className="section-label"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              05 — Contact
            </motion.span>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let's build
              <br />
              <span className="gradient-text">something great.</span>
            </motion.h2>
            <motion.p
              className={styles.desc}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              Have a project in mind? Looking for a developer who cares about
              quality, performance, and clean code? Let's talk.
            </motion.p>

            {/* Contact cards */}
            {[
              {
                icon: "📍",
                label: "Location",
                value: PERSONAL.location,
                link: null,
              },
              {
                icon: "📧",
                label: "Email",
                value: PERSONAL.email,
                link: `mailto:${PERSONAL.email}`,
              },
              {
                icon: "📱",
                label: "Phone",
                value: PERSONAL.phone,
                link: `tel:${PERSONAL.phone}`,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                className={styles.contactCard}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                <span className={styles.contactIcon}>{item.icon}</span>
                <div>
                  <span className={styles.contactLabel}>{item.label}</span>
                  {item.link ? (
                    <a href={item.link} className={styles.contactValue}>
                      {item.value}
                    </a>
                  ) : (
                    <span className={styles.contactValue}>{item.value}</span>
                  )}
                </div>
              </motion.div>
            ))}

            {/* Socials */}
            <motion.div
              className={styles.socials}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <a
                href={PERSONAL.github}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href={PERSONAL.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.social}
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  width="18"
                  height="18"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </motion.div>
          </div>

          {/* Right: Form */}
          <motion.div
            className={styles.formWrap}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === "success" ? (
              <div className={styles.success}>
                <div className={styles.successIcon}>✓</div>
                <h3>Message sent!</h3>
                <p>
                  Thanks for reaching out. I'll get back to you within 24–48
                  hours.
                </p>
                <button className="btn-ghost" onClick={() => setStatus("idle")}>
                  Send another
                </button>
              </div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Name *</label>
                    <input
                      type="text"
                      className={styles.input}
                      placeholder="Your full name"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      required
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Email *</label>
                    <input
                      type="email"
                      className={styles.input}
                      placeholder="your@email.com"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Subject *</label>
                  <input
                    type="text"
                    className={styles.input}
                    placeholder="Project inquiry / Collaboration / ..."
                    value={form.subject}
                    onChange={(e) => update("subject", e.target.value)}
                    required
                  />
                </div>

                <div className={styles.formRow}>
                  <div className={styles.field}>
                    <label className={styles.label}>Project Type</label>
                    <select
                      className={styles.input}
                      value={form.projectType}
                      onChange={(e) => update("projectType", e.target.value)}
                    >
                      <option value="">Select type...</option>
                      {PROJECT_TYPES.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Budget Range</label>
                    <select
                      className={styles.input}
                      value={form.budget}
                      onChange={(e) => update("budget", e.target.value)}
                    >
                      <option value="">Select range...</option>
                      {BUDGETS.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Message *</label>
                  <textarea
                    className={`${styles.input} ${styles.textarea}`}
                    placeholder="Tell me about your project..."
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    required
                    rows={5}
                  />
                </div>

                {status === "error" && (
                  <div className={styles.errorMsg}>⚠️ {errorMsg}</div>
                )}

                <button
                  type="submit"
                  className={`btn-primary ${styles.submitBtn}`}
                  disabled={status === "loading"}
                >
                  {status === "loading" ? (
                    <>
                      <span className={styles.spinner} />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" />
                      </svg>
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
