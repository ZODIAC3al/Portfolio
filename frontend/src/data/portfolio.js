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
    id: "meto-platform",
    name: "Meto-Platform",
    tagline: "Full-Stack E-Commerce (MERN)",
    desc: "Restaurant ordering & delivery platform for Meto burger chain in Alexandria, Egypt. Built with Express.js + MongoDB backend (40+ endpoints, JWT auth, bcryptjs hashing, OTP) and React 18 frontend (Vite, i18n Arabic/English, Stripe payments, Recharts analytics). Deployed to Netlify + Vercel with 99% uptime, <1s payment confirmation, 1000+ concurrent users.",
    tech: ["React 18", "Vite", "Express.js", "MongoDB", "Node.js", "Stripe", "Cloudinary", "i18next"],
    github: "https://github.com/ZODIAC3al/Meto-Platform",
    live: "https://meto-platform-c8ez.vercel.app",
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
        "Cross-origin cookies handling (sameSite: 'none' for Netlify ↔ Vercel)"
      ],
      security: [
        "Helmet.js for HTTP security headers",
        "CORS with whitelist validation (Netlify, Vercel, localhost)",
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
        "Frontend: Netlify (automatic CI/CD)",
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
    desc: "Full-featured e-commerce application with product catalog, cart management, and order processing. Angular 21 enterprise app with 21 routes, TypeScript strict mode, RxJS observables, route guards, Bootstrap 5 UI. Complete flow: authentication (Login/Signup/OTP), products, cart, checkout, admin dashboard, Vitest testing.",
    tech: ["Angular", "TypeScript", "RxJS", "Bootstrap 5", "Vitest"],
    github: "https://github.com/ZODIAC3al/Angular-Ecommerce",
    live: "https://rosselee.netlify.app/",
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
