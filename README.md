<div align="center">

# 📚 StudyFlow

**A modern student productivity dashboard — built to help you study smarter, not harder.**

[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react&logoColor=white)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vitejs.dev)
[![JavaScript](https://img.shields.io/badge/JavaScript-ES2024-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://studyflow-nine-liart.vercel.app)
[![License](https://img.shields.io/badge/License-MIT-6EE7B7?style=flat-square)](LICENSE)

[🚀 Live Demo](https://studyflow-nine-liart.vercel.app) · [🐛 Report Bug](https://github.com/poojaaxx/studyflow/issues) · [✨ Request Feature](https://github.com/poojaaxx/studyflow/issues)

</div>

---

## 🧭 Overview

StudyFlow is a sleek, all-in-one productivity dashboard designed for students who want to stay organised, track their academic progress, and make the most of every study session. Built with React and Vite, it runs entirely in the browser with no backend required — your data stays local and private.

The interface follows a dark, modern aesthetic with glassmorphism cards, smooth hover animations, and animated progress indicators, making it as pleasant to look at as it is practical to use.

---

## ✨ Features

| Feature | Description |
|---|---|
| ✅ **Task Manager** | Add, complete, and delete tasks with priority tagging (High / Medium / Low) and due dates. Tasks persist across sessions. |
| 📈 **Progress Tracker** | Visualise your academic performance per subject with animated circular rings and shimmer progress bars. |
| ⏱ **Pomodoro Timer** | Built-in 25 / 5 / 15 minute focus and break timer with session logging, mode switching, and a completion ring animation. |
| 🗓 **Schedule Section** | View your daily class timetable with colour-coded session types (lecture, lab, study group). |
| 📝 **Notes Section** | Freeform note-taking area for quick ideas and reminders. |
| 💾 **LocalStorage Persistence** | Tasks are automatically saved to the browser — no account needed, no data lost on refresh. |
| 📱 **Responsive Design** | Fully responsive layout with a collapsible sidebar, mobile-friendly grids, and adaptive font sizing. |
| 🌑 **Modern Dark UI** | Glassmorphism cards, gradient accents, ambient mesh background, and micro-interaction animations throughout. |

---

## 🛠 Tech Stack

| Layer | Technology |
|---|---|
| UI Framework | [React 18](https://react.dev) |
| Build Tool | [Vite](https://vitejs.dev) |
| Language | JavaScript (ES2024) |
| Styling | Inline styles + CSS-in-JS (no external UI library) |
| State Management | React Hooks (`useState`, `useEffect`, `useRef`) |
| Persistence | Browser `localStorage` API |
| Deployment | [Vercel](https://vercel.com) |
| Fonts | [Syne](https://fonts.google.com/specimen/Syne) · [DM Mono](https://fonts.google.com/specimen/DM+Mono) via Google Fonts |

---

## 🖥 Screenshots

> _Replace the placeholders below with actual screenshots from your deployed app._

| Dashboard | Task Manager |
|:---------:|:------------:|
| ![Dashboard](https://via.placeholder.com/480x300/060d1b/6EE7B7?text=Dashboard) | ![Tasks](https://via.placeholder.com/480x300/060d1b/FCA5A5?text=Task+Manager) |

| Pomodoro Timer | Progress Tracker |
|:--------------:|:----------------:|
| ![Pomodoro](https://via.placeholder.com/480x300/060d1b/C4B5FD?text=Pomodoro+Timer) | ![Progress](https://via.placeholder.com/480x300/060d1b/93C5FD?text=Progress+Tracker) |

---

## 🚀 Live Demo

The app is deployed and publicly accessible on Vercel:

**👉 [https://studyflow-nine-liart.vercel.app](https://studyflow-nine-liart.vercel.app)**

---

## ⚙️ Installation

Follow these steps to run StudyFlow locally:

### Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm or yarn

### Steps

```bash
# 1. Clone the repository
git clone https://github.com/poojaaxx/studyflow.git

# 2. Navigate into the project directory
cd studyflow

# 3. Install dependencies
npm install

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5173` by default.

### Build for Production

```bash
# Create an optimised production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 📖 Usage

Once the app is running:

1. **Dashboard** — Get an at-a-glance view of your stats, today's tasks, class schedule, and subject progress.
2. **Tasks** — Click `+ Add` to create a task, set its priority, and press Enter or the button to save. Click the checkbox to mark it done; tasks auto-save to localStorage.
3. **Progress** — Browse per-subject completion rings and session counts. Update the `SUBJECTS` constant in `App.jsx` to reflect your own courses.
4. **Schedule** — View your daily timetable. Edit the `SCHEDULE` constant in `App.jsx` to add your real class times.
5. **Pomodoro** — Select a mode (Focus / Short Break / Long Break), hit ▶ to start, ⏸ to pause, ↺ to reset. Completed sessions are tracked in the session log below.
6. **Notes** — Use the freeform textarea to jot down quick notes during a study session.

---

## 🔮 Future Improvements

- [ ] **User authentication** — allow multiple student profiles
- [ ] **Cloud sync** — persist data across devices with a backend (Firebase / Supabase)
- [ ] **Custom subjects** — add, edit, and remove subjects from the UI without touching code
- [ ] **Calendar view** — full weekly/monthly schedule with drag-and-drop events
- [ ] **Notifications** — browser push notifications when a Pomodoro session ends
- [ ] **Dark / Light theme toggle** — system-aware colour scheme switching
- [ ] **Analytics dashboard** — weekly study trends with charts and streak graphs
- [ ] **Export tasks** — download task list as CSV or PDF

---

## 👩‍💻 Author

<div align="center">

**Poojaa**

[![GitHub](https://img.shields.io/badge/GitHub-poojaaxx-181717?style=flat-square&logo=github)](https://github.com/poojaaxx)

_Built with 💚 and too many study hours._

</div>

---

<div align="center">

⭐ If you find StudyFlow useful, consider giving it a star on GitHub — it helps a lot!

</div>