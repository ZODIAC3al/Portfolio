import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { SKILLS, TECH_TAGS } from "../data/portfolio";
import styles from "./Skills.module.css";

export default function Skills() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const categories = Object.keys(SKILLS);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  // ── Derive current skills safely ──────────────────────
  const currentSkills = SKILLS[activeCategory] ?? [];

  return (
    <section id="skills" className={`section ${styles.skills}`} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            02 — Skills
          </motion.span>
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Technologies I work with
          </motion.h2>
        </div>

        {/* Category tabs */}
        <motion.div
          className={styles.tabs}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              className={`${styles.tab} ${activeCategory === cat ? styles.tabActive : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
              {activeCategory === cat && (
                <motion.span
                  className={styles.tabIndicator}
                  layoutId="tab-indicator"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Skills bars — AnimatePresence re-mounts on category change */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            className={styles.barsGrid}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            {currentSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                className={styles.skillBar}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.05 + i * 0.07 }}
              >
                <div className={styles.skillMeta}>
                  <span className={styles.skillName}>{skill.name}</span>
                  <span className={styles.skillLevel}>{skill.level}%</span>
                </div>
                <div className={styles.track}>
                  <motion.div
                    className={styles.fill}
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.level}%` }}
                    transition={{
                      duration: 0.9,
                      delay: 0.1 + i * 0.07,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* All tech tags */}
        <motion.div
          className={styles.allTags}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p className={styles.allTagsLabel}>+ More technologies:</p>
          <div className={styles.tagCloud}>
            {TECH_TAGS.map((tag, i) => (
              <motion.span
                key={tag}
                className="tag"
                whileHover={{ scale: 1.08, y: -2 }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.7 + i * 0.03 }}
              >
                {tag}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
