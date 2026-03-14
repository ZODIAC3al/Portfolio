import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PROJECTS } from '../data/portfolio';
import styles from './Projects.module.css';

const CATEGORIES = ['All', 'Web App', 'Mobile', 'Backend'];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  const [filter, setFilter] = useState('All');
  const [showAll, setShowAll] = useState(false);

  const filtered = PROJECTS.filter(p => filter === 'All' || p.category === filter);
  const visible = showAll ? filtered : filtered.slice(0, 6);

  return (
    <section id="projects" className={`section ${styles.projects}`} ref={ref}>
      <div className="container">
        <div className={styles.header}>
          <motion.span
            className="section-label"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            04 — Projects
          </motion.span>
          <div className={styles.headerRow}>
            <motion.h2
              className="section-title"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Selected work
            </motion.h2>
            {/* Filter tabs */}
            <motion.div
              className={styles.filters}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  className={`${styles.filter} ${filter === cat ? styles.filterActive : ''}`}
                  onClick={() => { setFilter(cat); setShowAll(false); }}
                >
                  {cat}
                </button>
              ))}
            </motion.div>
          </div>
        </div>

        <div className={styles.grid}>
          <AnimatePresence mode="popLayout">
            {visible.map((project, i) => (
              <motion.div
                key={project.id}
                layout
                className={`${styles.card} ${project.featured ? styles.cardFeatured : ''}`}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                whileHover={{ y: -6 }}
              >
                {/* Top bar */}
                <div className={styles.cardTop}>
                  <div className={styles.cardDots}>
                    <span style={{ background: '#ff5f57' }} />
                    <span style={{ background: '#febc2e' }} />
                    <span style={{ background: '#28c840' }} />
                  </div>
                  <span className={styles.cardCategory}>{project.category}</span>
                </div>

                {/* Color accent */}
                <div
                  className={styles.cardAccent}
                  style={{ background: `linear-gradient(135deg, ${project.color}20, transparent)` }}
                />

                {/* Content */}
                <div className={styles.cardBody}>
                  <div
                    className={styles.cardColorDot}
                    style={{ background: project.color, boxShadow: `0 0 16px ${project.color}60` }}
                  />
                  <h3 className={styles.cardName}>{project.name}</h3>
                  <p className={styles.cardTagline}>{project.tagline}</p>
                  <p className={styles.cardDesc}>{project.desc}</p>

                  {/* Tech stack */}
                  <div className={styles.cardTech}>
                    {project.tech.map((t) => (
                      <span key={t} className="tag" style={{ borderColor: `${project.color}40`, color: project.color }}>
                        {t}
                      </span>
                    ))}
                  </div>

                  {/* Links */}
                  <div className={styles.cardLinks}>
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.cardLink}
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
                        <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                      </svg>
                      Code
                    </a>
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`${styles.cardLink} ${styles.cardLinkLive}`}
                        style={{ color: project.color, borderColor: `${project.color}40` }}
                      >
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
                        </svg>
                        Live Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Show more */}
        {filtered.length > 6 && (
          <motion.div
            className={styles.showMore}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5 }}
          >
            <button className="btn-ghost" onClick={() => setShowAll(v => !v)}>
              {showAll ? 'Show Less' : `Show All ${filtered.length} Projects`}
            </button>
          </motion.div>
        )}

        {/* GitHub CTA */}
        <motion.div
          className={styles.githubCta}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <p>More projects on GitHub</p>
          <a href="https://github.com/ZODIAC3al" target="_blank" rel="noopener noreferrer" className="btn-primary">
            <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
              <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
            GitHub Profile
          </a>
        </motion.div>
      </div>
    </section>
  );
}
