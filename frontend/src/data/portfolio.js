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
    "Versatile Full-Stack Engineer with expertise in building production-grade web and mobile applications across diverse ecosystems. Proven ability to architect scalable systems from concept to deployment, handling complete development lifecycles including frontend UI/UX, backend APIs, real-time databases, payment integrations, and cloud infrastructure. Passionate about writing clean, maintainable code and delivering high-performance solutions that solve real business problems—from restaurant e-commerce platforms to sports league management apps to creative studio dashboards.",
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
    id: "kids-oasis",
    name: "Kids Oasis",
    tagline: "Enterprise Education Marketplace & Academy Management Platform",
    desc: "A FAANG-grade dual-sided education marketplace connecting parents with nurseries, preschools, sports academies, language institutes, STEM/coding centers, and arts programs. Features Next.js 15 App Router, NestJS 10 API, MongoDB Atlas, Stripe payments, Socket.io real-time chat, TOTP MFA, and Cloudinary.",
    tech: ["Next.js 15", "NestJS 10", "TypeScript", "MongoDB", "Stripe", "Socket.io", "Cloudinary", "Redux Toolkit", "Framer Motion", "i18n AR/EN"],
    github: "https://github.com/ZODIAC3al/Kids-Oasis",
    live: "https://kids-oasis-platform.vercel.app",
    color: "#0EA5E9",
    featured: true,
    category: "Web App",
    techSpecs: {
      metrics: [
        { label: "Frontend Framework", value: "Next.js 15.5" },
        { label: "Backend API", value: "NestJS 10" },
        { label: "Database", value: "MongoDB Atlas" },
        { label: "Real-time & Pay", value: "Socket.io + Stripe" }
      ],
      backend: [
        "NestJS 10 REST API architecture with TypeScript 5.9 and Mongoose 8.x ODM",
        "Modular domain structure: Auth, Academies, Enrollments & Bookings, Children, Chat (Socket.io), Payments (Stripe), Cloudinary Media, Newsletter, Site APIs",
        "Security Pipeline: Helmet, Rate Limiting, bcrypt (salt 12), TOTP MFA (speakeasy), JWT dual-token system (HttpOnly cookies), Google OAuth 2.0",
        "8-level Role Authority Matrix: Guest, Parent, Teacher, Staff, Owner, Support, Admin, SuperAdmin hierarchy",
        "API Documentation with Swagger / OpenAPI 3.0"
      ],
      frontend: [
        "Next.js 15.5 App Router with TypeScript 5.x, Redux Toolkit, and Axios",
        "next-intl internationalization with full Arabic (RTL) and English (LTR) support",
        "Vanilla CSS + CSS Custom Properties & Framer Motion 11 animations",
        "shadcn/ui & Lucide React UI components with responsive mobile-first design"
      ],
      payments: [
        "Stripe PaymentIntent flow for online tuition payments and booking deposits",
        "Cloudinary CDN integration for image uploads and media optimization"
      ],
      deployment: [
        "Frontend: Vercel Edge Network",
        "Backend: Vercel Serverless Functions (NestJS API)",
        "Database: MongoDB Atlas"
      ]
    }
  },
  {
    id: "wamdh",
    name: "WAMDH (ومضة)",
    tagline: "AI-Powered Spaced-Repetition Learning & Knowledge Graph Ecosystem",
    desc: "Full-stack cross-platform study ecosystem designed to supercharge student learning through Retrieval-Augmented Generation (RAG) AI Tutor (Mona), SuperMemo-2 (SM-2) spaced repetition flashcards, auto-generated quizzes, AI study planner/Kanban, PyMuPDF/PyTesseract OCR, real-time peer study communities, and auto-evolving knowledge graphs.",
    tech: ["React Native", "Expo SDK 51", "Next.js 14", "Django REST", "MongoDB", "Google Gemini", "SuperMemo SM-2", "RAG", "PyTesseract OCR", "i18n RTL"],
    github: "https://github.com/ZODIAC3al",
    live: "https://wamdh.vercel.app/",
    color: "#8E75B2",
    featured: true,
    category: "Mobile",
    techSpecs: {
      metrics: [
        { label: "Mobile Stack", value: "Expo SDK 51" },
        { label: "Backend Core", value: "Django DRF" },
        { label: "AI Engine", value: "Gemini 1.5 + RAG" },
        { label: "Retention Alg", value: "SuperMemo SM-2" }
      ],
      backend: [
        "Django 5.0 REST Framework API with SimpleJWT authentication and MongoDB database router",
        "RAG Pipeline: PyMuPDF + PyTesseract OCR extraction, 500-word chunking (50-word overlap), SentenceTransformers (all-MiniLM-L6-v2) 384-dim dense embeddings",
        "SuperMemo-2 (SM-2) Spaced Repetition formula for recall interval optimization",
        "Google Gemini 1.5 Flash grounded AI Tutor (Mona) with optional ELI5 mode",
        "Django Channels & Redis Pub/Sub for real-time study community messaging"
      ],
      frontend: [
        "React Native 0.74 & Expo SDK 51 cross-platform mobile application",
        "Next.js 14 Web Marketing Site",
        "Full Arabic (RTL) and English (LTR) i18n support",
        "Interactive LaTeX & Math Whiteboard canvas",
        "Zustand state management & React Query client"
      ],
      deployment: [
        "Mobile: Expo SDK / React Native",
        "Web: Next.js on Vercel Edge Network",
        "Backend: Django DRF + MongoDB + Redis"
      ]
    }
  },
  {
    id: "the-code-father",
    name: "The Code Father",
    tagline: "Interactive Developer Learning & Coding Platform",
    desc: "Interactive educational platform for developer learning, coding practice, structured programming tracks, and developer tools.",
    tech: ["Next.js", "React", "TypeScript", "Node.js", "Tailwind CSS"],
    github: "https://github.com/ZODIAC3al",
    live: "https://the-code-father-v1.vercel.app/en",
    color: "#E0234E",
    featured: true,
    category: "Web App",
  },
  {
    id: "meto-platform",
    name: "Meto-Platform",
    tagline: "Full-Stack E-Commerce (MERN)",
    desc: "Restaurant ordering & delivery platform for Meto burger chain in Alexandria, Egypt. Built with Express.js + MongoDB backend (40+ endpoints, JWT auth, bcryptjs hashing, OTP) and React 18 frontend (Vite, i18n Arabic/English, Stripe payments, Recharts analytics). Deployed to Netlify + Vercel with 99% uptime, <1s payment confirmation, 1000+ concurrent users.",
    tech: ["React 18", "Vite", "Express.js", "MongoDB", "Node.js", "Stripe", "Cloudinary", "i18next"],
    github: "https://github.com/ZODIAC3al/Meto-Platform",
    live: "https://meto-frontend.vercel.app/",
    color: "#ffc800",
    featured: true,
    category: "Web App",
    techSpecs: {
      backend: [
        "7 API route modules: authRoutes, userRoutes, productRoutes, orderRoutes, reviewRoutes, paymentRoutes, messageRoutes",
        "7 Controllers: authController (register/login/JWT), googleAuthController (OAuth), userController, productController, orderController, reviewController, paymentController",
        "4 Mongoose Models with validation: User, Product, Order, Review",
        "JWT dual-token system: accessToken (7d) + refreshToken (30d) with secure HTTP-only cookies",
        "Password hashing: bcryptjs (12 salt rounds) with crypto module",
        "Email verification: Token-based system with 10-minute expiration",
        "OTP verification: 6-digit OTP with SHA256 hashing",
        "Password reset: Crypto tokens with 10-minute expiration",
        "Refresh token rotation on each login",
        "Cross-origin cookies handling"
      ],
      security: [
        "Helmet.js for HTTP security headers",
        "CORS with whitelist validation",
        "Rate limiting: 500 requests/60 seconds per IP",
        "MongoDB injection prevention: express-mongo-sanitize",
        "XSS protection: xss-clean middleware",
        "Request validation: express-validator",
        "Async error handling: Custom catchAsync wrapper",
        "Error middleware: Global AppError handler"
      ],
      frontend: [
        "Component-based UI: Admin, Auth, Cart, Home, Layout, Menu, Orders, User components",
        "i18n Internationalization: Full Arabic/English support with translation keys",
        "Cart state management: Context API with persistent storage",
        "Responsive design: Mobile-first with Tailwind CSS",
        "PWA Install Banner component",
        "Framer Motion animations",
        "Recharts analytics dashboard integration"
      ],
      payments: [
        "Stripe API: Full payment flow implementation",
        "Cloudinary: Image upload and storage",
        "Transaction confirmation and order creation"
      ],
      deployment: [
        "Frontend: Vercel",
        "Backend: Vercel (serverless functions)",
        "Database: MongoDB Atlas (cloud)"
      ],
      metrics: [
        { label: "API Endpoints", value: "40+" },
        { label: "Payment Confirmation", value: "<1s" },
        { label: "Concurrent Users", value: "1000+" },
        { label: "Uptime Tracking", value: "99%" }
      ]
    }
  },
  {
    id: "roselle-angular",
    name: "Roselle_Angular_Project",
    tagline: "E-Commerce Shopping Platform",
    desc: "Full-featured e-commerce application with product catalog, cart management, and order processing. Angular enterprise app with 21 routes, TypeScript strict mode, RxJS observables, route guards, Bootstrap 5 UI. Complete flow: authentication (Login/Signup/OTP), products, cart, checkout, admin dashboard, Vitest testing.",
    tech: ["Angular", "TypeScript", "RxJS", "Bootstrap 5", "Vitest"],
    github: "https://github.com/ZODIAC3al/Angular-Ecommerce",
    live: "https://roselle-angular-project.vercel.app/",
    color: "#DD0031",
    featured: true,
    category: "Web App",
  },
  {
    id: "sockit-league",
    name: "SockitLeague",
    tagline: "Sports League Management Mobile App",
    desc: "Cross-platform mobile app for sports league management, team creation, and tournament organization. Expo 51 React Native app (iOS/Android/Web, <50MB) with file-based routing, Supabase real-time sync, NativeWind styling, Expo Camera. Multi-provider OAuth, WebSocket sync, offline persistence, video capture, live team updates.",
    tech: ["React Native", "Expo", "Supabase", "TypeScript", "NativeWind"],
    github: "https://github.com/ZODIAC3al/SockitLeague",
    color: "#4CAF50",
    featured: true,
    category: "Mobile",
  },
  {
    id: "lumina",
    name: "Lumina",
    tagline: "3D Gallery & Creative Studio Dashboard",
    desc: "Cloud-based creative platform for creating, managing, and sharing 3D projects/galleries with real-time collaboration. React 19 + Firebase dashboard (Vite, Tailwind CSS v4, Framer Motion) with Firestore real-time queries, Context API state, responsive UI. Dashboard with Recharts analytics, project CRUD, optimistic updates, dark/light theme, 500-object storage tracking, 95+ Lighthouse score.",
    tech: ["React 19", "Firebase", "Three.js", "Tailwind CSS", "Framer Motion", "Recharts"],
    github: "https://github.com/ZODIAC3al",
    live: "https://lumina11.web.app/",
    color: "#F5A623",
    featured: true,
    category: "Web App",
  },
  {
    id: "thara",
    name: "Thara",
    tagline: "Modern E-Commerce PWA",
    desc: "High-performance shopping PWA with real-time inventory, push notifications, and offline support. Built with React + Vite + Firebase.",
    tech: ["React", "Vite", "Firebase", "Tailwind", "PWA"],
    github: "https://github.com/ZODIAC3al/Thara",
    live: "https://thara-alpha.vercel.app/",
    color: "#ffc800",
    featured: false,
    category: "Web App",
  },
  {
    id: "chicora",
    name: "Chicora",
    tagline: "Dry Clean Service App",
    desc: "Modular React PWA for a dry cleaning service with clean component architecture using Vite and Tailwind.",
    tech: ["React", "Vite", "Tailwind", "PWA"],
    github: "https://github.com/ZODIAC3al/Chicora",
    live: "https://chicora.netlify.app/",
    color: "#ffffff",
    featured: false,
    category: "Web App",
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
    featured: false,
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
