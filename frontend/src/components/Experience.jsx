import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import styles from "./Experience.module.css";

const EXPERIENCES = [
  {
    id: 1,
    role: "Open Source Developer",
    company: "Information Technology Institute (ITI)",
    type: "Internship",
    period: "Oct 2025 – Present",
    duration: "6 mos",
    location: "Alexandria, Egypt",
    mode: "On-site",
    skills: [
      "React",
      "Software Development",
      "Design Patterns",
      "Open Source",
      "Git",
      "TypeScript",
      "Node.js",
    ],
    color: "#F5A623",
    current: true,
  },
  {
    id: 2,
    role: "React Developer",
    company: "MaVoid",
    type: "Part-time",
    period: "Mar 2025 – Oct 2025",
    duration: "8 mos",
    location: "Alexandria, Egypt",
    mode: "On-site",
    skills: [
      "JavaScript",
      "React",
      "Responsive Web Design",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Redux",
      "Framer Motion",
      "GSAP",
      "Figma",
    ],
    color: "#4FC3F7",
    current: false,
  },
  {
    id: 3,
    role: "Customer Service Specialist",
    company: "Octopus Outsourcing",
    type: "Full-time",
    period: "May 2025 – Aug 2025",
    duration: "4 mos",
    location: "Alexandria, Egypt",
    mode: "On-site",
    skills: ["Customer Service", "Customer Support", "Communication"],
    color: "#A78BFA",
    current: false,
  },
  {
    id: 4,
    role: "Fullstack .NET Development Trainee",
    company: "Digital Egypt Pioneers Initiative (DEPI)",
    type: "Internship",
    period: "Oct 2024 – May 2025",
    duration: "8 mos",
    location: "Alexandria, Egypt",
    mode: "Hybrid",
    skills: [
      "C#",
      ".NET",
      "SQL Server",
      "Soft Skills",
      "ASP.NET",
      "Entity Framework",
      "MVC",
      "REST APIs",
      "Git",
      "Azure",
    ],
    color: "#34D399",
    current: false,
  },
  {
    id: 5,
    role: "React Native Developer",
    company: "MedlyTech",
    type: "Full-time",
    period: "Nov 2024 – Feb 2025",
    duration: "4 mos",
    location: "Belgium",
    mode: "Remote",
    skills: [
      "React Native",
      "Mobile Applications",
      "Responsive Web Design",
      "TypeScript",
      "Expo",
      "REST APIs",
    ],
    color: "#F472B6",
    current: false,
  },
  {
    id: 6,
    role: ".NET Developer",
    company: "Information Technology Institute (ITI)",
    type: "Internship",
    period: "Jul 2024 – Aug 2024",
    duration: "2 mos",
    location: "Egypt",
    mode: "Hybrid",
    skills: ["C#", "LINQ", "SQL", "ASP.NET", "Git"],
    color: "#F5A623",
    current: false,
  },
  {
    id: 7,
    role: "Frontend React Developer",
    company: "CodSoft",
    type: "Internship",
    period: "Jun 2024 – Jul 2024",
    duration: "2 mos",
    location: "Remote",
    mode: "Remote",
    skills: [
      "JavaScript",
      "React",
      "Responsive Web Design",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Git",
    ],
    color: "#60A5FA",
    current: false,
  },
  {
    id: 8,
    role: "Frontend React Developer",
    company: "CognoRise InfoTech",
    type: "Internship",
    period: "Jun 2024 – Jul 2024",
    duration: "2 mos",
    location: "Egypt",
    mode: "Remote",
    skills: [
      "JavaScript",
      "React",
      "Responsive Web Design",
      "HTML5",
      "CSS3",
      "Redux",
      "REST APIs",
      "Git",
    ],
    color: "#F87171",
    current: false,
  },
  {
    id: 9,
    role: "Frontend React Developer",
    company: "Excellence Company for Training & Consulting",
    type: "Internship",
    period: "Apr 2024 – Jul 2024",
    duration: "4 mos",
    location: "Alexandria, Egypt",
    mode: "On-site",
    skills: [
      "JavaScript",
      "React",
      "Responsive Web Design",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Figma",
      "REST APIs",
      "Git",
    ],
    color: "#FBBF24",
    current: false,
  },
];

const EDUCATION = [
  {
    id: "edu1",
    degree: "Professional Training Diploma",
    institution: "Information Technology Institute (ITI)",
    field: "Open Source Application Development",
    period: "2025 – Present",
    location: "Alexandria, Egypt · Affiliated with Alexandria University",
    highlights: [
      "React",
      "Node.js",
      "Angular",
      "Linux",
      "Agile",
      "Design Patterns",
    ],
    color: "#F5A623",
    icon: "🎓",
  },
  {
    id: "edu2",
    degree: "Bachelor of Science",
    institution: "Alexandria University",
    field: "Computer Science · Faculty of Science",
    period: "2021 – 2025",
    location: "Alexandria, Egypt",
    highlights: [
      "Data Structures",
      "Algorithms",
      "Databases",
      "OOP",
      "Operating Systems",
    ],
    color: "#4FC3F7",
    icon: "🏛️",
  },
];

function ModeTag({ mode }) {
  const map = {
    Remote: { bg: "rgba(52,211,153,0.12)", color: "#34D399" },
    "On-site": { bg: "rgba(245,166,35,0.12)", color: "#F5A623" },
    Hybrid: { bg: "rgba(79,195,247,0.12)", color: "#4FC3F7" },
  };
  const s = map[mode] || map["Remote"];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: "0.72rem",
        fontWeight: 600,
        letterSpacing: "0.04em",
      }}
    >
      {mode}
    </span>
  );
}

function TypeTag({ type }) {
  const map = {
    "Full-time": { bg: "rgba(79,195,247,0.1)", color: "#4FC3F7" },
    "Part-time": { bg: "rgba(167,139,250,0.1)", color: "#A78BFA" },
    Internship: { bg: "rgba(245,166,35,0.1)", color: "#F5A623" },
  };
  const s = map[type] || map["Internship"];
  return (
    <span
      style={{
        background: s.bg,
        color: s.color,
        padding: "2px 10px",
        borderRadius: 20,
        fontSize: "0.72rem",
        fontWeight: 600,
      }}
    >
      {type}
    </span>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [activeTab, setActiveTab] = useState("experience");
  const [expanded, setExpanded] = useState(null);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    animate: inView ? { opacity: 1, y: 0 } : {},
    transition: { duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section
      id="experience"
      className={`section ${styles.experience}`}
      ref={ref}
    >
      <div className="container">
        {/* Header */}
        <div className={styles.header}>
          <motion.span className="section-label" {...fadeUp(0)}>
            03 — Experience
          </motion.span>
          <motion.h2 className="section-title" {...fadeUp(0.1)}>
            Where I've worked &amp; studied
          </motion.h2>
        </div>

        {/* Tabs */}
        <motion.div className={styles.tabs} {...fadeUp(0.2)}>
          {["experience", "education"].map((tab) => (
            <button
              key={tab}
              className={`${styles.tab} ${activeTab === tab ? styles.tabActive : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "experience" ? "Work Experience" : "Education"}
              {activeTab === tab && (
                <motion.span
                  className={styles.tabIndicator}
                  layoutId="exp-tab-indicator"
                />
              )}
            </button>
          ))}
        </motion.div>

        {/* Content */}
        <AnimatePresence mode="wait">
          {activeTab === "experience" ? (
            <motion.div
              key="experience"
              className={styles.timeline}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {EXPERIENCES.map((exp, i) => (
                <motion.div
                  key={exp.id}
                  className={`${styles.timelineItem} ${expanded === exp.id ? styles.timelineItemExpanded : ""}`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{
                    duration: 0.5,
                    delay: 0.1 + i * 0.07,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  onClick={() =>
                    setExpanded(expanded === exp.id ? null : exp.id)
                  }
                >
                  {/* Timeline spine */}
                  <div className={styles.spine}>
                    <div
                      className={styles.dot}
                      style={{
                        background: exp.color,
                        boxShadow: `0 0 0 4px ${exp.color}22`,
                      }}
                    />
                    {i < EXPERIENCES.length - 1 && (
                      <div className={styles.line} />
                    )}
                  </div>

                  {/* Card */}
                  <div
                    className={styles.card}
                    style={{
                      borderColor:
                        expanded === exp.id ? `${exp.color}50` : "transparent",
                    }}
                  >
                    {/* Current badge */}
                    {exp.current && (
                      <span className={styles.currentBadge}>
                        <span className={styles.currentDot} />
                        Current
                      </span>
                    )}

                    {/* Top row */}
                    <div className={styles.cardTop}>
                      <div className={styles.cardLeft}>
                        <div
                          className={styles.colorBar}
                          style={{ background: exp.color }}
                        />
                        <div>
                          <h3 className={styles.role}>{exp.role}</h3>
                          <p className={styles.company}>{exp.company}</p>
                        </div>
                      </div>
                      <div className={styles.cardRight}>
                        <span className={styles.period}>{exp.period}</span>
                        <span className={styles.duration}>{exp.duration}</span>
                      </div>
                    </div>

                    {/* Tags row */}
                    <div className={styles.tagRow}>
                      <TypeTag type={exp.type} />
                      <ModeTag mode={exp.mode} />
                      <span className={styles.location}>📍 {exp.location}</span>
                    </div>

                    {/* Expanded skills */}
                    <AnimatePresence>
                      {expanded === exp.id && (
                        <motion.div
                          className={styles.skillsWrap}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.28 }}
                        >
                          <div className={styles.skills}>
                            {exp.skills.map((s) => (
                              <span
                                key={s}
                                className={styles.skill}
                                style={{
                                  borderColor: `${exp.color}40`,
                                  color: exp.color,
                                }}
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Expand chevron */}
                    <div
                      className={styles.chevron}
                      style={{ color: exp.color }}
                    >
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        style={{
                          transform:
                            expanded === exp.id
                              ? "rotate(180deg)"
                              : "rotate(0deg)",
                          transition: "transform 0.25s",
                        }}
                      >
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="education"
              className={styles.eduGrid}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28 }}
            >
              {EDUCATION.map((edu, i) => (
                <motion.div
                  key={edu.id}
                  className={styles.eduCard}
                  initial={{ opacity: 0, y: 24 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.15 }}
                  whileHover={{ y: -4 }}
                  style={{ borderColor: `${edu.color}30` }}
                >
                  <div
                    className={styles.eduAccent}
                    style={{
                      background: `linear-gradient(135deg, ${edu.color}18, transparent)`,
                    }}
                  />
                  <div className={styles.eduTop}>
                    <span className={styles.eduIcon}>{edu.icon}</span>
                    <span
                      className={styles.eduPeriod}
                      style={{ color: edu.color }}
                    >
                      {edu.period}
                    </span>
                  </div>
                  <h3 className={styles.eduDegree}>{edu.degree}</h3>
                  <p
                    className={styles.eduInstitution}
                    style={{ color: edu.color }}
                  >
                    {edu.institution}
                  </p>
                  <p className={styles.eduField}>{edu.field}</p>
                  <p className={styles.eduLocation}>📍 {edu.location}</p>
                  <div className={styles.eduSkills}>
                    {edu.highlights.map((h) => (
                      <span
                        key={h}
                        className={styles.eduSkill}
                        style={{
                          borderColor: `${edu.color}35`,
                          color: edu.color,
                        }}
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
