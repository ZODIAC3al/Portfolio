import { motion } from "framer-motion";
import { PERSONAL } from "../data/portfolio";
import aliPhoto from "../assets/ali.png";
import styles from "./Hero.module.css";

export default function Hero() {
  const scrollTo = (href) =>
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="home" className={styles.hero}>
      <div className={styles.inner}>
        {/* ── Left: Text ── */}
        <div className={styles.text}>
          <motion.p className={styles.hello} {...fadeUp(0.1)}>
            HELLO!
          </motion.p>

          <motion.h1 className={styles.name} {...fadeUp(0.2)}>
            I'm <span className={styles.nameAccent}>Ali Maher</span>
          </motion.h1>

          <motion.h2 className={styles.subtitle} {...fadeUp(0.3)}>
            Open-Source Software Engineer
          </motion.h2>

          <motion.p className={styles.bio} {...fadeUp(0.4)}>
            {PERSONAL.bio}
          </motion.p>

          <motion.div className={styles.actions} {...fadeUp(0.5)}>
            <a
              href="#contact"
              className="btn-primary"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
            >
              HIRE ME
            </a>
            <a
              href="#projects"
              className="btn-ghost"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#projects");
              }}
            >
              MY WORKS
            </a>
          </motion.div>

          <motion.div className={styles.socials} {...fadeUp(0.6)}>
            <a
              href={PERSONAL.github}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="GitHub"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
            </a>
            <a
              href={PERSONAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.social}
              aria-label="LinkedIn"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                width="18"
                height="18"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href={`mailto:${PERSONAL.email}`}
              className={styles.social}
              aria-label="Email"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                width="18"
                height="18"
              >
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7l-10 7L2 7" />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* ── Right: Photo — static, no tilt, no animation, transparent PNG on dark bg ── */}
        <motion.div
          className={styles.photoWrap}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
            overflow: "hidden",
          }}
        >
          <img
            src={aliPhoto}
            alt="Ali Maher"
            style={{
              height: "100%",
              width: "auto",
              maxHeight: "90vh",
              objectFit: "contain",
              objectPosition: "bottom center",
              display: "block",
              background: "transparent",
              border: "none",
              borderRadius: 0,
              boxShadow: "none",
              transform: "none",
              imageRendering: "-webkit-optimize-contrast",
            }}
          />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        className={styles.scrollCue}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className={styles.scrollLine} />
        <span className={styles.scrollText}>scroll</span>
      </motion.div>
    </section>
  );
}
