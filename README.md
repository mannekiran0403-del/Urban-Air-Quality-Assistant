# 🍃 Respiro 🛡️

### GenAI-Powered Urban Air Quality Assistant & Community Smog Defense Platform

[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Express](https://img.shields.io/badge/Express-5.0.1-000000?logo=express&logoColor=white)](https://expressjs.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0.9-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Google Gemini](https://img.shields.io/badge/Gemini-3.1_Flash_Lite-8E75C2?logo=google&logoColor=white)](https://ai.google.dev/)
[![Tests](https://img.shields.io/badge/Tests-61%2F61_Passing_(100%25)-238636?logo=vitest&logoColor=white)](https://vitest.dev/)
[![Accessibility](https://img.shields.io/badge/Accessibility-WCAG_2.2_AA-0969DA)](https://www.w3.org/WAI/standards-guidelines/wcag/)
[![Theme](https://img.shields.io/badge/Theme-Light_%26_Dark_Modes-f59e0b)](#-light--dark-theme-system)

---

## 📌 Executive Summary

**Respiro** is an intelligent, full-stack atmospheric resilience platform engineered to protect vulnerable families, daily commuters, and urban communities navigating severe winter smog crises and meteorological thermal inversions.

Unlike conventional air quality apps that display a single, static city-wide average AQI, **Respiro** delivers:
- **Hyperlocal Telemetry:** Micro-sector atmospheric measurements (PM2.5, PM10, NO2, CO, O3) powered by Open-Meteo, Copernicus CAMS, and calibrated sensor grids.
- **Dijkstra Lowest-Exposure Commute Routing:** Turn-by-turn pathfinding calculating cumulative physiological inhaled particulate dose ($\mu\text{g}$) across transit modes (shielded metro vs. EV vs. walking).
- **GenAI Exposure Window Optimization:** Server-side Google Gemini 3.1 Flash Lite inference predicting safe outdoor ventilation windows and solar boundary layer expansions.
- **Room CADR & DIY Purification Engineering:** ASHRAE 62.2 / EPA calibrated Clean Air Delivery Rate calculators and peer-reviewed Corsi-Rosenthal box blueprints ($65 vs $380 retail).
- **Collective Smog Defense Desk:** Neighborhood emission reduction pledges (kg PM2.5 prevented), anti-open-burning patrol logs, and vulnerable resident welfare check-ins.
- **Multilingual Emergency Guidance:** Automatic RTL layout switching and life-safety advisories across 6 languages (Arabic, Urdu, Hindi, Spanish, French, English).
- **Modern Solid UI & Light/Dark Engine:** Clean Linear/GitHub-inspired design tokens with zero bloated gradients, edge-to-edge widescreen responsiveness, and one-click light/dark theme switching.

---

## 🏛️ System Architecture

```text
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT LAYER (React 19 + Vite)                          │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                        AppShell (Responsive Edge-to-Edge)                      │   │
│   │   • Light & Dark Theme System (Persistent LocalStorage + OS Auto-Detection)    │   │
│   │   • AppContext (ActiveTab, SectorData, UserProfile, Language, Theme)           │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│                    │                                               │                   │
│                    ▼                                               ▼                   │
│   ┌───────────────────────────────────┐           ┌────────────────────────────────┐   │
│   │        Domain Feature Hooks       │           │      Pure Compute Engine       │   │
│   │   • useAirAnalytics               │ ────────► │     (src/lib/airCompute)       │   │
│   │   • useExposureRouting            │           │   • Dijkstra Pathfinding       │   │
│   └───────────────────────────────────┘           │   • EPA Breakpoint Formulas    │   │
│                    │                              │   • Room CADR & Air Turnaround │   │
│                    ▼                              │   • Inhaled Microgram Doses    │   │
│   ┌───────────────────────────────────┐           └────────────────────────────────┘   │
│   │        Presentation Layer         │                            ▲                   │
│   │   • Native SVG AQI Heatmap Canvas │ ───────────────────────────┘                   │
│   │   • Native SVG 24h Sparklines     │                                                │
│   │   • WCAG AA Paired .sr-only Twins │                                                │
│   │   • Solid Status Diagnostic Pills │                                                │
│   └───────────────────────────────────┘                                                │
└────────────────────────────────────────────────────────────────────────────────────────┘
                               │
                      (REST / Proxy Gateway)
                               │
                               ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                              BACKEND GATEWAY (Node.js + Express 5)                     │
│                                                                                        │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                           Defensive Security Perimeter                         │   │
│   │   • Helmet Strict Content Security Policy (CSP)                                │   │
│   │   • Dynamic Origin CORS Allowlist                                              │   │
│   │   • 15 KB Strict Body Parser Cap (DoS Defense)                                 │   │
│   │   • Rate Limiting (30 requests/minute per client IP)                           │   │
│   │   • Control Character Stripping [\x00-\x1f] (Prompt Injection Defense)         │   │
│   │   • CWE-209 Generic Error Masking (No stack trace leakage)                     │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                                 │
│                                      ▼                                                 │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                    In-Memory SHA-256 LRU Cache & TTL Manager                   │   │
│   │   • 100-entry capacity with 15-minute telemetry TTL                            │   │
│   │   • Sub-5ms repeat inference response latency                                  │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
│                                      │ (Cache Miss)                                    │
│                                      ▼                                                 │
│   ┌────────────────────────────────────────────────────────────────────────────────┐   │
│   │                     Google Gemini 3.1 Flash Lite LLM Engine                    │   │
│   │   • Zero-Trust Server Execution Only (API keys never touch the client)         │   │
│   │   • Deterministic Fallback Engine when external API is unreachable             │   │
│   └────────────────────────────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 🌟 Core Features & Modules

### 1. Hyperlocal Smog Telemetry Hub
- **5 Critical Pollutants:** Real-time tracking of fine particulates ($PM_{2.5}$, $PM_{10}$), nitrogen dioxide ($NO_2$), carbon monoxide ($CO$), and ground-level ozone ($O_3$).
- **Open-Meteo & Copernicus CAMS Integration:** Live sync capability querying open satellite-calibrated regional sensors.
- **Native SVG Urban Heatmap:** Visualizes atmospheric inversion risk, thermal boundaries, and dispersion plumes with zero external charting bloat.
- **Twin Representation Rule:** Every visual graphic is paired with an invisible `.sr-only` description list ensuring 100% screen reader accessibility (WCAG 2.2 AA).

### 2. GenAI Routine & Exposure Window Optimizer
- **Server-Side Gemini 3.1 Flash Lite:** Generates tailored hour-by-hour schedules based on household vulnerability (toddlers, asthmatics, seniors).
- **Thermal Inversion Forecasting:** Predicts morning boundary layer descents (trapping vehicle emissions below 150m) and midday solar convection windows (safe for outdoor exercise).
- **Quantitative Physiological Impact:** Explains *why* specific times are chosen (e.g., "Shifting morning school run from 07:30 to 09:00 reduces deep lung particulate deposition by 64%").

### 3. Lowest-Exposure Transit Navigator
- **Dijkstra Inhaled Dose Graph:** Evaluates urban transit edges dynamically:
  $$\text{Edge Weight} = \text{Distance (km)} \times \text{Corridor AQI} \times \text{Transit Cabin Exposure Factor}$$
- **Multi-Modal Dose Comparison:** Quantitatively compares underground metro, electric vehicles, public buses, cycling, and walking.
- **Turn-by-Turn Corridor Breakdown:** Displays segment distance, corridor AQI, and cumulative inhaled micrograms ($\mu\text{g}$).

### 4. Indoor Air Quality (IAQ) & DIY Purification Center
- **Room CADR & Air Turnaround Engine:** Calculates required Clean Air Delivery Rate in CFM based on room dimensions ($L \times W \times H$) and target Air Changes per Hour (ACH) calibrated to ASHRAE 62.2 / EPA standards:
  $$\text{Target CADR (CFM)} = \frac{\text{Room Volume } (\text{cu ft}) \times \text{Desired ACH}}{60}$$
- **90% Particle Clearance Turnaround:**
  $$t_{90} = \frac{\ln(10)}{\text{Delivered ACH}} \times 60 \text{ minutes}$$
- **Peer-Reviewed DIY Purifier Blueprints:**
  - *Corsi-Rosenthal Box (4-Filter Cube):* 450+ CFM CADR at $65 build cost (vs. $380 commercial retail).
  - *Budget 1-Filter Box Fan:* 72% $PM_{2.5}$ reduction for bedrooms at $28.
  - *Solar Window Flushing:* Timed 15-minute cross-ventilation during peak boundary layer convection.
  - *Mucociliary Humidity Barrier:* 40–50% RH maintenance to keep airway epithelial cilia active.
  - *Honest Botanical Guidance:* Clarifies that houseplants absorb gaseous VOCs but do **not** capture fine $PM_{2.5}$, making mechanical filtration mandatory.

### 5. Community Action & Collective Smog Defense
- **Neighborhood Emission Pledges:** Organizes carpool rings, open-burning vigilance, and central boiler tune-ups. Tracks total avoided particulate load ($\text{kg } PM_{2.5}$).
- **Anti-Burn Patrol & Smoke Incident Desk:** Real-time civic field logger for illegal leaf burning, industrial flaring, and heavy diesel idling.
- **Vulnerable Resident Aid Directory:** Coordinates neighborhood checks and filter distribution for asthmatic children, elderly residents living alone, and infant nurseries.

### 6. Multilingual Emergency Translation
- Real-time life-safety advisories in **English, Hindi, Arabic, Spanish, French, and Urdu**.
- Automatic Right-to-Left (`dir="rtl"`) bidirectional layout switching with Noto Sans Arabic typography.
- Bulleted Emergency DOs, DON'Ts, and asthmatic rescue protocols.

### 7. Light & Dark Theme System
- Integrated one-click theme switcher in the application header (`☀️ Light` / `🌙 Dark`).
- Seamless color inversion powered by high-contrast CSS design tokens (solid dark `#0d1117` base / crisp light `#f6f8fa` base).
- Stored in browser `localStorage` and automatically syncs with system OS preferences (`prefers-color-scheme`).

---

## 🧰 Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 19.0.0 | Concurrent rendering, declarative UI state |
| **Language** | TypeScript | 5.7.3 | Strict zero-`any` static typing, discriminated unions |
| **Styling** | Tailwind CSS | 4.0.9 | High-density enterprise theme tokens |
| **Build Tool** | Vite | 6.2.0 | Instant HMR, Rollup production chunking |
| **Backend** | Express 5 | 5.0.1 | Hardened REST API gateway, reverse-proxy trust |
| **GenAI** | Google Gemini | 3.1 Flash Lite | Server-side routine reasoning & translation |
| **Testing** | Vitest + JSDOM | 3.0.7 / 26.0.0 | Multi-suite unit, routing, rendering & DOM automation |
| **Linter** | Oxlint | 0.15.11 | Ultra-fast zero-warning code verification |
| **Security** | Helmet, CORS, RateLimit | Latest | CSP directives, origin protection, payload caps |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v20.x or v22.x
- **npm** v10.x or higher

### 1. Clone & Install

```powershell
# Clone the repository
git clone https://github.com/[your-repo]/AirGuard-AI.git
cd AirGuard-AI

# Install dependencies
npm install
```

### 2. Configure Environment

Copy the example environment file and add your Google Gemini API key:

```powershell
copy .env.example .env
```

Edit `.env`:
```env
PORT=3001
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-3.1-flash-lite
```
*(Note: If no Gemini API key is provided, Respiro seamlessly operates using its deterministic scientific baseline fallback engine).*

### 3. Start Development Servers

Run each in a separate terminal:

**Terminal 1 — Backend API Gateway (Port 3001):**
```powershell
npm run server:dev
```

**Terminal 2 — Frontend Dev Server (Port 5173):**
```powershell
npm run dev
```

Open **`http://localhost:5173`** in your browser.

---

### 4. Unified Production Mode

To build and serve the application as a single optimized production bundle on port 3001:

```powershell
npm run build
npm start
```

Open **`http://localhost:3001`** in your browser.

---

## 🧪 Automated Testing & Verification

Respiro includes a 5-tier test suite covering pure algorithms, Dijkstra graph traversal, accessibility twins, and user event simulation.

```powershell
# Run the complete test suite (61 tests across 5 files)
npx vitest run

# Run code linter (0 errors, 0 warnings)
npm run lint

# Run TypeScript build check
npx tsc -b
```

### Verified Test Suite Breakdown:

| Test Suite | File | Tests | Coverage Scope |
| :--- | :--- | :---: | :--- |
| **Tier 1: Algorithmic Math** | `src/test/air.test.ts` | **26** | EPA piecewise interpolation, CADR room physics, dose calculations |
| **Tier 2: Dijkstra Routing** | `src/test/routing.test.ts` | **10** | Graph topology, exposure edge weights, lowest-inhalation selection |
| **Tier 3: Layout & A11y** | `src/test/rendering.test.tsx` | **11** | Semantic landmarks, `.sr-only` twins, WCAG AA compliance |
| **Tier 4: DOM Interactions** | `src/test/dom.test.tsx` | **8** | Profile form inputs, CADR sliders, DIY detail switches, pledge forms |
| **Tier 5: API Gateway** | `src/test/api.test.ts` | **6** | Helmet headers, rate limiting, 15KB cap, SPA wildcard routing |
| **Total** | | **61** | **100% Pass Rate** |

---

## 🛡️ Security & Defensive Engineering Standards

- **Server-Side AI Custody:** Client browsers never communicate directly with the Gemini API; API keys remain strictly server-side.
- **Strict Content Security Policy (CSP):** Helmet blocks inline eval and unauthorized external script injection.
- **Dynamic CORS Allowlist:** Restricts incoming requests to authorized production origins and local development hosts.
- **15 KB Payload Cap:** Hard limit on JSON body parsing preventing memory exhaustion and denial-of-service attempts.
- **Input Sanitization:** Strips control characters `[\x00-\x1f]` and bounds-checks all numeric values before model inference.
- **CWE-209 Safe Error Handling:** Server errors return sanitized messages with zero internal stack traces or environment leakage.

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and adapt it for urban smog resilience and community health initiatives.
