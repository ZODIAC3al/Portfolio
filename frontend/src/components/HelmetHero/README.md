# HelmetHero Next.js Component

A self-contained, responsive, 3D interactive Hero component for Next.js featuring:
- **Interactive 3D Helmet** built with Three.js (opens on hover/focus/tap to reveal portrait)
- **Mouse tracking & Parallax** with smooth frame-rate independent physics
- **Animated SVG Background** with organic blob animations and canvas telemetry
- **Full Calibration Panel** (press `C` to toggle live tuning)
- **Zero Asset Dependency** (GLB model and portrait image embedded cleanly as base64 in assets)
- **SSR Safe** with Next.js `"use client"` directive and clean unmount resource disposal.

---

## 🚀 How to Embed into Your Next.js App

### Step 1: Install `three`

In your Next.js project directory, run:

```bash
npm install three
# If using TypeScript:
npm install -D @types/three
```

---

### Step 2: Copy Component Files

Copy the `components/HelmetHero` folder into your Next.js project's `components` directory:

```
your-nextjs-app/
  ├── components/
  │   └── HelmetHero/
  │       ├── assets/
  │       │   └── helmetData.ts
  │       ├── HelmetHero.tsx (or HelmetHero.jsx)
  │       ├── HelmetHero.css
  │       └── index.ts
```

---

### Step 3: Embed in Your Next.js Page

#### **Next.js App Router (`app/page.tsx`)**
```tsx
import HelmetHero from '@/components/HelmetHero';

export default function Page() {
  return (
    <main>
      <HelmetHero
        title="Ali Maher"
        subtitle="Portfolio — Est. 2026"
        onMenuClick={() => console.log('Menu opened')}
      />
    </main>
  );
}
```

#### **Next.js Pages Router (`pages/index.tsx`)**
```tsx
import HelmetHero from '../components/HelmetHero';

export default function HomePage() {
  return (
    <main>
      <HelmetHero
        title="Ali Maher"
        subtitle="Portfolio — Est. 2026"
      />
    </main>
  );
}
```

---

## 🎨 Component Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `title` | `string` | `"Ali Maher"` | Main title wordmark |
| `subtitle` | `string` | `"Portfolio — Est. 2026"` | Subtitle shown below title |
| `portraitImageSrc` | `string` (optional) | *Embedded base64 portrait* | Custom portrait image URL |
| `onMenuClick` | `() => void` (optional) | `undefined` | Callback for top-right menu button |

---

## ⚙️ Features & Calibration

- **Interactive Visor**: Hover, focus, or tap the stage on mobile/desktop to split the helmet open and reveal the portrait beneath.
- **Mouse Parallax**: Smooth cursor/pointer following across desktop & mobile.
- **Live Calibration**: Press key `C` anytime in the browser to adjust framing, FOV, rotation yaw, or split height. Values automatically persist to `localStorage`.
