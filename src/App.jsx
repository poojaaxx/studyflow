import { useState, useEffect, useRef } from "react";

const NAV_ITEMS = [
  { id: "dashboard", label: "Dashboard", icon: "⊞" },
  { id: "tasks", label: "Tasks", icon: "✓" },
  { id: "progress", label: "Progress", icon: "◈" },
  { id: "schedule", label: "Schedule", icon: "⊡" },
  { id: "notes", label: "Notes", icon: "◧" },
  { id: "pomodoro", label: "Pomodoro", icon: "⏱" },
];

const INITIAL_TASKS = [
  { id: 1, text: "Complete Math Assignment", done: false, priority: "high", due: "Today" },
  { id: 2, text: "Read Chapter 7 – History", done: true, priority: "medium", due: "Yesterday" },
  { id: 3, text: "Physics Lab Report", done: false, priority: "high", due: "Tomorrow" },
  { id: 4, text: "Group Project Slides", done: false, priority: "low", due: "Fri" },
  { id: 5, text: "Submit Literature Essay", done: true, priority: "medium", due: "Mon" },
  { id: 6, text: "Practice Spanish Vocab", done: false, priority: "low", due: "Sun" },
];

const SUBJECTS = [
  { name: "Mathematics", progress: 78, color: "#6EE7B7", sessions: 14 },
  { name: "Physics", progress: 54, color: "#93C5FD", sessions: 9 },
  { name: "History", progress: 91, color: "#FCA5A5", sessions: 18 },
  { name: "Literature", progress: 63, color: "#FDE68A", sessions: 11 },
  { name: "Spanish", progress: 42, color: "#C4B5FD", sessions: 7 },
];

const SCHEDULE = [
  { time: "08:00", subject: "Mathematics", room: "B204", type: "lecture" },
  { time: "10:00", subject: "Physics Lab", room: "Lab 3", type: "lab" },
  { time: "13:00", subject: "History", room: "A101", type: "lecture" },
  { time: "15:30", subject: "Study Group", room: "Library", type: "study" },
];

const STATS = [
  { label: "Study Hours", value: "24h", sub: "this week", icon: "⏱", trend: "+3h" },
  { label: "Tasks Done", value: "17", sub: "this week", icon: "✔", trend: "+5" },
  { label: "Avg. Score", value: "86%", sub: "across subjects", icon: "◈", trend: "+2%" },
  { label: "Streak", value: "12", sub: "days active", icon: "⚡", trend: "best: 18" },
];

const PRIORITY_COLORS = { high: "#FCA5A5", medium: "#FDE68A", low: "#6EE7B7" };

function CircleProgress({ value, color, size = 72 }) {
  const r = (size - 10) / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (value / 100) * circ;
  return (
    <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="#1e293b" strokeWidth={8} />
      <circle
        cx={size / 2} cy={size / 2} r={r} fill="none"
        stroke={color} strokeWidth={8}
        strokeDasharray={circ} strokeDashoffset={offset}
        strokeLinecap="round"
        style={{ transition: "stroke-dashoffset 0.8s ease" }}
      />
    </svg>
  );
}

function StatCard({ stat }) {
  return (
    <div className="glass stat-card" style={{
      borderRadius: 20,
      padding: "22px 24px",
      display: "flex",
      flexDirection: "column",
      gap: 6,
      position: "relative",
      overflow: "hidden",
    }}>
      <div style={{
        position: "absolute", right: -24, top: -24, width: 96, height: 96, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(110,231,183,0.15) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", left: -16, bottom: -16, width: 64, height: 64, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(147,197,253,0.08) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />
      <span style={{ fontSize: 22, marginBottom: 2 }}>{stat.icon}</span>
      <span style={{
        fontSize: 32, fontFamily: "'DM Mono', monospace", fontWeight: 700, letterSpacing: -1,
        background: "linear-gradient(135deg, #f1f5f9 60%, #6EE7B7)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>{stat.value}</span>
      <span style={{ fontSize: 13, color: "#64748b", fontFamily: "'Syne', sans-serif", letterSpacing: 0.2 }}>{stat.label}</span>
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 2 }}>
        <span style={{
          fontSize: 11, color: "#6EE7B7", fontFamily: "'DM Mono', monospace",
          background: "rgba(110,231,183,0.12)", padding: "1px 6px", borderRadius: 6,
        }}>{stat.trend}</span>
        <span style={{ fontSize: 11, color: "#475569" }}>{stat.sub}</span>
      </div>
    </div>
  );
}

function TaskRow({ task, onToggle, onDelete }) {
  return (
    <div className="task-row" style={{
      display: "flex", alignItems: "center", gap: 12,
      padding: "12px 16px", borderRadius: 12,
      background: task.done ? "rgba(15,23,42,0.3)" : "rgba(15,23,42,0.6)",
      backdropFilter: "blur(12px)",
      border: "1px solid rgba(255,255,255,0.06)",
      opacity: task.done ? 0.52 : 1,
      marginBottom: 8,
    }}>
      <button
        onClick={() => onToggle(task.id)}
        style={{
          width: 22, height: 22, borderRadius: 6,
          border: task.done ? "none" : "2px solid #334155",
          background: task.done ? "#6EE7B7" : "transparent",
          cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
          flexShrink: 0, color: "#0f172a", fontSize: 13, fontWeight: 900,
          transition: "all 0.15s",
        }}
      >{task.done ? "✓" : ""}</button>
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 14, color: task.done ? "#475569" : "#cbd5e1",
          fontFamily: "'Syne', sans-serif",
          textDecoration: task.done ? "line-through" : "none",
        }}>{task.text}</div>
        <div style={{ fontSize: 11, color: "#475569", marginTop: 2, fontFamily: "'DM Mono', monospace" }}>Due: {task.due}</div>
      </div>
      <span style={{
        fontSize: 10, fontFamily: "'DM Mono', monospace",
        color: PRIORITY_COLORS[task.priority],
        background: PRIORITY_COLORS[task.priority] + "18",
        padding: "2px 8px", borderRadius: 20,
        border: `1px solid ${PRIORITY_COLORS[task.priority]}33`,
        textTransform: "uppercase", letterSpacing: 1,
      }}>{task.priority}</span>
      <button
        onClick={() => onDelete(task.id)}
        style={{
          background: "none", border: "none", color: "#334155",
          cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 2,
          borderRadius: 4, transition: "color 0.15s",
        }}
        onMouseOver={e => e.target.style.color = "#FCA5A5"}
        onMouseOut={e => e.target.style.color = "#334155"}
      >×</button>
    </div>
  );
}

function ProgressSection() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {SUBJECTS.map(s => (
        <div key={s.name} className="glass" style={{
          display: "flex", alignItems: "center", gap: 16,
          borderRadius: 16, padding: "16px 20px",
        }}>
          <div style={{ position: "relative", width: 72, height: 72, flexShrink: 0 }}>
            <CircleProgress value={s.progress} color={s.color} size={72} />
            <span style={{
              position: "absolute", inset: 0, display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: 13, fontFamily: "'DM Mono', monospace",
              color: s.color, fontWeight: 700,
            }}>{s.progress}%</span>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15, fontFamily: "'Syne', sans-serif", color: "#e2e8f0", fontWeight: 600 }}>{s.name}</div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 3, fontFamily: "'DM Mono', monospace" }}>
              {s.sessions} sessions logged
            </div>
            <div style={{ marginTop: 10, height: 6, background: "rgba(30,41,59,0.8)", borderRadius: 99, overflow: "hidden" }}>
              <div className="progress-bar-animated" style={{
                height: "100%", width: `${s.progress}%`,
                borderRadius: 99,
                "--bar-color": s.color,
                transition: "width 1.2s cubic-bezier(.4,0,.2,1)",
              }} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ScheduleSection() {
  const TYPE_COLORS = { lecture: "#93C5FD", lab: "#FDE68A", study: "#6EE7B7" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {SCHEDULE.map((s, i) => (
        <div key={i} className="schedule-row" style={{
          display: "flex", alignItems: "center", gap: 16,
          background: "rgba(15,23,42,0.55)", backdropFilter: "blur(12px)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 14, padding: "14px 18px",
        }}>
          <div style={{
            fontFamily: "'DM Mono', monospace", fontSize: 14,
            color: "#64748b", width: 48, flexShrink: 0,
          }}>{s.time}</div>
          <div style={{
            width: 3, height: 36, borderRadius: 99,
            background: `linear-gradient(180deg, ${TYPE_COLORS[s.type]}, ${TYPE_COLORS[s.type]}88)`,
            flexShrink: 0, boxShadow: `0 0 8px ${TYPE_COLORS[s.type]}55`,
          }} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: "#e2e8f0", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{s.subject}</div>
            <div style={{ fontSize: 12, color: "#475569", marginTop: 2 }}>{s.room}</div>
          </div>
          <span style={{
            fontSize: 10, fontFamily: "'DM Mono', monospace",
            color: TYPE_COLORS[s.type], background: TYPE_COLORS[s.type] + "18",
            padding: "2px 8px", borderRadius: 20,
            border: `1px solid ${TYPE_COLORS[s.type]}33`,
            textTransform: "uppercase", letterSpacing: 1,
          }}>{s.type}</span>
        </div>
      ))}
    </div>
  );
}

const POMODORO_MODES = [
  { id: "focus",  label: "Focus",       minutes: 25, color: "#6EE7B7", glow: "rgba(110,231,183,0.25)" },
  { id: "short",  label: "Short Break", minutes: 5,  color: "#93C5FD", glow: "rgba(147,197,253,0.25)" },
  { id: "long",   label: "Long Break",  minutes: 15, color: "#C4B5FD", glow: "rgba(196,181,253,0.25)" },
];

function PomodoroSection() {
  const [modeIdx, setModeIdx]     = useState(0);
  const [seconds, setSeconds]     = useState(POMODORO_MODES[0].minutes * 60);
  const [running, setRunning]     = useState(false);
  const [sessions, setSessions]   = useState(0);
  const [pulseRing, setPulseRing] = useState(false);
  const intervalRef = useRef(null);
  const mode = POMODORO_MODES[modeIdx];
  const total = mode.minutes * 60;
  const pct   = ((total - seconds) / total) * 100;

  // tick
  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(() => {
        setSeconds(s => {
          if (s <= 1) {
            clearInterval(intervalRef.current);
            setRunning(false);
            setSessions(n => n + 1);
            setPulseRing(true);
            setTimeout(() => setPulseRing(false), 1200);
            return 0;
          }
          return s - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [running]);

  const switchMode = idx => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setModeIdx(idx);
    setSeconds(POMODORO_MODES[idx].minutes * 60);
  };

  const reset = () => {
    clearInterval(intervalRef.current);
    setRunning(false);
    setSeconds(mode.minutes * 60);
  };

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");

  // SVG ring
  const R    = 110;
  const CIRC = 2 * Math.PI * R;
  const dash = CIRC - (pct / 100) * CIRC;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <style>{`
        @keyframes ring-pulse {
          0%   { opacity: 1; transform: scale(1);    }
          50%  { opacity: 0; transform: scale(1.18); }
          100% { opacity: 0; transform: scale(1.18); }
        }
        .pomo-btn {
          transition: transform 0.18s cubic-bezier(.34,1.56,.64,1), box-shadow 0.18s ease, background 0.15s ease !important;
        }
        .pomo-btn:hover  { transform: translateY(-2px) scale(1.05); }
        .pomo-btn:active { transform: scale(0.96); }
        .mode-pill {
          transition: all 0.2s ease !important;
          cursor: pointer;
        }
        .mode-pill:hover { opacity: 0.85; }
        @keyframes pomo-tick {
          0%   { transform: scale(1);    }
          50%  { transform: scale(1.03); }
          100% { transform: scale(1);    }
        }
        .pomo-tick { animation: pomo-tick 1s ease-in-out; }
      `}</style>

      {/* Header */}
      <div>
        <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9" }}>
          Pomodoro Timer
        </div>
        <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
          {sessions} session{sessions !== 1 ? "s" : ""} completed today
        </div>
      </div>

      {/* Mode pills */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {POMODORO_MODES.map((m, i) => (
          <button
            key={m.id}
            className="mode-pill"
            onClick={() => switchMode(i)}
            style={{
              fontFamily: "'DM Mono', monospace", fontSize: 12,
              padding: "7px 18px", borderRadius: 99, border: "none", cursor: "pointer",
              background: modeIdx === i ? m.color + "22" : "rgba(15,23,42,0.5)",
              color:      modeIdx === i ? m.color          : "#475569",
              border:     modeIdx === i ? `1px solid ${m.color}55` : "1px solid rgba(255,255,255,0.06)",
              fontWeight: modeIdx === i ? 700 : 400,
              backdropFilter: "blur(8px)",
              letterSpacing: 0.5,
            }}
          >{m.label} · {m.minutes}m</button>
        ))}
      </div>

      {/* Main timer card */}
      <div className="glass" style={{
        borderRadius: 24, padding: "48px 32px",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 36,
        position: "relative", overflow: "hidden",
      }}>
        {/* ambient glow behind ring */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 300, height: 300, borderRadius: "50%",
          background: `radial-gradient(circle, ${mode.glow} 0%, transparent 70%)`,
          pointerEvents: "none", transition: "background 0.6s ease",
        }} />

        {/* SVG ring + time */}
        <div style={{ position: "relative", width: 260, height: 260 }}>
          <svg width="260" height="260" style={{ transform: "rotate(-90deg)" }}>
            {/* track */}
            <circle cx="130" cy="130" r={R}
              fill="none" stroke="rgba(30,41,59,0.8)" strokeWidth="10" />
            {/* pulse ring on complete */}
            {pulseRing && (
              <circle cx="130" cy="130" r={R}
                fill="none" stroke={mode.color} strokeWidth="10"
                style={{ animation: "ring-pulse 1.2s ease-out forwards" }} />
            )}
            {/* progress arc */}
            <circle cx="130" cy="130" r={R}
              fill="none"
              stroke={mode.color}
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRC}
              strokeDashoffset={dash}
              style={{
                transition: running ? "stroke-dashoffset 1s linear" : "stroke-dashoffset 0.4s ease",
                filter: `drop-shadow(0 0 8px ${mode.color}88)`,
              }}
            />
          </svg>

          {/* centred time display */}
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 4,
          }}>
            <span style={{
              fontSize: 58, fontFamily: "'DM Mono', monospace", fontWeight: 700,
              color: "#f1f5f9", letterSpacing: -2, lineHeight: 1,
              textShadow: `0 0 24px ${mode.color}55`,
            }}>{mm}:{ss}</span>
            <span style={{
              fontSize: 11, fontFamily: "'DM Mono', monospace",
              color: mode.color, letterSpacing: 3, textTransform: "uppercase",
              opacity: 0.8,
            }}>{mode.label}</span>
          </div>
        </div>

        {/* Controls */}
        <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
          {/* Reset */}
          <button className="pomo-btn" onClick={reset} style={{
            width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)",
            cursor: "pointer", fontSize: 18, color: "#64748b",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>↺</button>

          {/* Play / Pause */}
          <button className="pomo-btn" onClick={() => setRunning(r => !r)} style={{
            width: 72, height: 72, borderRadius: "50%", border: "none",
            background: `linear-gradient(135deg, ${mode.color}, ${mode.color}bb)`,
            cursor: "pointer", fontSize: 24, color: "#0a1120",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontWeight: 900,
            boxShadow: `0 4px 24px ${mode.color}55, 0 0 0 1px ${mode.color}33`,
          }}>{running ? "⏸" : "▶"}</button>

          {/* Skip to next mode */}
          <button className="pomo-btn" onClick={() => switchMode((modeIdx + 1) % POMODORO_MODES.length)} style={{
            width: 48, height: 48, borderRadius: "50%", border: "1px solid rgba(255,255,255,0.1)",
            background: "rgba(15,23,42,0.7)", backdropFilter: "blur(8px)",
            cursor: "pointer", fontSize: 16, color: "#64748b",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>⏭</button>
        </div>

        {/* Progress label */}
        <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#475569", letterSpacing: 1 }}>
          {Math.round(pct)}% · {mm}:{ss} elapsed
        </div>
      </div>

      {/* Session tracker dots */}
      <div className="glass" style={{ borderRadius: 18, padding: "20px 24px" }}>
        <div style={{ fontSize: 12, fontFamily: "'DM Mono', monospace", color: "#64748b", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
          Session Log
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
          {Array.from({ length: Math.max(sessions, 8) }).map((_, i) => (
            <div key={i} style={{
              width: 28, height: 28, borderRadius: "50%",
              background: i < sessions
                ? `linear-gradient(135deg, ${POMODORO_MODES[0].color}, #93C5FD)`
                : "rgba(30,41,59,0.8)",
              border: i < sessions
                ? `1px solid ${POMODORO_MODES[0].color}55`
                : "1px solid rgba(255,255,255,0.06)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, color: i < sessions ? "#0a1120" : "#1e293b",
              fontFamily: "'DM Mono', monospace", fontWeight: 700,
              boxShadow: i < sessions ? `0 0 8px ${POMODORO_MODES[0].color}44` : "none",
              transition: "all 0.3s ease",
            }}>{i < sessions ? "✓" : ""}</div>
          ))}
          {sessions > 8 && (
            <span style={{ fontSize: 12, color: "#475569", fontFamily: "'DM Mono', monospace" }}>
              +{sessions - 8} more
            </span>
          )}
        </div>
        {sessions >= 4 && (
          <div style={{
            marginTop: 14, fontSize: 12, fontFamily: "'DM Mono', monospace",
            color: "#6EE7B7", background: "rgba(110,231,183,0.08)",
            padding: "8px 14px", borderRadius: 10, border: "1px solid rgba(110,231,183,0.2)",
            display: "inline-block",
          }}>
            🎉 {Math.floor(sessions / 4)} full Pomodoro cycle{Math.floor(sessions / 4) > 1 ? "s" : ""} done!
          </div>
        )}
      </div>
    </div>
  );
}

export default function App() {
  const [active, setActive] = useState("dashboard");
  const [tasks, setTasks] = useState(() => {
    try {
      const saved = localStorage.getItem("StudyFlow-tasks");
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [newTask, setNewTask] = useState("");
  const [newPriority, setNewPriority] = useState("medium");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem("StudyFlow-tasks", JSON.stringify(tasks));
    } catch {}
  }, [tasks]);

  const toggleTask = id => setTasks(t => t.map(x => x.id === id ? { ...x, done: !x.done } : x));
  const deleteTask = id => setTasks(t => t.filter(x => x.id !== id));
  const addTask = () => {
    if (!newTask.trim()) return;
    setTasks(t => [...t, { id: Date.now(), text: newTask.trim(), done: false, priority: newPriority, due: "Soon" }]);
    setNewTask("");
  };

  const done = tasks.filter(t => t.done).length;
  const total = tasks.length;

  const renderContent = () => {
    if (active === "dashboard") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
        {/* Greeting */}
        <div>
          <div className="greeting-title" style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", letterSpacing: -0.5 }}>
            Welcome Back, Poojaa! 👋
          </div>
          <div style={{ fontSize: 14, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
            Saturday, May 16, 2026 · 3 tasks due today
          </div>
        </div>
        {/* Stats */}
        <div className="stats-grid" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 14 }}>
          {STATS.map(s => <StatCard key={s.label} stat={s} />)}
        </div>
        {/* Two columns */}
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {/* Today's tasks */}
          <div className="glass" style={{ borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#6EE7B7", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
              Today's Tasks
            </div>
            {tasks.filter(t => ["Today", "Tomorrow"].includes(t.due)).slice(0, 4).map(t => (
              <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
            ))}
            <div style={{ fontSize: 12, color: "#334155", marginTop: 8, textAlign: "right", cursor: "pointer", fontFamily: "'DM Mono', monospace" }}
              onClick={() => setActive("tasks")}>View all →</div>
          </div>
          {/* Today's schedule */}
          <div className="glass" style={{ borderRadius: 18, padding: 20 }}>
            <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#93C5FD", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
              Today's Classes
            </div>
            <ScheduleSection />
          </div>
        </div>
        {/* Progress preview */}
        <div className="glass" style={{ borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#FDE68A", textTransform: "uppercase", letterSpacing: 2, marginBottom: 16 }}>
            Subject Progress
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
            {SUBJECTS.slice(0, 3).map(s => (
              <div key={s.name} className="glass" style={{
                display: "flex", alignItems: "center", gap: 14,
                borderRadius: 12, padding: "12px 16px",
              }}>
                <div style={{ position: "relative", width: 52, height: 52, flexShrink: 0 }}>
                  <CircleProgress value={s.progress} color={s.color} size={52} />
                  <span style={{
                    position: "absolute", inset: 0, display: "flex", alignItems: "center",
                    justifyContent: "center", fontSize: 11, fontFamily: "'DM Mono', monospace",
                    color: s.color, fontWeight: 700,
                  }}>{s.progress}%</span>
                </div>
                <div>
                  <div style={{ fontSize: 13, color: "#cbd5e1", fontFamily: "'Syne', sans-serif", fontWeight: 600 }}>{s.name}</div>
                  <div style={{ fontSize: 11, color: "#475569", marginTop: 2 }}>{s.sessions} sessions</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );

    if (active === "tasks") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9" }}>Task Manager</div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>
            {done}/{total} completed
          </div>
        </div>
        {/* Add task */}
        <div className="glass" style={{
          borderRadius: 18,
          padding: 20, display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap",
        }}>
          <input
            value={newTask}
            onChange={e => setNewTask(e.target.value)}
            onKeyDown={e => e.key === "Enter" && addTask()}
            placeholder="New task…"
            style={{
              flex: 1, minWidth: 180, background: "rgba(10,17,32,0.7)", border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10, padding: "10px 14px", color: "#e2e8f0",
              fontFamily: "'Syne', sans-serif", fontSize: 14, outline: "none",
            }}
          />
          <select
            value={newPriority}
            onChange={e => setNewPriority(e.target.value)}
            style={{
              background: "#0a1120", border: "1px solid #1e293b", borderRadius: 10,
              padding: "10px 12px", color: "#94a3b8", fontFamily: "'DM Mono', monospace",
              fontSize: 13, cursor: "pointer", outline: "none",
            }}
          >
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>
          <button
            className="add-btn"
            onClick={addTask}
            style={{
              background: "#6EE7B7", color: "#0a1120", border: "none",
              borderRadius: 10, padding: "10px 20px", fontFamily: "'Syne', sans-serif",
              fontSize: 14, fontWeight: 700, cursor: "pointer",
            }}
          >+ Add</button>
        </div>
        {/* Progress bar */}
        <div className="glass" style={{ borderRadius: 14, padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontSize: 13, color: "#64748b", fontFamily: "'DM Mono', monospace" }}>Overall completion</span>
            <span style={{ fontSize: 13, color: "#6EE7B7", fontFamily: "'DM Mono', monospace", fontWeight: 700 }}>{Math.round((done / total) * 100)}%</span>
          </div>
          <div style={{ height: 8, background: "rgba(30,41,59,0.8)", borderRadius: 99, overflow: "hidden" }}>
            <div className="progress-bar-animated" style={{
              height: "100%", width: `${(done / total) * 100}%`,
              borderRadius: 99, transition: "width 0.6s cubic-bezier(.4,0,.2,1)",
              "--bar-color": "#6EE7B7",
            }} />
          </div>
        </div>
        {/* Task list */}
        <div className="glass" style={{ borderRadius: 18, padding: 20 }}>
          <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#FCA5A5", textTransform: "uppercase", letterSpacing: 2, marginBottom: 14 }}>
            All Tasks
          </div>
          {tasks.map(t => (
            <TaskRow key={t.id} task={t} onToggle={toggleTask} onDelete={deleteTask} />
          ))}
          {tasks.length === 0 && (
            <div style={{ textAlign: "center", color: "#334155", padding: "24px 0", fontFamily: "'DM Mono', monospace", fontSize: 13 }}>
              No tasks. Add one above!
            </div>
          )}
        </div>
      </div>
    );

    if (active === "progress") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9" }}>Progress Tracker</div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>Your academic performance at a glance</div>
        </div>
        {/* Overall */}
        <div className="glass" style={{
          borderRadius: 18,
          padding: 24, display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap",
        }}>
          <div style={{ position: "relative", width: 110, height: 110, flexShrink: 0 }}>
            <CircleProgress value={66} color="#6EE7B7" size={110} />
            <span style={{
              position: "absolute", inset: 0, display: "flex", flexDirection: "column",
              alignItems: "center", justifyContent: "center",
              fontFamily: "'DM Mono', monospace", color: "#6EE7B7",
            }}>
              <span style={{ fontSize: 22, fontWeight: 700 }}>66%</span>
              <span style={{ fontSize: 10, color: "#475569" }}>avg</span>
            </span>
          </div>
          <div>
            <div style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", color: "#e2e8f0", fontWeight: 700 }}>Overall Academic Score</div>
            <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>Across 5 subjects · 59 total sessions</div>
            <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
              {["History 91%", "Math 78%", "Literature 63%"].map(b => (
                <span key={b} style={{
                  fontSize: 11, fontFamily: "'DM Mono', monospace",
                  color: "#6EE7B7", background: "#6EE7B718",
                  padding: "3px 10px", borderRadius: 20, border: "1px solid #6EE7B733",
                }}>{b}</span>
              ))}
            </div>
          </div>
        </div>
        <ProgressSection />
      </div>
    );

    if (active === "schedule") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9" }}>Schedule</div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>Today, Saturday May 16</div>
        </div>
        <div className="glass" style={{ borderRadius: 18, padding: 24 }}>
          <ScheduleSection />
        </div>
      </div>
    );

    if (active === "notes") return (
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        <div>
          <div style={{ fontSize: 26, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9" }}>Notes</div>
          <div style={{ fontSize: 13, color: "#475569", marginTop: 4, fontFamily: "'DM Mono', monospace" }}>Quick capture ideas and notes</div>
        </div>
        <div className="glass" style={{ borderRadius: 18, padding: 24 }}>
          <textarea
            placeholder="Start typing your notes here…"
            style={{
              width: "100%", minHeight: 320, background: "transparent",
              border: "none", outline: "none", color: "#cbd5e1",
              fontFamily: "'Syne', sans-serif", fontSize: 15, lineHeight: 1.7,
              resize: "vertical", boxSizing: "border-box",
            }}
          />
        </div>
      </div>
    );

    if (active === "pomodoro") return <PomodoroSection />;

    return null;
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #060d1b; color: #e2e8f0; font-family: 'Syne', sans-serif; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #1e293b; border-radius: 99px; }
        input::placeholder { color: #334155 !important; }
        textarea::placeholder { color: #334155 !important; }

        /* ── Glassmorphism card ── */
        .glass {
          background: rgba(15, 23, 42, 0.55) !important;
          backdrop-filter: blur(18px) saturate(1.4);
          -webkit-backdrop-filter: blur(18px) saturate(1.4);
          border: 1px solid rgba(255,255,255,0.07) !important;
          box-shadow: 0 4px 32px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.05);
          transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease, border-color 0.22s ease !important;
        }
        .glass:hover {
          transform: translateY(-3px) scale(1.01);
          box-shadow: 0 12px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.08);
          border-color: rgba(110,231,183,0.18) !important;
        }

        /* ── Stat card accent glow on hover ── */
        .stat-card { transition: transform 0.22s cubic-bezier(.34,1.56,.64,1), box-shadow 0.22s ease !important; }
        .stat-card:hover { transform: translateY(-4px) scale(1.03); box-shadow: 0 16px 48px rgba(110,231,183,0.12) !important; }

        /* ── Nav button hover ── */
        .nav-btn { transition: all 0.18s ease !important; }
        .nav-btn:not(.nav-active):hover {
          background: rgba(110,231,183,0.07) !important;
          color: #94a3b8 !important;
          transform: translateX(3px);
        }

        /* ── Task row hover ── */
        .task-row { transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease !important; }
        .task-row:hover { transform: translateX(4px); border-color: rgba(110,231,183,0.2) !important; box-shadow: 0 4px 20px rgba(0,0,0,0.3); }

        /* ── Schedule row hover ── */
        .schedule-row { transition: transform 0.18s ease, background 0.18s ease, border-color 0.18s ease !important; }
        .schedule-row:hover { transform: translateX(4px); border-color: rgba(147,197,253,0.25) !important; background: rgba(15,23,42,0.8) !important; }

        /* ── Animated progress bar shimmer ── */
        @keyframes shimmer {
          0% { background-position: -200% center; }
          100% { background-position: 200% center; }
        }
        .progress-bar-animated {
          background: linear-gradient(90deg, var(--bar-color, #6EE7B7) 0%, #93C5FD 50%, var(--bar-color, #6EE7B7) 100%);
          background-size: 200% auto;
          animation: shimmer 2.5s linear infinite;
        }

        /* ── Fade-in for page sections ── */
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(16px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.38s cubic-bezier(.22,1,.36,1) both; }

        /* ── Add-task button hover ── */
        .add-btn { transition: background 0.18s, transform 0.15s, box-shadow 0.18s !important; }
        .add-btn:hover { background: #a7f3d0 !important; transform: scale(1.04); box-shadow: 0 4px 20px rgba(110,231,183,0.35); }
        .add-btn:active { transform: scale(0.97); }

        /* ── Streak badge pulse ── */
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 0 0 rgba(110,231,183,0.25); }
          50%       { box-shadow: 0 0 0 6px rgba(110,231,183,0); }
        }
        .streak-badge { animation: pulse-glow 2.4s ease-in-out infinite; }

        /* ── Topbar glass ── */
        .topbar-glass {
          background: rgba(10,17,32,0.75) !important;
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255,255,255,0.05) !important;
        }

        /* ── Sidebar glass ── */
        .sidebar-glass {
          background: rgba(10,17,32,0.82) !important;
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
          border-right: 1px solid rgba(255,255,255,0.05) !important;
        }

        /* ── Mobile ── */
        @media (max-width: 700px) {
          .two-col { grid-template-columns: 1fr !important; }
          .stats-grid { grid-template-columns: 1fr 1fr !important; }
          .sidebar { transform: translateX(-100%); position: fixed !important; z-index: 100; transition: transform 0.28s cubic-bezier(.4,0,.2,1); }
          .sidebar.open { transform: translateX(0); }
          .hamburger { display: flex !important; }
          .content-pad { padding: 16px !important; }
          .greeting-title { font-size: 20px !important; }
          .progress-row { flex-wrap: wrap; }
        }
        @media (max-width: 420px) {
          .stats-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
      <div style={{ display: "flex", minHeight: "100vh", background: "#060d1b", position: "relative" }}>
        {/* Ambient background mesh */}
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
          <div style={{
            position: "absolute", top: "-20%", left: "30%", width: 600, height: 600,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(110,231,183,0.04) 0%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", bottom: "-10%", right: "10%", width: 500, height: 500,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(147,197,253,0.04) 0%, transparent 65%)",
          }} />
          <div style={{
            position: "absolute", top: "50%", left: "-5%", width: 400, height: 400,
            borderRadius: "50%", background: "radial-gradient(circle, rgba(196,181,253,0.03) 0%, transparent 65%)",
          }} />
        </div>
        {/* Sidebar */}
        <div className={`sidebar sidebar-glass${sidebarOpen ? " open" : ""}`} style={{
          width: 220,
          display: "flex", flexDirection: "column",
          padding: "28px 0", position: "sticky", top: 0, height: "100vh",
          flexShrink: 0, zIndex: 10,
        }}>
          {/* Logo */}
          <div style={{ padding: "0 24px 28px", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
            <div style={{ fontSize: 18, fontFamily: "'Syne', sans-serif", fontWeight: 800, color: "#f1f5f9", letterSpacing: -0.5 }}>
              <span style={{ color: "#6EE7B7" }}>StudyFlow</span>
            </div>
            <div style={{ fontSize: 11, fontFamily: "'DM Mono', monospace", color: "#334155", marginTop: 2 }}>
              student workspace
            </div>
          </div>
          {/* Nav */}
          <nav style={{ flex: 1, padding: "20px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
            {NAV_ITEMS.map(item => {
              const isActive = active === item.id;
              return (
                <button
                  key={item.id}
                  className={`nav-btn${isActive ? " nav-active" : ""}`}
                  onClick={() => { setActive(item.id); setSidebarOpen(false); }}
                  style={{
                    display: "flex", alignItems: "center", gap: 12,
                    padding: "10px 14px", borderRadius: 10,
                    border: "none", cursor: "pointer",
                    background: isActive
                      ? "linear-gradient(90deg, rgba(110,231,183,0.15), rgba(110,231,183,0.05))"
                      : "transparent",
                    color: isActive ? "#6EE7B7" : "#475569",
                    fontFamily: "'Syne', sans-serif", fontSize: 14, fontWeight: isActive ? 700 : 500,
                    textAlign: "left",
                    borderLeft: isActive ? "2px solid #6EE7B7" : "2px solid transparent",
                    boxShadow: isActive ? "inset 0 0 0 1px rgba(110,231,183,0.1)" : "none",
                  }}
                >
                  <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>{item.icon}</span>
                  {item.label}
                </button>
              );
            })}
          </nav>
          {/* User */}
          <div style={{
            padding: "20px 20px 0", borderTop: "1px solid rgba(255,255,255,0.06)",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{
              width: 34, height: 34, borderRadius: "50%",
              background: "linear-gradient(135deg, #6EE7B7, #93C5FD)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 14, fontWeight: 800, color: "#0a1120", flexShrink: 0,
            }}>A</div>
            <div>
              <div style={{ fontSize: 13, color: "#cbd5e1", fontWeight: 600 }}>Poojaa</div>
              <div style={{ fontSize: 11, color: "#334155", fontFamily: "'DM Mono', monospace" }}>Year 3</div>
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, zIndex: 1 }}>
          {/* Top bar */}
          <div className="topbar-glass" style={{
            padding: "16px 28px",
            display: "flex", alignItems: "center", justifyContent: "space-between",
            position: "sticky", top: 0, zIndex: 10,
          }}>
            <button
              className="hamburger"
              onClick={() => setSidebarOpen(o => !o)}
              style={{
                display: "none", background: "none", border: "none",
                color: "#64748b", fontSize: 22, cursor: "pointer",
              }}
            >☰</button>
            <div style={{ fontSize: 13, fontFamily: "'DM Mono', monospace", color: "#334155" }}>
              Sat, May 16
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div className="streak-badge" style={{
                fontSize: 12, fontFamily: "'DM Mono', monospace",
                color: "#6EE7B7", background: "rgba(110,231,183,0.1)",
                padding: "5px 14px", borderRadius: 20,
                border: "1px solid rgba(110,231,183,0.25)",
                backdropFilter: "blur(8px)",
              }}>🔥 12-day streak</div>
            </div>
          </div>

          {/* Content */}
          <div className="content-pad fade-up" style={{ flex: 1, padding: "28px", maxWidth: 1100, width: "100%" }}>
            {renderContent()}
          </div>
        </div>

        {/* Sidebar overlay on mobile */}
        {sidebarOpen && (
          <div
            onClick={() => setSidebarOpen(false)}
            style={{
              position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)",
              zIndex: 99, display: "none",
            }}
            className="overlay"
          />
        )}
      </div>
    </>
  );
}