# Build&Go Concept Website

Build&Go is a premium financial intelligence and real-time project expense tracking platform designed specifically for construction, contractor, and home renovation businesses.

This concept site showcases a modern web application experience featuring rich glassmorphism aesthetics, curated palettes, automated receipt processing visualizers, and state-of-the-art responsive grids.

---

## 🌟 Key Features

*   **Financial Health Dashboard**: Real-time stats metric panels (Total Spend, Active Projects, Average Margins) accompanied by dynamic, interactive charts.
*   **Monthly Spend Ticker**: A scrollable vertical bar chart detailing monthly costs with static gridlines and unclipped hover tooltips.
*   **Active Projects Grid**: Dynamic list detailing project budgets, spent totals, margin percentages, and interactive status badges.
*   **Smart Layout Stacking**: Adaptive layout wrapper that places panels side-by-side on wide displays and stacks the AI Alerts/Spend categories underneath the main content on viewports below `1280px` (`xl`).
*   **Responsive Columns**: Context-aware table layouts that automatically hide columns (like Margin and Budget Used) one-by-one under constrained viewport sizes (between `1280px` and `1440px`) and expand back to full width once the layout stacks.
*   **Go AI Receipt Analyzer**: Auto-extraction cards visualizing vendor names, margins, and cost classifications extracted from uploaded receipts.
*   **Universal Search**: A global "Search Anything" query input bar active across all administration panels.
*   **Micro-Animations**: Extensive use of animated vector icons (via `LordIcon`) to provide premium interactive hover feedback.
*   **Unified Auth Flow**: Split-screen login interface featuring an autoscrolling brand values slideshow carousel and Google/GitHub authentication redirection handlers.
*   **Fallback Mobile Blocker**: Fullscreen overlay blocker that restricts displays under `720px` to maintain premium UI presentation integrity.

---

## 🛠️ Technology Stack

*   **Core**: [Next.js](https://nextjs.org/) (React, App Router, TypeScript, Turbopack)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) (using CSS-based configuration variables and range modifiers like `max-[1359px]:xl:hidden`)
*   **Animations & Icons**: [LordIcon](https://lordicon.com/) animated JSON vectors integrated with custom client-side lifecycle observer scripts

---

## 📂 Project Architecture

```
buildandgo_web/
├── app/                  # Next.js App Router Pages
│   ├── ai-insight/       # AI reports, anomaly detection, & suggestions
│   ├── dashboard/        # Main overview, charts, and active lists
│   ├── expenses/         # Detailed bills ledger and upload drawers
│   ├── projects/         # Main projects table and filters
│   ├── reports/          # Financial summaries and export actions
│   ├── login/            # Split-screen Auth portal
│   ├── layout.tsx        # Global page layouts, metadata, and fonts
│   └── globals.css       # Custom utility rules and Tailwind layer theme variables
├── components/           # Reusable Design System Components
│   ├── ui/               # Lower-level layout blocks (grid backgrounds, overlays)
│   ├── modal/            # Details drawer and global search modals
│   ├── button.tsx        # Custom variant buttons with state hover selectors
│   ├── badge.tsx         # Status pill badges
│   ├── dropdown.tsx      # Combobox select menus
│   ├── input-box.tsx     # Customized search inputs
│   └── lord-icon.tsx     # Custom client element wrapper for animated icons
└── public/               # Static assets, branding logo, and favicon
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Launch Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build Production Bundle
```bash
npm run build
```
This runs TypeScript validations, optimizes assets, and generates static build artifacts.
