export const PERSONAL = {
  name: "Ali Maher",
  title: "Open-Source Software Engineer",
  subtitle: "ITI Trainee",
  location: "Alexandria, Egypt",
  phone: "+20 1025436347",
  email: "alimaherr47@gmail.com",
  github: "https://github.com/ZODIAC3al",
  linkedin: "https://www.linkedin.com/in/alimahershahin/",
  bio: "Building modern, high-performance web and mobile applications using open-source technologies. Passionate about clean architecture, design patterns, and scalable systems.",
  bioLong:
    "Are you looking to build a modern, responsive website or a high-performance mobile app? I specialize in creating user-friendly, scalable solutions that bring your ideas to life. Expert in React.js and React Native, with deep experience across the full open-source stack — from frontend frameworks to backend APIs and mobile apps.",
};

export const STATS = [
  { value: "15+", label: "Projects Built" },
  { value: "1+", label: "Years Experience" },
  { value: "10+", label: "Technologies" },
];

export const SKILLS = {
  Frontend: [
    { name: "React.js", level: 95 },
    { name: "Angular", level: 85 },
    { name: "Vue.js", level: 75 },
    { name: "Next.js", level: 80 },
    { name: "Tailwind CSS", level: 90 },
    { name: "GSAP / Framer Motion", level: 80 },
  ],
  Backend: [
    { name: "Node.js / Express", level: 88 },
    { name: "PHP", level: 70 },
    { name: "Firebase / Firestore", level: 85 },
    { name: "REST API Design", level: 88 },
  ],
  Mobile: [
    { name: "React Native", level: 82 },
    { name: "Expo", level: 80 },
  ],
  "Patterns & Architecture": [
    { name: "Design Patterns", level: 78 },
    { name: "Scaling Strategies", level: 72 },
    { name: "PWA Development", level: 85 },
    { name: "Performance Optimization", level: 80 },
  ],
};

export const TECH_TAGS = [
  "JavaScript",
  "TypeScript",
  "React",
  "Angular",
  "Vue",
  "Next.js",
  "Node.js",
  "Express",
  "PHP",
  "React Native",
  "Expo",
  "Firebase",
  "Tailwind CSS",
  "GSAP",
  "Framer Motion",
  "Vite",
  "Git",
  "PWA",
];

export const SERVICES = [
  {
    number: "01",
    title: "Responsive UI Development",
    desc: "Pixel-perfect, accessible interfaces built for every screen size. Clean component architecture, smooth interactions, and performance-first code.",
  },
  {
    number: "02",
    title: "React Web Development",
    desc: "Scalable single-page applications and full-stack solutions powered by React, Next.js, and modern state management patterns.",
  },
  {
    number: "03",
    title: "React Native Mobile Apps",
    desc: "Cross-platform iOS and Android applications with native-feel performance. Built with Expo for rapid development and smooth deployment.",
  },
  {
    number: "04",
    title: "Backend API Development",
    desc: "RESTful APIs built with Node.js and Express. Clean architecture, JWT authentication, proper validation, and production-ready security.",
  },
  {
    number: "05",
    title: "PWA & Performance Engineering",
    desc: "Progressive Web Apps with offline support, push notifications, and sub-second load times. Lighthouse scores that matter.",
  },
  {
    number: "06",
    title: "Architecture & Scaling",
    desc: "Applying proven design patterns and scaling strategies to build software systems that stay maintainable as they grow.",
  },
];

export const PROJECTS = [
  {
    id: "thara",
    name: "Thara",
    tagline: "Modern E-Commerce PWA",
    desc: "High-performance shopping PWA with real-time inventory, push notifications, and offline support. Built with React + Vite + Firebase.",
    tech: ["React", "Vite", "Firebase", "Tailwind", "PWA"],
    github: "https://github.com/ZODIAC3al/Thara",
    live: "https://thara-alpha.vercel.app/",
    color: "#ffc800",
    featured: true,
    category: "Web App",
  },

  {
    id: "sockit-league",
    name: "SockitLeague",
    tagline: "Sports Social Platform",
    desc: "Full-featured React Native sports app with video recording, authentication, and real-time features built on Expo.",
    tech: ["React Native", "Expo", "TypeScript", "Firebase"],
    github: "https://github.com/ZODIAC3al/SockitLeague",
    color: "#ffc800",
    featured: true,
    category: "Mobile",
  },
  {
    id: "chicora",
    name: "Chicora",
    tagline: "Dry Clean Service App",
    desc: "Modular React PWA for a dry cleaning service with clean component architecture using Vite and Tailwind.",
    tech: ["React", "Vite", "Tailwind", "PWA"],
    github: "https://github.com/ZODIAC3al/Chicora",
    color: "#ffffff",
    featured: false,
    category: "Web App",
  },
  {
    id: "node-ecommerce",
    name: "Node E-Commerce",
    tagline: "Full-Stack REST API",
    desc: "Production-ready e-commerce backend with cart, wishlist, orders, promo codes, discounts, and role-based auth.",
    tech: ["Node.js", "Express", "MongoDB", "JWT"],
    github: "https://github.com/ZODIAC3al/node-ecommerce",
    color: "#ffc800",
    featured: false,
    category: "Backend",
  },

  {
    id: "angular-ecommerce",
    name: "Angular E-Commerce",
    tagline: "Enterprise Shopping App",
    desc: "Full-featured Angular shopping application showcasing enterprise architecture patterns.",
    tech: ["Angular", "TypeScript", "RxJS"],
    github: "https://github.com/ZODIAC3al/Angular-Ecommerce",
    color: "#ffc800",
    featured: false,
    category: "Web App",
  },
  {
    id: "lumina",
    name: "Lumina",
    tagline: "3D Web Editor & Spatial Design Tool",
    desc: "Browser-based 3D scene editor with real-time object manipulation, lighting controls, GLTF/OBJ model loading, and WebGL rendering optimized for 60fps.",
    category: "Web App",
    tech: ["React", "Three.js", "TypeScript", "Firebase", "GSAP"],
    color: "#F5A623",
    github: "https://github.com/ZODIAC3al",
    live: "https://lumina11.web.app/",
    featured: true,
  },
  {
    id: "orbit",
    name: "Orbit",
    tagline: "Aerospace Mission Control Dashboard",
    desc: "Full-featured mission control UI with real-time telemetry visualization, collaborative task management, and live Firebase data sync for multi-user planning.",
    category: "Web App",
    tech: ["React", "TypeScript", "Tailwind CSS", "Firebase", "Recharts"],
    color: "#4FC3F7",
    github: "https://github.com/ZODIAC3al",
    live: "https://orbit-da7d8.web.app/",
    featured: true,
  },
  {
    id: "rossele",
    name: "Rossele",
    tagline: "Angular Course Delivery Platform",
    desc: "Full Angular course platform with video lessons, quizzes, progress tracking, lazy-loaded modules, route guards, interceptors, and reactive forms.",
    category: "Web App",
    tech: ["Angular", "TypeScript", "RxJS", "SCSS"],
    color: "#EF5350",
    github: "https://github.com/ZODIAC3al",
    live: "https://rosselee.netlify.app/",
    featured: false,
  },
];

export const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

// ─── Education ───────────────────────────────────────────────────────────────
export const EDUCATION = [
  {
    institution: "ITI — Information Technology Institute",
    degree: "Professional Training Diploma · Open Source Track",
    period: "2025 – Present",
    location: "Alexandria, Egypt (affiliated with Alexandria University)",
  },
  {
    institution: "Alexandria University — Faculty of Science",
    degree: "Bachelor of Science in Computer Science",
    period: "2021 – 2025",
    location: "Alexandria, Egypt",
  },
];
