// ==========================================================================
// PORTFOLIO CONFIGURATION DATA - KUMAR DEVANSHU
// Web Developer + Freelancer
// ==========================================================================

const portfolioData = {
  // Personal & Header Details
  profile: {
    nameHeader: "KUMAR\nDEVANSHU",
    portfolioYear: "'25",
    greeting: "Hi, I'm Kumar Devanshu",
    roleSubtitle: "Web Developer + Freelancer",
    bio: "Full-Stack Web Developer & Freelance Software Engineer. I specialize in building offline-first Progressive Web Apps (PWAs) and production web apps with HTML, CSS, JavaScript, React, Node.js, Express, MongoDB, TypeScript, and Firebase.",
    avatarImage: "assets/my profile.webp",
    resumeUrl: "https://drive.google.com/file/d/1acpWs_bNQ0cZU5GKBwEX_LebufhRXZzy/view?usp=sharing",
    email: "kumardevanshu3001@gmail.com",
  },

  // Work Experience
  experiences: [
    {
      id: 1,
      company: "Infyntrek Systèmes",
      mark: "IS",
      role: "Web Development Intern",
      period: "Apr 2026 – Jul 2026",
      description: "Worked on MERN-stack web apps end to end — React.js frontend screens, Node.js and Express.js REST APIs, and MongoDB data. Used Git daily, shipped feature improvements, and completed verified training plus internship credentials (ID: 6D5E08A5B4A5770C)."
    },
    {
      id: 2,
      company: "Indian Oil Corporation Limited",
      mark: "IO",
      role: "SAP Analyst (Apprentice)",
      period: "Feb 2021 – Feb 2022",
      description: "Supported SAP software operations with cross-functional teams. Documented technical requirements, troubleshot issues, and assisted in data management and reporting for critical workflows."
    }
  ],

  // Social Links
  socials: [
    {
      name: "GitHub",
      handle: "@kumardevanshu7",
      url: "https://github.com/kumardevanshu7",
      icon: "github",
      color: "#24292e"
    },
    {
      name: "LinkedIn",
      handle: "Kumar Devanshu",
      url: "https://www.linkedin.com/in/kumardevanshu31/",
      icon: "linkedin",
      color: "#0077b5"
    }
  ],

  // Tools & Technologies
  tools: [
    { name: "HTML5", icon: "html5/html5-original.svg" },
    { name: "CSS3", icon: "css3/css3-original.svg" },
    { name: "JavaScript", icon: "javascript/javascript-original.svg" },
    { name: "Git", icon: "git/git-original.svg" },
    { name: "React", icon: "react/react-original.svg" },
    { name: "Node.js", icon: "nodejs/nodejs-original.svg" },
    { name: "Express.js", icon: "express/express-original.svg" },
    { name: "MongoDB", icon: "mongodb/mongodb-original.svg" },
    { name: "TypeScript", icon: "typescript/typescript-original.svg" },
    { name: "Firebase", icon: "firebase/firebase-plain.svg" },
    { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original.svg" },
    { name: "Vite", icon: "vitejs/vitejs-original.svg" }
  ],

  // 6 Featured Projects (3x2 Grid Layout)
  projects: [
    {
      id: "noteseen",
      number: "01",
      title: "NoteSeen",
      category: "pwa",
      badge: "PWA · React 19 · Vite",
      tagline: "Offline-First Intelligent Notes & AI Prompt Studio",
      shortReview: "Sub-50ms cold boot PWA with 5-tier zero-data-loss autosave, native .noteseen disk sync via File System Access API, and client-side AES-GCM-256 secret vault.",
      accentBg: "#E8D5C4", // Warm Peach / Sand
      logo: "assets/all projects logo/noteseen.png",
      previewImage: "assets/landscape projects pics/noteseen.png",
      liveUrl: "https://note-seen.vercel.app/",
      techStack: ["React 19", "TypeScript", "Vite", "Tiptap WYSIWYG", "Zustand", "Firebase Auth & Firestore", "Supabase Storage", "Web Crypto API", "PWA"],
      overview: "NoteSeen is an ultra-fast, offline-first intelligent notepad and AI prompt studio. Engineered with a zero-friction philosophy: open it, type, and close the tab without manual saving.",
      deliverables: [
        "5-Tier Zero-Loss Persistence (Keystroke Snapshot + IndexedDB + Lifecycle Flush)",
        "Native OS File System Access API (.noteseen portable hard-drive file sync)",
        "Client-Side Zero-Knowledge AES-GCM (256-bit) Encrypted Secret Vault",
        "AI Prompt Management & Visual Prompt Cover Cards with Supabase Storage",
        "Tiptap Rich WYSIWYG Editor with Resizable & Croppable Images"
      ],
      metrics: [
        { label: "Cold Boot", value: "<50ms" },
        { label: "Data Loss", value: "0 Bytes" },
        { label: "Encryption", value: "AES-256" }
      ]
    },
    {
      id: "jobseen",
      number: "02",
      title: "JobSeen",
      category: "fullstack",
      badge: "Astro · React · Firebase",
      tagline: "Social Job Tracker & Walk-in Route Planner",
      shortReview: "End-to-end job application tracking ecosystem featuring cold-call phone lead management (Brute Force module), physical walk-in visit routing, and permission-gated peer listing copying.",
      accentBg: "#D5DCBF", // Sage Pastel Green
      logo: "assets/all projects logo/jobseen.png",
      previewImage: "assets/landscape projects pics/jobseen.png",
      liveUrl: "https://job-seen.vercel.app/",
      techStack: ["Astro (SSR)", "React Islands", "TypeScript", "Cloud Firestore", "Firebase Auth", "Tailwind CSS"],
      overview: "JobSeen solves the chaotic workflow of active job seekers by uniting online applications, cold-calling workflows, and physical company walk-in itineraries into a single secure platform.",
      deliverables: [
        "Kanban & Inbox Status Pipelines (Pending → Applied → Interview → Offer)",
        "Brute Force Cold-Call Tracker with outcome logging and interview scheduling",
        "Physical Walk-in Route Planner with date-based sequencing and Maps integration",
        "Social Connections with granular 'canCopy' permissions for job listings",
        "One Password server-verified cryptographic gate for sensitive record mutations"
      ],
      metrics: [
        { label: "Tracking Speed", value: "3x Faster" },
        { label: "Route Order", value: "Optimized" },
        { label: "Data Privacy", value: "Rule-Gated" }
      ]
    },
    {
      id: "seentasks",
      number: "03",
      title: "SeenTasks",
      category: "ai",
      badge: "React · OpenRouter AI · PWA",
      tagline: "AI-Powered Day Planner & Urgency Prioritizer",
      shortReview: "Personal day-planning PWA that separates instant manual checklists from AI-ranked priority buckets influenced by user energy levels, urgency heuristics, and personal goal traits.",
      accentBg: "#ECE5D8", // Pale Sand
      logo: "assets/all projects logo/seentasks.png",
      previewImage: "assets/landscape projects pics/seentasks.png",
      liveUrl: "https://seen-tasks.vercel.app/",
      techStack: ["React 18", "Vite", "TypeScript", "OpenRouter AI API", "Zustand", "Cloud Firestore", "PWA"],
      overview: "Unlike generic to-do apps that only store static lists, SeenTasks actively helps users decide what deserves today through AI energy-aware prioritization and goal protection.",
      deliverables: [
        "Dual-Layer Task Engine (Instant Quick Tasks + AI-Ranked 'Today' Board)",
        "Persona Goal Engine (Flags conflicting tasks into the 'Danger Zone')",
        "Visual Task Aging Heuristics (Delayed by N days indicator)",
        "Installable PWA with full offline sync and background reconciliation",
        "Companion Assistant Chat & One Password deletion protection"
      ],
      metrics: [
        { label: "Daily Focus", value: "+65%" },
        { label: "AI Ranking", value: "Instant" },
        { label: "Sync Speed", value: "Realtime" }
      ]
    },
    {
      id: "siteseen",
      number: "04",
      title: "SiteSeen",
      category: "fullstack",
      badge: "Next.js 14 · Cloud Firestore",
      tagline: "Visual Web Pinboard & Resource Intelligence",
      shortReview: "Visual bookmarking intelligence platform automating OpenGraph scraping in <2s with Pinterest-style visual masonry grid, instant multi-tag search, and One Password mutation security.",
      accentBg: "#BAC7D5", // Slate Periwinkle Blue
      logo: "assets/all projects logo/siteseen.png",
      previewImage: "assets/landscape projects pics/siteseen.png",
      liveUrl: "https://site-seen.vercel.app/",
      techStack: ["Next.js 14 (App Router)", "React 18", "TypeScript", "Cloud Firestore", "Firebase Admin SDK", "Tailwind CSS", "Shadcn UI"],
      overview: "SiteSeen replaces text-only bookmark amnesia with an automated, visual-first pinboard that scrapes OpenGraph tags, favicons, titles, and high-res previews in real-time.",
      deliverables: [
        "Automated Server-Side Scraping Engine (/api/scrape fetching OpenGraph in <2s)",
        "Visual Masonry Grid with full-height previews, category badges, and quick launch",
        "Instant Search Autocomplete with multi-tag filtering & substring highlighting",
        "Dynamic Category Lifecycle with atomic Firestore batch mutations",
        "Two-Tier Cryptographic Challenge ('One Password') protecting Create/Update/Delete"
      ],
      metrics: [
        { label: "Scrape Latency", value: "<2.0s" },
        { label: "Visual Recall", value: "60,000x" },
        { label: "Search Speed", value: "Realtime" }
      ]
    },
    {
      id: "seentube",
      number: "05",
      title: "SeenTube",
      category: "fullstack",
      badge: "Astro 5 (SSR) · React 19",
      tagline: "Social YouTube Collection & Learning Roadmaps",
      shortReview: "Private-first video curation platform with connection-gated video sharing, ordered learning roadmaps, progress tracking, and standalone PDF/HTML roadmap export.",
      accentBg: "#F3EDE2", // Warm Gold Sand
      logo: "assets/all projects logo/seentube.png",
      previewImage: "assets/landscape projects pics/seentube.png",
      liveUrl: "https://seen-tube.vercel.app/",
      techStack: ["Astro 5 (SSR)", "React 19", "TypeScript", "Tailwind CSS v4", "Firebase Auth & Firestore", "Firebase Admin SDK", "jsPDF"],
      overview: "Built for focused self-learners, SeenTube organizes educational YouTube videos into ordered, step-by-step learning paths with friend-gated collaboration.",
      deliverables: [
        "Ordered Learning Roadmaps with step-by-step progress tracking",
        "Connection-Gated 'Guild' Sharing (Share only with accepted friends)",
        "Personal Video Collection with watch statuses (Pending, In-Progress, Watched)",
        "One-Click Roadmap Export to Standalone Styled HTML & PDF Guides (jsPDF)",
        "Server-Verified One Password security for privileged deletion requests"
      ],
      metrics: [
        { label: "Roadmaps", value: "Ordered" },
        { label: "PDF Export", value: "Instant" },
        { label: "Privacy", value: "Friend-Gated" }
      ]
    },
    {
      id: "sugarseen",
      number: "06",
      title: "Fam Sugar Track",
      category: "utility",
      badge: "Astro 7 (SSR) · Firebase",
      tagline: "Family Blood Glucose Tracker & Health Insights",
      shortReview: "Translates raw glucometer readings into plain-language health classifications (Low/Normal/Prediabetes/Danger) with multi-member Family Hub and progressive HbA1c analytics.",
      accentBg: "#F0D5D5", // Pastel Rose
      logo: "assets/all projects logo/sugarseen.png",
      previewImage: "assets/landscape projects pics/sugarseen.png",
      liveUrl: "https://fam-sugar-track.vercel.app/",
      techStack: ["Astro 7 (SSR)", "TypeScript", "Firebase Auth & Firestore", "Firebase Admin SDK", "Chart.js", "Tailwind CSS"],
      overview: "Fam Sugar Track breaks through medical jargon by converting numbers (mg/dL) into clear, family-friendly categories with actionable lifestyle tips and multi-profile tracking.",
      deliverables: [
        "Instant Blood Glucose Classification (Low, Normal, Prediabetes, High, Danger)",
        "Multi-Member Family Hub (Mother, Father, Self, Sibling dedicated profiles)",
        "Interactive Chart.js Trend Analytics & Estimated HbA1c Calculations",
        "Doctor-Ready Export Views for clinic appointments",
        "Bilingual Guidance (Hindi/English) with zero confusing medical terminology"
      ],
      metrics: [
        { label: "Interpretation", value: "Instant" },
        { label: "Family Profiles", value: "Multi-User" },
        { label: "Jargon Level", value: "0%" }
      ]
    }
  ],

  // Certificates & Milestones (Snake Rope Bullet Style) — Real Credentials
  certificates: [
    {
      id: "cert-infyntrek-training",
      year: "Apr – Jul 2026",
      title: "Certificate of Training — Web Development",
      issuer: "Infyntrek Systèmes  ·  In association with intelleQA Academy",
      badge: "Web Development",
      grade: "Verified ✓",
      certId: "6D5E08A5B4A5770C",
      bullets: [
        "Completed Web Development training with verified proficiency",
        "ISO 9001:2015 and MSME certified, in association with intelleQA Academy",
        "Signatories: Rajesh Kumar (Director) and Steven Agatha (Trainings Head)"
      ],
      image: "assets/certificates/Infyntrek Certificate 01.jpg"
    },
    {
      id: "cert-infyntrek-internship",
      year: "Apr – Jul 2026",
      title: "Certificate of Internship Experience — Web Development",
      issuer: "Infyntrek Systèmes  ·  Employee ID: 23B9BE88E42C0375",
      badge: "Internship",
      grade: "Verified ✓",
      certId: "6D5E08A5B4A5770C",
      bullets: [
        "Recognized for successful internship experience in Web Development",
        "Demonstrated dedication, commitment, and proficiency on assigned work",
        "Signed by Steven (Training Manager) and Rajesh Kumar (Director)"
      ],
      image: "assets/certificates/Infyntrek Certificate 02.jpg"
    },
    {
      id: "cert-wipro-java",
      year: "May – Sep 2024",
      title: "Java Full Stack — Digital Skills Readiness Program",
      issuer: "Wipro TalentNext  ·  Wipro Limited  ·  Verified via Wipro DICE ID",
      badge: "Java Full Stack",
      grade: "Completed",
      certId: "Wipro DICE ID",
      bullets: [
        "Completed the TalentNext Java Full Stack course (May – Sep 2024)",
        "Credential issued 07 October 2024 and verified via Wipro DICE ID",
        "Signed by Bibhuti Patnaik — General Manager, Global Head Talent Skilling, Wipro Limited"
      ],
      image: "assets/certificates/Wipro TalentNext - Java Full Stack Certification.jpg"
    },
    {
      id: "cert-saviynt",
      year: "22 Dec 2025",
      title: "Identity Security for AI Age",
      issuer: "Saviynt  ·  8 CPE Hours  ·  Saviynt Certified",
      badge: "Identity Security · AI",
      grade: "Certified",
      certId: "Saviynt Certified",
      bullets: [
        "Completed Saviynt Identity Security for AI Age certification",
        "8 CPE Hours under the official Saviynt Certified seal",
        "Signed by Sachin Nayyar — CEO, Saviynt"
      ],
      image: "assets/certificates/Saviynt Certificate.jpg"
    }
  ],

  education: [
    {
      degree: "B.Tech in Information Technology",
      year: "2025",
      school: "Galgotia College of Engineering and Technology",
      location: "Greater Noida, India"
    },
    {
      degree: "Diploma in Electrical Engineering",
      year: "2020",
      school: "Polytechnic Institute",
      location: "Delhi, India"
    }
  ]

};
