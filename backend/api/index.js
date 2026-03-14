require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
const nodemailer = require("nodemailer");
const validator = require("validator");

const app = express();
const IS_DEV = process.env.NODE_ENV !== "production";

// ─── Security Middleware ─────────────────────────────────────────────────────
app.use(helmet());

// Read ALLOWED_ORIGINS from .env (comma-separated), merge with defaults
const envOrigins = process.env.ALLOWED_ORIGINS
  ? process.env.ALLOWED_ORIGINS.split(",")
      .map((o) => o.trim())
      .filter(Boolean)
  : [];

const ALLOWED_ORIGINS = [
  "https://alimaher.dev",
  "https://ali-maher-portfolio.vercel.app",
  ...envOrigins,
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);
      if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(origin))
        return callback(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return callback(null, true);
      console.warn(`[CORS] Blocked: ${origin}`);
      return callback(new Error(`Origin ${origin} not allowed`));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
  }),
);
app.options("*", cors());
app.use(express.json({ limit: "10kb" }));

// ─── Rate Limiter ────────────────────────────────────────────────────────────
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many messages. Try again in 15 minutes.",
  },
});

// ─── Gmail helpers ────────────────────────────────────────────────────────────
const hasGmail = () =>
  Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

const createTransport = () => {
  // Normalize app password: remove all spaces so both
  // "ypmn eqjq inhc qnnt" and "ypmneqjqinhcqnnt" work
  const pass = (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "");
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass,
    },
  });
};

// ─── Health Check ────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    gmail: hasGmail()
      ? `configured (${process.env.GMAIL_USER})`
      : "NOT configured",
    env: IS_DEV ? "development" : "production",
  });
});

// ─── Contact Endpoint ────────────────────────────────────────────────────────
app.post("/api/contact", contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message, budget, projectType } = req.body;

    // Validation
    const errors = [];
    if (!name || name.trim().length < 2 || name.trim().length > 100)
      errors.push("Name must be between 2 and 100 characters.");
    if (!email || !validator.isEmail(email))
      errors.push("A valid email address is required.");
    if (!subject || subject.trim().length < 3 || subject.trim().length > 150)
      errors.push("Subject must be between 3 and 150 characters.");
    if (!message || message.trim().length < 10 || message.trim().length > 2000)
      errors.push("Message must be between 10 and 2000 characters.");

    if (errors.length > 0) {
      console.log("[Validation] Failed:", errors);
      console.log("[Validation] Body received:", {
        name,
        email,
        subject,
        message: message?.slice(0, 50),
        budget,
        projectType,
      });
      return res.status(400).json({ success: false, errors });
    }

    // Sanitize
    const safeName = validator.escape(name.trim());
    const safeSubject = validator.escape(subject.trim());
    const safeMessage = validator.escape(message.trim());
    const safeEmail = email.trim().toLowerCase();
    const safeBudget = budget
      ? validator.escape(String(budget))
      : "Not specified";
    const safeProjectType = projectType
      ? validator.escape(String(projectType))
      : "Not specified";

    // ── Dev mode: Gmail not configured → log to console and return success ────
    if (!hasGmail()) {
      console.log("\n─────────────────────────────────────────────────");
      console.log("📬 [DEV MODE] Contact form submission (no Gmail):");
      console.log(`   Name:         ${safeName}`);
      console.log(`   Email:        ${safeEmail}`);
      console.log(`   Subject:      ${safeSubject}`);
      console.log(`   Project Type: ${safeProjectType}`);
      console.log(`   Budget:       ${safeBudget}`);
      console.log(`   Message:      ${safeMessage}`);
      console.log("─────────────────────────────────────────────────");
      console.log("⚠️  To send real emails, add to backend/.env:");
      console.log("   GMAIL_USER=your.email@gmail.com");
      console.log("   GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx");
      console.log(
        "   (Generate at: https://myaccount.google.com/apppasswords)\n",
      );

      return res.status(200).json({
        success: true,
        message:
          "Message received! (Dev mode: logged to console — configure Gmail to send real emails)",
      });
    }

    // ── Email HTML for Ali ────────────────────────────────────────────────────
    const toAliHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<style>
  body{font-family:'Segoe UI',sans-serif;background:#0a0a0f;color:#e0e0e0;margin:0;padding:0}
  .w{max-width:600px;margin:40px auto;background:#111118;border-radius:16px;overflow:hidden;border:1px solid #1e1e2e}
  .h{background:linear-gradient(135deg,#00c2ff,#7b2ff7);padding:36px 40px}
  .h h1{margin:0;font-size:24px;color:#fff}
  .h p{margin:8px 0 0;color:rgba(255,255,255,.75);font-size:14px}
  .b{padding:40px}
  .f{margin-bottom:24px}
  .l{font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#00c2ff;font-weight:700;margin-bottom:6px}
  .v{font-size:15px;color:#f0f0f0;background:#1a1a26;border-radius:8px;padding:14px 18px;border-left:3px solid #7b2ff7;white-space:pre-wrap}
  .ft{padding:24px 40px;border-top:1px solid #1e1e2e;text-align:center;color:#555;font-size:12px}
</style></head><body>
<div class="w">
  <div class="h"><h1>📬 New Portfolio Message</h1><p>${new Date().toLocaleString("en-US", { dateStyle: "long", timeStyle: "short" })}</p></div>
  <div class="b">
    <div class="f"><div class="l">From</div><div class="v">${safeName}</div></div>
    <div class="f"><div class="l">Email</div><div class="v"><a href="mailto:${safeEmail}" style="color:#00c2ff;text-decoration:none">${safeEmail}</a></div></div>
    <div class="f"><div class="l">Subject</div><div class="v">${safeSubject}</div></div>
    <div class="f"><div class="l">Project Type</div><div class="v">${safeProjectType}</div></div>
    <div class="f"><div class="l">Budget</div><div class="v">${safeBudget}</div></div>
    <div class="f"><div class="l">Message</div><div class="v">${safeMessage}</div></div>
  </div>
  <div class="ft"><p>Reply to <strong>${safeEmail}</strong></p></div>
</div></body></html>`;

    // ── Auto-reply for sender ─────────────────────────────────────────────────
    const toSenderHtml = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/>
<style>
  body{font-family:'Segoe UI',sans-serif;background:#0a0a0f;color:#e0e0e0;margin:0;padding:0}
  .w{max-width:600px;margin:40px auto;background:#111118;border-radius:16px;overflow:hidden;border:1px solid #1e1e2e}
  .h{background:linear-gradient(135deg,#7b2ff7,#00c2ff);padding:40px;text-align:center}
  .h h1{margin:0;font-size:28px;color:#fff}
  .h p{margin:12px 0 0;color:rgba(255,255,255,.8)}
  .b{padding:40px;text-align:center}
  .b p{line-height:1.8;color:#c0c0d0;font-size:16px}
  .hi{color:#00c2ff;font-weight:600}
  .ft{padding:24px 40px;border-top:1px solid #1e1e2e;text-align:center;color:#555;font-size:12px}
  a{color:#00c2ff;text-decoration:none;margin:0 12px}
</style></head><body>
<div class="w">
  <div class="h"><h1>Message Received ✓</h1><p>Thanks, ${safeName}!</p></div>
  <div class="b">
    <p>Got your message about <span class="hi">"${safeSubject}"</span>.<br/>I'll reply within <strong>24–48 hours</strong>.</p>
    <p style="margin-top:20px"><a href="https://github.com/ZODIAC3al">GitHub</a><a href="https://linkedin.com/in/ali-maher">LinkedIn</a></p>
  </div>
  <div class="ft"><p>Ali Maher · Open-Source Software Engineer · Alexandria, Egypt</p></div>
</div></body></html>`;

    // ── Send ──────────────────────────────────────────────────────────────────
    const transporter = createTransport();

    // Verify connection/credentials first — throws immediately if wrong password
    await transporter.verify();

    await transporter.sendMail({
      from: `"Portfolio Contact" <${process.env.GMAIL_USER}>`,
      to: process.env.GMAIL_USER,
      replyTo: safeEmail,
      subject: `[Portfolio] ${safeSubject} — from ${safeName}`,
      html: toAliHtml,
    });

    await transporter.sendMail({
      from: `"Ali Maher" <${process.env.GMAIL_USER}>`,
      to: safeEmail,
      subject: `Got your message, ${safeName}! — Ali Maher`,
      html: toSenderHtml,
    });

    return res.status(200).json({
      success: true,
      message: "Message sent! I'll get back to you soon.",
    });
  } catch (err) {
    // Full error in terminal
    console.error("\n❌ Contact form error:");
    console.error("   Code:   ", err.code || "—");
    console.error("   Message:", err.message || "—");
    if (err.response) console.error("   SMTP:  ", err.response);
    console.error("");

    // Specific message for known Gmail errors
    let userMessage = "Something went wrong. Please try again later.";
    if (err.code === "EAUTH")
      userMessage =
        "Gmail auth failed — check GMAIL_USER and GMAIL_APP_PASSWORD in backend/.env";
    else if (err.code === "ECONNREFUSED" || err.code === "ETIMEDOUT")
      userMessage =
        "Could not connect to Gmail SMTP. Check your internet connection.";

    return res.status(500).json({ success: false, message: userMessage });
  }
});

// ─── Resume Download Tracker ─────────────────────────────────────────────────
app.post("/api/track-download", async (req, res) => {
  try {
    const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress;
    const { type } = req.body;
    console.log(`[Download] ${type} — IP: ${ip} — ${new Date().toISOString()}`);

    if (hasGmail() && process.env.NOTIFY_DOWNLOADS === "true") {
      const transporter = createTransport();
      await transporter.sendMail({
        from: `"Portfolio System" <${process.env.GMAIL_USER}>`,
        to: process.env.GMAIL_USER,
        subject: `📥 Resume Downloaded — ${new Date().toLocaleString()}`,
        html: `<p>Someone downloaded your <strong>${type}</strong>.</p><p>IP: ${ip}</p>`,
      });
    }
    return res.json({ success: true });
  } catch (err) {
    console.error("Download tracker error:", err.message);
    return res.json({ success: false });
  }
});

// ─── 404 ─────────────────────────────────────────────────────────────────────
app.use((req, res) =>
  res.status(404).json({ success: false, message: "Route not found" }),
);

// ─── Global Error Handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`\n🚀 Server running → http://localhost:${PORT}`);
  console.log(
    `   Gmail : ${hasGmail() ? `✅  ${process.env.GMAIL_USER}` : "⚠️   Not configured (form logs to console instead)"}`,
  );
  console.log(`   Env   : ${IS_DEV ? "development" : "production"}`);
  console.log(`   Health: http://localhost:${PORT}/api/health\n`);
});

module.exports = app;
