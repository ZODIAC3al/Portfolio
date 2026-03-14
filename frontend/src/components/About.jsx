import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { PERSONAL, STATS, EDUCATION } from "../data/portfolio";
import styles from "./About.module.css";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const stagger = (i) => ({
    initial: { opacity: 0, y: 30 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="about" className={`section ${styles.about}`} ref={ref}>
      <div className="container">
        <div className={styles.grid}>
          {/* Left */}
          <div className={styles.left}>
            <motion.span className="section-label" {...stagger(0)}>
              01 — About Me
            </motion.span>
            <motion.h2 className="section-title" {...stagger(1)}>
              Building the web,
              <br />
              <span className="gradient-text">one commit at a time.</span>
            </motion.h2>
            <motion.p className={styles.bio} {...stagger(2)}>
              {PERSONAL.bioLong}
            </motion.p>
            <motion.p className={styles.bio} {...stagger(3)}>
              Currently a trainee at{" "}
              <strong>ITI (Information Technology Institute)</strong>,
              affiliated with Alexandria University. Passionate about
              open-source, design patterns, and building software that scales.
            </motion.p>

            {/* Info grid */}
            <motion.div className={styles.infoGrid} {...stagger(4)}>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Location</span>
                <span className={styles.infoValue}>📍 {PERSONAL.location}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Phone</span>
                <a href={`tel:${PERSONAL.phone}`} className={styles.infoValue}>
                  {PERSONAL.phone}
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Email</span>
                <a
                  href={`mailto:${PERSONAL.email}`}
                  className={styles.infoValue}
                >
                  {PERSONAL.email}
                </a>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.infoLabel}>Status</span>
                <span className={styles.statusBadge}>
                  <span className={styles.statusDot} />
                  Open to Work
                </span>
              </div>
            </motion.div>

            <motion.div className={styles.actions} {...stagger(5)}>
              {/* Download CV — points to /public/AliMaher_CV.pdf */}
              <a
                href="https://drive.google.com/uc?export=download&id=1XVJKdrOS3t6c6vFh1zIBnqFFNBldWebc"
                download="AliMaher_CV.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Download CV
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
                </svg>
              </a>
            </motion.div>
          </div>

          {/* Right */}
          <div className={styles.right}>
            {/* Stats */}
            <motion.div className={styles.statsGrid} {...stagger(2)}>
              {STATS.map((s, i) => (
                <motion.div
                  key={s.label}
                  className={styles.statCard}
                  {...stagger(3 + i * 0.5)}
                >
                  <span className={styles.statValue}>{s.value}</span>
                  <span className={styles.statLabel}>{s.label}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* Education */}
            <motion.div className={styles.educationBlock} {...stagger(5)}>
              <h3 className={styles.blockTitle}>Education</h3>
              <div className={styles.timeline}>
                {EDUCATION.map((edu, i) => (
                  <div key={i} className={styles.timelineItem}>
                    <div className={styles.timelineDot} />
                    <div className={styles.timelineContent}>
                      <span className={styles.timelinePeriod}>
                        {edu.period}
                      </span>
                      <h4 className={styles.timelineTitle}>
                        {edu.institution}
                      </h4>
                      <p className={styles.timelineSub}>{edu.degree}</p>
                      <p className={styles.timelineLoc}>📍 {edu.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
