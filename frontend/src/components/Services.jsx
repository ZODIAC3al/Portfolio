import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SERVICES } from "../data/portfolio";
import styles from "./Services.module.css";

export default function Services() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="services" className={`section ${styles.services}`} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            03 — Services
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            What I Build
          </motion.h2>
        </div>

        <div className={styles.list}>
          {SERVICES.map((svc, i) => (
            <motion.div
              key={svc.number}
              className={styles.item}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 + i * 0.08 }}
            >
              <span className={styles.number}>{svc.number}</span>
              <div className={styles.itemBody}>
                <h3 className={styles.itemTitle}>{svc.title}</h3>
                <p className={styles.itemDesc}>{svc.desc}</p>
              </div>
              <div className={styles.itemArrow}>
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
