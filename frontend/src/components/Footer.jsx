import { PERSONAL, NAV_LINKS } from '../data/portfolio';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div className={styles.brand}>
            <span className={styles.logo}>AM.</span>
            <p className={styles.tagline}>
              Open-Source Software Engineer<br />
              based in Alexandria, Egypt.
            </p>
          </div>

          <nav className={styles.links}>
            <span className={styles.linksTitle}>Navigation</span>
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className={styles.link}
                onClick={(e) => { e.preventDefault(); scrollTo(href); }}
              >
                {label}
              </a>
            ))}
          </nav>

          <div className={styles.links}>
            <span className={styles.linksTitle}>Connect</span>
            <a href={PERSONAL.github} target="_blank" rel="noopener noreferrer" className={styles.link}>GitHub</a>
            <a href={PERSONAL.linkedin} target="_blank" rel="noopener noreferrer" className={styles.link}>LinkedIn</a>
            <a href={`mailto:${PERSONAL.email}`} className={styles.link}>Email</a>
            <a href={`tel:${PERSONAL.phone}`} className={styles.link}>{PERSONAL.phone}</a>
          </div>
        </div>

        <div className={styles.bottom}>
          <p>© {new Date().getFullYear()} Ali Maher. All rights reserved.</p>
          <p className={styles.credit}>Built with React + Node.js + ❤️</p>
        </div>
      </div>
    </footer>
  );
}
