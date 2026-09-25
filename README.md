# Trip Planner — Smart Travel Planning

[![React](https://img.shields.io/badge/React-19.0.1-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8.x-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Assignment](https://img.shields.io/badge/Assignment-1--Task_2-4F46E5)](#academic-information)
[![Deploy on Vercel](https://img.shields.io/badge/Deploy-Vercel-black?logo=vercel&logoColor=white)](#deploying-to-vercel)
[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

A focused, professional web application engineered for structured travel planning and itinerary synthesis. Built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and **Motion**, this application takes five core trip parameters and dynamically generates an organized, day-by-day travel plan.

**Source Repository**: [https://github.com/azharhussaincs/Trip-Planner](https://github.com/azharhussaincs/Trip-Planner)

---

## Academic Information

* **Assignment**: Assignment 1 — Task 2
* **Subject**: Agentic AI
* **Instructor**: Ms. Afia
* **Institution**: Riphah International University, G-7 Campus, Islamabad

### Developer Group

| Name | Program & ID | Engineering Role | Key Responsibilities |
| :--- | :--- | :--- | :--- |
| **Azhar Hussain** | MSAI (72908) | **AI Systems & Architecture** | Multi-agent reasoning pipelines, prompt orchestration, and domain models |
| **Haris Javeed** | MSAI (75722) | **Platform Engineering & State** | Distributed application state, caching, client architecture, and form flow |
| **Usman Kayani** | PhD (6678) | **Research & Advanced Analytics** | Itinerary optimization graphs, spatial heuristics, and trip sequencing |

---

## Core Features

1. **Developer Introduction Screen**
   * High-end engineering presentation showcasing team credentials and course metadata.
   * Direct actions to launch the planner or view source code on GitHub.
2. **Trip Details Collection (5 Core Parameters)**
   * **Number of Days**: Positive numeric stepper with direct input and validation ($\ge 1$).
   * **Origin**: Departure city with inline presence checking.
   * **Destination**: Visually emphasized key destination, validated to differ from origin.
   * **Accommodation**: 5 clean categories (*Hotel*, *Apartment*, *Hostel*, *Guest House*, *Other*).
   * **Number of Travellers**: Party capacity counter ($\ge 1$).
3. **Subtle Flow Progress Indication**
   * Two-step navigational breadcrumb: `Trip Details` $\rightarrow$ `Your Trip Plan`.
4. **Adaptive Itinerary Synthesis**
   * Dynamically generates the exact number of days entered ($1, 2, 3, 5, 7, \dots$).
   * Structured daily cards with themes, activity schedules, and duration progress.
5. **Prominent Compact Trip Summary**
   * Strongest visual emphasis placed on the Destination.
   * Compact tokens for Duration, Travellers, and Accommodation.
6. **State Preservation & Reset**
   * **Edit Trip**: Re-populates the form with previous entries for quick editing.
   * **Plan Another Trip**: Resets the form cleanly to initial defaults without page reloads.
7. **Accessibility & Responsive Layout**
   * Tested on mobile (360px+), tablet, and desktop viewports.
   * Full keyboard navigation with visible focus rings (`focus-visible:ring-2`).

---

## Technology Stack

* **Framework**: React 19 (SPA)
* **Language**: TypeScript (Strict typing, bundler module resolution)
* **Build Tool**: Vite 8
* **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
* **Icons**: Lucide React
* **Motion & Animation**: `motion/react`
* **Typography**: Plus Jakarta Sans (UI) & JetBrains Mono (Metrics & Code)

---

## Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

* **Node.js**: v18.0.0 or higher (v20+ recommended)
* **npm**: v9.0.0 or higher (comes bundled with Node.js)
* **Git**: latest version

Verify installations:
```bash
node -v
npm -v
git --version
```

---

### Step-by-Step Installation

#### 1. Clone the Repository

Clone the project from GitHub using HTTPS or SSH:

```bash
git clone https://github.com/azharhussaincs/Trip-Planner.git
```

Navigate into the project directory:

```bash
cd Trip-Planner
```

#### 2. Install Dependencies

Install all required production and development dependencies:

```bash
npm install
```

#### 3. Environment Setup (Optional)

If environment variables are needed in your deployment:

```bash
cp .env.example .env
```

*(Note: The core application runs standalone and does not require third-party API keys to plan trips).*

#### 4. Run the Development Server

Start the local Vite development server:

```bash
npm run dev
```

The application will be available at:
```
http://localhost:3000
```
Open your browser and navigate to `http://localhost:3000` to interact with the application.

---

### Building for Production

To create an optimized, minified production build:

```bash
npm run build
```

The compiled assets will be output to the `dist/` directory.

To preview the production build locally:

```bash
npm run preview
```

---

### Code Quality & Validation

Run TypeScript validation across the codebase:

```bash
npm run lint
```

This runs `tsc --noEmit` to ensure type safety and identify any compilation warnings.

---

## Deploying to Vercel (Zero-Error Deployment Guide)

### Why Do Vercel Install Errors Happen?
When deploying modern React 19 and Vite projects to Vercel, `npm install` can fail with:
```text
npm error code ERESOLVE
npm error ERESOLVE could not resolve dependency tree
npm error Conflicting peer dependency: esbuild...
```
This happens because npm's strict peer-dependency algorithm halts whenever modern bleeding-edge packages (e.g., React 19, Tailwind v4, Vite) have overlapping optional peer ranges for sub-dependencies like `esbuild`.

### How This Project Fixes It:
This repository includes all three pre-configured deployment fixes:
1. **`.npmrc` (`legacy-peer-deps=true`)**: Tells Vercel's npm builder to automatically resolve peer dependencies without aborting.
2. **`vercel.json`**: Explicitly configures Vite as the SPA framework, routes build output to `dist/`, and directs all client routes to `/index.html`.
3. **`package-lock.json`**: An exact snapshot of 199 verified packages with 0 vulnerabilities, guaranteeing deterministic installations.

### Step-by-Step Deployment on Vercel:

1. Push your latest code to your GitHub repository:
   ```bash
   git add .
   git commit -m "fix: add vercel.json, .npmrc, and package-lock.json for seamless vercel deployment"
   git push origin main
   ```
2. Log into **[Vercel Dashboard](https://vercel.com/)** and click **"Add New..."** → **"Project"**.
3. Select your repository: **`Trip-Planner`** and click **"Import"**.
4. Configure Project Settings:
   * **Framework Preset**: `Vite` (automatically detected)
   * **Root Directory**: `./`
   * **Build Command**: `npm run build`
   * **Output Directory**: `dist`
   * **Install Command**: `npm install` (or leave default — `.npmrc` handles peer resolution automatically)
5. Click **"Deploy"**.
6. Deployment will complete cleanly in ~30 seconds with a live `https://trip-planner-xxx.vercel.app` URL!

---

## Project Structure

```text
Trip-Planner/
├── .env.example              # Environment variables template
├── .gitignore                # Git ignore configuration
├── .npmrc                    # npm peer-dependency resolution for Vercel & CI
├── vercel.json               # Vercel deployment framework & routing config
├── package-lock.json         # Exact dependency lockfile
├── index.html                # HTML entry point with web font links
├── metadata.json             # AI Studio applet metadata
├── package.json              # Project dependencies and npm scripts
├── tsconfig.json             # TypeScript configuration
├── vite.config.ts            # Vite configuration with Tailwind CSS plugin
├── README.md                 # Project documentation
└── src/
    ├── main.tsx              # React DOM mounting entry point
    ├── App.tsx               # Primary view router (Intro ↔ Planner)
    ├── index.css             # Tailwind CSS tokens & global styles
    ├── services/
    │   └── itineraryService.ts # Pure business logic for itinerary synthesis
    └── components/
        ├── IntroScreen.tsx   # Developer group & course presentation
        ├── TripPlanner.tsx   # Central 5-parameter trip details form
        ├── TripResult.tsx    # Generated trip summary & itinerary view
        ├── DayPlan.tsx       # Reusable daily schedule card component
        ├── TripProgressIndicator.tsx # 2-step progress breadcrumb
        ├── SourceCodeButton.tsx      # Reusable GitHub source code link
        └── ui/
            ├── Button.tsx    # Accessible, multi-variant button
            ├── Card.tsx      # Hairline border elevation cards
            ├── Counter.tsx   # Numeric stepper with direct keyboard input
            ├── Input.tsx     # Form text inputs with validation states
            └── Select.tsx    # Custom select dropdown primitive
```

---

## User Flow

```text
[ Developer Group Introduction ]
              │
              ▼ (Click "Start Trip Planner" / "Plan My Trip")
    [ Trip Details Form ]
   (Days, Origin, Destination, Accommodation, Travellers)
              │
              ▼ (Click "Create Trip Plan")
   [ Loading State: ~650ms ]
              │
              ▼
   [ Generated Trip Plan ]
   - Prominent Destination Summary Banner
   - Preserved Original Parameters
   - Day-by-Day Structured Itinerary
              │
      ┌───────┴───────┐
      ▼               ▼
[ Edit Trip ]   [ Plan Another Trip ]
(Preserves data)  (Clears to defaults)
```

---

## Contributing

1. Fork the repository (`https://github.com/azharhussaincs/Trip-Planner/fork`).
2. Create a feature branch (`git checkout -b feature/improvement`).
3. Commit your changes (`git commit -m 'feat: add enhanced feature'`).
4. Push to the branch (`git push origin feature/improvement`).
5. Open a Pull Request.

---

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.

Developed with platform engineering standards for **Assignment 1 — Task 2 (Agentic AI)** at **Riphah International University, Islamabad**.
