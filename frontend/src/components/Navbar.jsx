import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useScrollSpy } from "../hooks/useScrollSpy";
import { NAV_LINKS } from "../data/portfolio";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const sectionIds = NAV_LINKS.map((l) => l.href.replace("#", ""));
  const activeId = useScrollSpy(sectionIds, 120);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href) => {
    setMenuOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.navScrolled : ""}`}>
        <div className={styles.inner}>
          {/* Static logo */}
          <a
            href="#home"
            className={styles.logo}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#home");
            }}
          >
            ALI MAHER
          </a>

          {/* Desktop links */}
          <ul className={styles.links}>
            {NAV_LINKS.map(({ label, href }) => {
              const id = href.replace("#", "");
              const isActive = activeId === id;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={`${styles.link} ${isActive ? styles.linkActive : ""}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(href);
                    }}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Hire Me CTA */}
          <a
            href="#contact"
            className={styles.cta}
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#contact");
            }}
          >
            Hire Me
          </a>

          {/* Hamburger */}
          <button
            className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.2 }}
          >
            {NAV_LINKS.map(({ label, href }, i) => (
              <motion.a
                key={href}
                href={href}
                className={styles.mobileLink}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(href);
                }}
              >
                {label}
              </motion.a>
            ))}
            <a
              href="#contact"
              className={`btn-primary ${styles.mobileCta}`}
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#contact");
              }}
            >
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
