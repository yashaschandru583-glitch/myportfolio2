# YASHAS C — Full-Stack Developer Portfolio

A modern, responsive, full-stack personal portfolio website engineered for **YASHAS C** — Computer Science Student & Aspiring Software Developer.

![Portfolio Preview](https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80)

---

## 🌟 Key Features

* **Interactive Profile Photo Upload & Manager (`ProfilePhotoUploader.tsx`)**
  * Live image upload from local device (JPG, JPEG, PNG, WEBP)
  * Dynamic preview with circular crop, zoom adjustment & auto-fit
  * Replace photo or reset to sleek default developer avatar
  * Client-side persistent storage (localStorage) with easy cloud hook for Cloudinary / Firebase Storage
  * File size & format validation with user-friendly alerts

* **Sticky Navigation & Mobile Drawer**
  * Smooth section scrolling (Home, About, Skills, Projects, Education, Achievements, GitHub, Contact)
  * Active section highlight and mobile hamburger menu
  * Instant "Download Resume" interactive CV viewer with print/save PDF capability

* **Hero Section**
  * Hi, I'm YASHAS C with animated title & bio
  * Prominent profile photo card with quick change trigger
  * Call-to-action buttons for Projects & Contact
  * Direct clickable phone (`tel:+919147837927`), email, GitHub, LinkedIn, and Instagram

* **About Section & Interactive Stats**
  * Narrative introduction covering academic and engineering background
  * 4 Pillars: Career Interests, Programming Interests, Web Development, Problem-Solving & IoT
  * Animated counter metrics (12+ Projects, 15+ Tech, 6+ Certifications, 3+ Years of Learning)

* **Skills & Competencies**
  * Categorized: Programming Languages (C, C++, Java, JavaScript, Python), Web Development (HTML5, CSS3, React, Node.js, Express), Databases (MySQL, MongoDB, PostgreSQL), and Tools (Git, GitHub, VS Code, Arduino)
  * Visual proficiency bars, level percentages, and category filter pills

* **Projects Portfolio with REST API**
  * Filter by category (IoT / Hardware, Full-Stack, Web Applications)
  * Showcase featuring:
    * *Automatic Street Light Controller* (Arduino, C/C++, LDR Sensor)
    * *Personal Portfolio Website* (React, Vite, Express, MongoDB)
    * *Government Services Locator* (React, JavaScript, Node.js)
    * *Smart IoT Campus Environmental Monitor* (Arduino, ESP32, Node.js)
    * *Algorithm & Pathfinding Visualizer* (React, Canvas, Algorithms)
  * "Add New Project" modal hooked into the Express REST API backend

* **Education Timeline**
  * Vertical animated timeline with degree details, universities, CGPA/distinctions, coursework tags, and milestones

* **Achievements & Certifications**
  * Categorized honors with interactive modal viewer & verification links

* **GitHub & Open Source Integration**
  * Real-time GitHub API repository fetcher with search filtering, star counts, and direct profile links

* **Contact Section & REST API**
  * Contact details: Name: **YASHAS C**, Phone: **+91 9147837927**, Email & social links
  * Fully validated contact form submitting to `POST /api/contact`

---

## 🛠️ Technology Stack

* **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React Icons
* **Backend:** Node.js, Express.js, TypeScript (`tsx` runner), CORS, Body-Parser
* **Database:** MongoDB (with Mongoose/native driver support & zero-config in-memory fallback)
* **Deployment:** GitHub Pages (Frontend CI/CD via GitHub Actions), Render / Railway / Cloud Run (Full-Stack)

---

## 📂 Project Structure

```text
portfolio/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Pages CI/CD workflow
├── server/
│   └── db.ts                   # MongoDB connection client & in-memory fallback store
├── src/
│   ├── components/
│   │   ├── About.tsx           # About me & 4 pillars
│   │   ├── Achievements.tsx    # Certifications & honors
│   │   ├── Contact.tsx         # Contact info & contact form
│   │   ├── Education.tsx       # Vertical education timeline
│   │   ├── Footer.tsx          # Clean footer with quick links
│   │   ├── GitHubSection.tsx   # GitHub public repository fetcher
│   │   ├── Hero.tsx            # Hero section with prominent photo
│   │   ├── Navbar.tsx          # Sticky navigation & mobile drawer
│   │   ├── ProfilePhotoUploader.tsx # Dedicated photo uploader
│   │   ├── Projects.tsx        # Projects showcase & modal
│   │   ├── ResumeModal.tsx     # Printable CV preview modal
│   │   └── Skills.tsx          # Skills grid with level bars
│   ├── context/
│   │   └── ProfilePhotoContext.tsx # Global profile photo state
│   ├── data/
│   │   └── portfolioData.ts    # Centralized portfolio data for Yashas C
│   ├── types/
│   │   └── portfolio.ts        # TypeScript interfaces
│   ├── utils/
│   │   └── photoStorage.ts     # LocalStorage & photo validation helpers
│   ├── App.tsx                 # Main application assembly
│   ├── index.css               # Tailwind CSS stylesheet
│   └── main.tsx                # Client entry point
├── server.ts                   # Express.js backend server entry point
├── .env.example                # Environment variables template
├── metadata.json               # Platform configuration & metadata
├── package.json                # Project dependencies and npm scripts
├── tsconfig.json               # TypeScript configuration
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started

### 1. Prerequisites
* Node.js (v18 or v20+ recommended)
* npm or yarn

### 2. Installation
```bash
# Clone or navigate to the project directory
git clone https://github.com/yashas-c/yashas-c-portfolio.git
cd yashas-c-portfolio

# Install dependencies
npm install
```

### 3. Configure Environment Variables
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
Inside `.env` (optional):
```env
PORT=3000
MONGODB_URI="mongodb+srv://<username>:<password>@cluster0.mongodb.net/portfolio?retryWrites=true&w=majority"
```
*(Note: If `MONGODB_URI` is omitted, the application runs seamlessly using its built-in in-memory database fallback!)*

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000`.

### 5. Build for Production
```bash
npm run build
```
This builds the client application to `dist/` and bundles the backend server into `dist/server.cjs` via `esbuild`.

To start the production server:
```bash
npm run start
```

---

## 🌐 GitHub Setup & Push Instructions

Follow these exact commands to upload the project to your GitHub account:

```bash
# 1. Initialize Git repository (if not already initialized)
git init

# 2. Stage all files
git add .

# 3. Commit the changes
git commit -m "Create YASHAS C portfolio"

# 4. Rename default branch to main
git branch -M main

# 5. Connect your remote GitHub repository
# Replace 'YOUR-GITHUB-USERNAME' with your actual username (e.g., yashas-c)
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/YOUR-REPOSITORY-NAME.git

# 6. Push to GitHub
git push -u origin main
```

---

## 📄 GitHub Pages Deployment

This repository includes an automated GitHub Actions workflow (`.github/workflows/deploy.yml`).

### Steps to enable GitHub Pages:
1. Go to your repository on GitHub.
2. Navigate to **Settings** → **Pages**.
3. Under **Build and deployment** → **Source**, select **GitHub Actions**.
4. Push to `main` branch. GitHub Actions will automatically compile and publish your portfolio at:
   `https://YOUR-GITHUB-USERNAME.github.io/YOUR-REPOSITORY-NAME/`

---

## ☁️ Backend Deployment (Render / Railway / Cloud Run)

To deploy the full-stack backend with MongoDB on Render or Railway:
1. Set the **Build Command** to: `npm run build`
2. Set the **Start Command** to: `npm run start`
3. Add the `MONGODB_URI` environment variable from your MongoDB Atlas dashboard.

---

## 📞 Personal Contact

* **Name:** YASHAS C
* **Title:** Computer Science Student & Aspiring Software Developer
* **Phone:** [+91 9147837927](tel:+919147837927)
* **Email:** yashaschandru583@gmail.com
* **GitHub:** [https://github.com/yashas-c](https://github.com/yashas-c)
* **LinkedIn:** [https://linkedin.com/in/yashas-c](https://linkedin.com/in/yashas-c)

---
*Created with craftsmanship for academic excellence, internship applications, and professional presentations.*
