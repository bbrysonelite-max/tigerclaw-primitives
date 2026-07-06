import { useEffect, useRef, useState, useCallback } from "react";
import { useTheme } from "@/contexts/ThemeContext";
import { toast } from "sonner";
import { CopyCodeButton } from "@/components/CopyCodeButton";
import { codeSnippets } from "@/lib/codeSnippets";

// ─── Section wrapper with fade-in on scroll ─────────────────────────────────
const SECTION_LABELS = [
  "Navigation & Controls",
  "Inputs & Search",
  "Buttons & Toggles",
  "Progress Rings & Gauges",
  "Vertical Sliders",
  "Calendar",
  "Information Cards",
  "Statistics / Bar Chart",
  "Line Chart / Area Graph",
  "Dropdowns & Selects",
  "Checkboxes & Lists",
  "Modals & Dialogs",
  "Toast Notifications",
  "Loading Spinners",
  "Text Effects",
  "Electric & Glow Borders",
  "Animated Counter",
  "Dock",
  "Particle Background",
  "Stepper",
  "Status & Navigation",
  "Sidebar Icon Rail",
];

function slugify(label: string) {
  return label.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

function Section({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);
  const snippet = codeSnippets[label];

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.1, rootMargin: "-40px" });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} id={slugify(label)} className={`mb-16 scroll-mt-24 transition-all duration-600 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-5"} ${className}`}>
      <div className="flex items-center gap-3 mb-6">
        <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-tc-text-faint">{label}</span>
        <span className="h-px flex-1 bg-tc-border" />
        {snippet && <CopyCodeButton code={snippet} />}
      </div>
      {children}
    </section>
  );
}

// ─── Sidebar Table of Contents ──────────────────────────────────────────────
function TableOfContents() {
  const [activeId, setActiveId] = useState("");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveId(entry.target.id);
        }
      });
    };

    SECTION_LABELS.forEach((label) => {
      const el = document.getElementById(slugify(label));
      if (el) {
        const obs = new IntersectionObserver(handleIntersect, { threshold: 0.2, rootMargin: "-80px 0px -60% 0px" });
        obs.observe(el);
        observers.push(obs);
      }
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  const handleClick = (label: string) => {
    const el = document.getElementById(slugify(label));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`fixed top-20 z-40 transition-all duration-300 ${collapsed ? "left-0" : "left-4"} hidden xl:block`}>
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-2 w-6 h-6 rounded-full border border-tc-border bg-tc-card-bg flex items-center justify-center text-tc-text-faint hover:text-[#E8722A] hover:border-[#E8722A] transition-all z-10"
        title={collapsed ? "Expand TOC" : "Collapse TOC"}
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
          {collapsed ? <path d="M9 18l6-6-6-6" /> : <path d="M15 18l-6-6 6-6" />}
        </svg>
      </button>

      {!collapsed && (
        <div className="w-48 max-h-[calc(100vh-120px)] overflow-y-auto rounded-xl border border-tc-border bg-tc-card-bg/90 backdrop-blur-md p-3 shadow-xl" style={{ animation: 'scaleIn 200ms cubic-bezier(0.23,1,0.32,1)' }}>
          <span className="block text-[9px] font-mono tracking-[0.2em] uppercase text-tc-text-faint mb-2 px-2">Contents</span>
          <ul className="space-y-0.5">
            {SECTION_LABELS.map((label) => {
              const slug = slugify(label);
              const isActive = activeId === slug;
              return (
                <li key={slug}>
                  <button
                    onClick={() => handleClick(label)}
                    className={`w-full text-left px-2 py-1.5 rounded-md text-[11px] font-mono transition-all duration-200 truncate ${
                      isActive
                        ? "bg-[rgba(232,114,42,0.12)] text-[#E8722A] border-l-2 border-[#E8722A] pl-3"
                        : "text-tc-text-faint hover:text-tc-text hover:bg-tc-card-hover"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {collapsed && (
        <div className="w-2 h-32 rounded-full bg-tc-border/50 ml-1 mt-4 relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full rounded-full bg-[#E8722A] transition-all duration-300"
            style={{ height: `${(SECTION_LABELS.indexOf(SECTION_LABELS.find(l => slugify(l) === activeId) || SECTION_LABELS[0]) / (SECTION_LABELS.length - 1)) * 100}%`, minHeight: '8px' }}
          />
        </div>
      )}
    </nav>
  );
}

// ─── Mobile Drawer TOC ──────────────────────────────────────────────────────
function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveId(entry.target.id);
      });
    };
    SECTION_LABELS.forEach((label) => {
      const el = document.getElementById(slugify(label));
      if (el) {
        const obs = new IntersectionObserver(handleIntersect, { threshold: 0.2, rootMargin: "-80px 0px -60% 0px" });
        obs.observe(el);
        observers.push(obs);
      }
    });
    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleClick = (label: string) => {
    const el = document.getElementById(slugify(label));
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 xl:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />
      {/* Drawer */}
      <div
        className={`fixed top-0 left-0 z-[70] h-full w-72 bg-tc-card-bg border-r border-tc-border shadow-2xl transition-transform duration-300 xl:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)' }}
      >
        <div className="p-4 border-b border-tc-border flex items-center justify-between">
          <span className="text-[10px] font-mono tracking-[0.2em] uppercase text-tc-text-faint">Contents</span>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full border border-tc-border flex items-center justify-center text-tc-text-faint hover:text-[#E8722A] hover:border-[#E8722A] transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>
        </div>
        <nav className="p-3 overflow-y-auto max-h-[calc(100vh-65px)]">
          <ul className="space-y-1">
            {SECTION_LABELS.map((label) => {
              const slug = slugify(label);
              const isActive = activeId === slug;
              return (
                <li key={slug}>
                  <button
                    onClick={() => handleClick(label)}
                    className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-mono transition-all duration-200 ${
                      isActive
                        ? "bg-[rgba(232,114,42,0.12)] text-[#E8722A] border-l-2 border-[#E8722A] pl-4"
                        : "text-tc-text-faint hover:text-tc-text hover:bg-tc-card-hover"
                    }`}
                  >
                    {label}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </>
  );
}

// ─── Card wrapper ────────────────────────────────────────────────────────────
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`border border-tc-border bg-tc-card-bg rounded-xl transition-all duration-300 hover:border-[rgba(232,114,42,0.3)] hover:bg-tc-card-hover hover:shadow-[0_4px_24px_rgba(232,114,42,0.08)] ${className}`}>
      {children}
    </div>
  );
}

// ─── Toggle Switch ───────────────────────────────────────────────────────────
function Toggle({ defaultOn = false }: { defaultOn?: boolean }) {
  const [on, setOn] = useState(defaultOn);
  const { theme } = useTheme();
  const offBg = theme === "dark" ? "bg-[#2a2a2a]" : "bg-[#d4d4d4]";
  return (
    <div
      onClick={() => setOn(!on)}
      className={`w-[52px] h-[28px] rounded-[14px] relative cursor-pointer transition-all duration-300 ${on ? "bg-[#E8722A] border-[#E8722A] shadow-[0_0_16px_rgba(232,114,42,0.5),0_0_32px_rgba(232,114,42,0.25)]" : `${offBg} border border-tc-border`}`}
    >
      <div className={`w-[22px] h-[22px] rounded-full bg-white absolute top-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all duration-300 ${on ? "left-[26px]" : "left-[3px]"}`} />
    </div>
  );
}

// ─── Progress Ring ───────────────────────────────────────────────────────────
function ProgressRing({ value, label, sublabel, color = "#E8722A" }: { value: number; label: string; sublabel: string; color?: string }) {
  const ref = useRef<SVGCircleElement>(null);
  const [animated, setAnimated] = useState(false);
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - value / 100);
  const { theme } = useTheme();

  useEffect(() => {
    const el = ref.current?.closest(".ring-container");
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const trackColor = theme === "dark" ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.06)";

  return (
    <Card className="p-6 flex flex-col items-center gap-3">
      <div className="relative w-[120px] h-[120px] ring-container">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
          <circle cx="60" cy="60" r="52" fill="none" stroke={trackColor} strokeWidth="8" />
          <circle
            ref={ref}
            cx="60" cy="60" r="52" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={animated ? offset : circumference}
            style={{ transition: "stroke-dashoffset 1s cubic-bezier(0.4,0,0.2,1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-2xl font-bold" style={{ color: color === "#4ADE80" ? "#4ADE80" : "var(--tc-text)" }}>{label}</span>
          <span className="text-xs text-tc-text-faint font-mono">{sublabel}</span>
        </div>
      </div>
      <span className="text-xs text-tc-text-faint font-mono">{value}% ring{color === "#4ADE80" ? " (green)" : ""}</span>
    </Card>
  );
}

// ─── Checkbox Item ───────────────────────────────────────────────────────────
function CheckItem({ label, defaultChecked = false }: { label: string; defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center gap-3 cursor-pointer group" onClick={() => setChecked(!checked)}>
      <div className={`w-[22px] h-[22px] rounded-[4px] border-2 flex items-center justify-center transition-all duration-200 ${checked ? "bg-[#E8722A] border-[#E8722A] shadow-[0_0_10px_rgba(232,114,42,0.4)]" : "border-tc-text-faint bg-transparent"}`}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3" className={`transition-all duration-200 ${checked ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}>
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-sm text-tc-text-muted group-hover:text-tc-text transition-colors">{label}</span>
    </div>
  );
}

// ─── Dropdown ────────────────────────────────────────────────────────────────
function Dropdown({ items }: { items: string[] }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, []);

  const menuBg = theme === "dark" ? "bg-[#1a1a1a]" : "bg-white";

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-[14px] py-[10px] rounded-lg border transition-all duration-200 ${open ? "border-[#E8722A] shadow-[0_0_12px_rgba(232,114,42,0.2)]" : "border-tc-border bg-tc-card-bg hover:border-[rgba(232,114,42,0.4)]"}`}
      >
        <span className="text-sm text-tc-text-muted">{selected || "Select menu"}</span>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={`text-tc-text-faint transition-transform duration-200 ${open ? "rotate-180" : ""}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>
      {open && (
        <div className={`absolute top-full left-0 right-0 mt-1 rounded-lg ${menuBg} border border-tc-border shadow-xl overflow-hidden z-10`}>
          {items.map((item) => (
            <div key={item} onClick={() => { setSelected(item); setOpen(false); }} className="px-4 py-2.5 text-sm text-tc-text-muted hover:bg-[rgba(232,114,42,0.1)] hover:text-[#E8722A] cursor-pointer transition-colors">{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Theme Toggle Button ─────────────────────────────────────────────────────
function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button
      onClick={toggleTheme}
      className="w-9 h-9 rounded-full border border-tc-border bg-tc-card-bg flex items-center justify-center cursor-pointer transition-all duration-200 text-tc-text-muted hover:border-[#E8722A] hover:text-[#E8722A] hover:shadow-[0_0_10px_rgba(232,114,42,0.3)] active:scale-95"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5" /><line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" /><line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" /><line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" /><line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" /></svg>
      ) : (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" /></svg>
      )}
    </button>
  );
}

// ─── Main Gallery ────────────────────────────────────────────────────────────
export default function Home() {
  const { theme } = useTheme();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [progressWidth, setProgressWidth] = useState(65);
  const [modalOpen, setModalOpen] = useState(false);
  const [confirmModalOpen, setConfirmModalOpen] = useState(false);
  const [spinnerDemo, setSpinnerDemo] = useState(false);
  const [counterValue, setCounterValue] = useState(0);
  const [counterTarget] = useState(2847);
  const [stepperStep, setStepperStep] = useState(1);
  const [decryptText, setDecryptText] = useState("TIGER CLAW");
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [sliderHeights, setSliderHeights] = useState([85, 60, 95, 40, 70, 55, 80, 30]);
  const [barHeights, setBarHeights] = useState([40, 65, 85, 100, 70, 50, 30]);

  // Calendar state
  const [calMonth, setCalMonth] = useState(5);
  const [calYear, setCalYear] = useState(2026);
  const [selectedDay, setSelectedDay] = useState<number | null>(23);

  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  const changeMonth = (dir: number) => {
    let m = calMonth + dir;
    let y = calYear;
    if (m > 11) { m = 0; y++; }
    if (m < 0) { m = 11; y--; }
    setCalMonth(m);
    setCalYear(y);
    setSelectedDay(null);
  };

  const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();
  const getFirstDay = (month: number, year: number) => new Date(year, month, 1).getDay();

  const randomizeBars = useCallback(() => {
    setBarHeights(barHeights.map(() => 20 + Math.random() * 80));
  }, [barHeights]);

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setProgressWidth(((e.clientX - rect.left) / rect.width) * 100);
  };

  const dayLabels = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
  const barLabels = ["S", "M", "T", "W", "T", "F", "S"];

  // Decrypt text effect
  const runDecrypt = useCallback(() => {
    if (isDecrypting) return;
    setIsDecrypting(true);
    const target = "TIGER CLAW";
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";
    let iteration = 0;
    const interval = setInterval(() => {
      setDecryptText(target.split("").map((char, i) => i < iteration ? char : chars[Math.floor(Math.random() * chars.length)]).join(""));
      iteration += 0.5;
      if (iteration > target.length) { clearInterval(interval); setDecryptText(target); setIsDecrypting(false); }
    }, 40);
  }, [isDecrypting]);

  // Counter animation
  const animateCounter = useCallback(() => {
    setCounterValue(0);
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCounterValue(Math.floor(eased * counterTarget));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [counterTarget]);

  // Theme-aware grid lines for SVG charts
  const gridLineColor = theme === "dark" ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.06)";
  const sliderTrackBg = theme === "dark" ? "#1a1a1a" : "#e5e5e5";
  const navPillBg = theme === "dark" ? "bg-[#1a1a1a]/80" : "bg-white/80";

  return (
    <div className="min-h-screen bg-tc-base text-tc-text transition-colors duration-300">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-tc-base/95 backdrop-blur-md border-b border-tc-border transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Hamburger button - visible below xl */}
            <button
              onClick={() => setMobileDrawerOpen(true)}
              className="xl:hidden w-9 h-9 rounded-full border border-tc-border bg-tc-card-bg flex items-center justify-center text-tc-text-muted hover:border-[#E8722A] hover:text-[#E8722A] transition-all active:scale-95"
              title="Open navigation"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18" /></svg>
            </button>
            <div className="w-8 h-8 rounded-full bg-[#E8722A] flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="2.5"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
            </div>
            <span className="font-bold text-lg tracking-tight text-tc-text">TIGER CLAW</span>
            <span className="text-tc-text-faint text-sm hidden sm:inline font-mono">/ primitives</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggleButton />
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-tc-border bg-tc-card-bg">
              <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
              <span className="text-xs tracking-wide text-tc-text-muted font-mono">INTERACTIVE</span>
            </span>
          </div>
        </div>
      </header>

      {/* Sticky sidebar TOC (xl+) */}
      <TableOfContents />

      {/* Mobile drawer TOC (below xl) */}
      <MobileDrawer open={mobileDrawerOpen} onClose={() => setMobileDrawerOpen(false)} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-24 xl:ml-56">
        {/* Title */}
        <div className="mb-16">
          <h1 className="text-6xl sm:text-7xl lg:text-8xl leading-[0.9]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            UI <span className="text-[#E8722A]">PRIMITIVES</span>
          </h1>
          <p className="text-tc-text-muted mt-4 max-w-2xl text-lg">
            Interactive component gallery for the Tiger Claw design system. Dark, high-contrast, neo-brutalist. Hover, click, and interact with every element.
          </p>
        </div>

        {/* Navigation & Controls */}
        <Section label="Navigation & Controls">
          <Card className="p-6">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              {[
                <><path d="M19 12H5M12 19l-7-7 7-7" /></>,
                <><path d="M5 12h14M12 5l7 7-7 7" /></>,
                <><path d="M15 18l-6-6 6-6" /></>,
                <><rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" /></>,
                <><rect x="4" y="4" width="16" height="16" /></>,
                <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
                <><path d="M9 18l6-6-6-6" /></>,
              ].map((icon, i) => (
                <button key={i} className="w-9 h-9 rounded-full border border-tc-border bg-tc-card-bg flex items-center justify-center cursor-pointer transition-all duration-200 text-tc-text-muted hover:border-[#E8722A] hover:text-[#E8722A] hover:shadow-[0_0_10px_rgba(232,114,42,0.3)] active:scale-95">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
                </button>
              ))}
            </div>
            {/* Progress bar */}
            <div className="mb-6 h-2 rounded-full bg-tc-input-bg border border-tc-border overflow-hidden cursor-pointer" onClick={handleProgressClick}>
              <div className="h-full rounded-full bg-[#E8722A] transition-all duration-300" style={{ width: `${progressWidth}%` }} />
            </div>
            {/* Icon buttons */}
            <div className="flex flex-wrap gap-3">
              {[
                <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>,
                <><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></>,
                <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
                <><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" /></>,
                <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
                <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
              ].map((icon, i) => (
                <button key={i} className="w-11 h-11 rounded-[10px] border border-tc-border bg-tc-card-bg flex items-center justify-center cursor-pointer transition-all duration-200 text-tc-text-muted hover:border-[rgba(232,114,42,0.5)] hover:text-[#E8722A] hover:bg-[rgba(232,114,42,0.08)] hover:shadow-[0_0_12px_rgba(232,114,42,0.2)] hover:-translate-y-px active:scale-95">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
                </button>
              ))}
            </div>
          </Card>
        </Section>

        {/* Inputs & Search */}
        <Section label="Inputs & Search">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <label className="text-xs text-tc-text-faint font-mono uppercase tracking-wider mb-2 block">Search</label>
              <div className="relative">
                <input type="text" placeholder="Search prospects..." className="w-full px-4 py-3 pr-10 rounded-lg bg-tc-input-bg border border-tc-border text-tc-text placeholder-tc-text-faint text-sm focus:outline-none focus:border-[#E8722A] focus:shadow-[0_0_12px_rgba(232,114,42,0.2)] transition-all" />
                <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-tc-text-faint" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></svg>
              </div>
            </Card>
            <Card className="p-6">
              <label className="text-xs text-tc-text-faint font-mono uppercase tracking-wider mb-2 block">Text Field</label>
              <input type="text" placeholder="Enter prospect name..." className="w-full px-4 py-3 rounded-lg bg-tc-input-bg border border-tc-border text-tc-text placeholder-tc-text-faint text-sm focus:outline-none focus:border-[#E8722A] focus:shadow-[0_0_12px_rgba(232,114,42,0.2)] transition-all" />
              <p className="text-xs text-tc-text-faint mt-2 font-mono">Adipiscing elit, sed diam</p>
            </Card>
          </div>
        </Section>

        {/* Buttons & Toggles */}
        <Section label="Buttons & Toggles">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6 flex flex-col items-center gap-3">
              <button className="px-8 py-3.5 rounded-full font-semibold text-black bg-[#E8722A] transition-all duration-300 hover:brightness-110 hover:scale-[1.04] hover:shadow-[0_4px_30px_rgba(232,114,42,0.5)] active:scale-95">Deploy Tiger</button>
              <span className="text-xs text-tc-text-faint font-mono">Primary CTA</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-3">
              <button className="px-8 py-3.5 rounded-lg border border-tc-border bg-tc-card-bg hover:bg-tc-card-hover text-tc-text-muted font-semibold transition-all duration-300 hover:scale-[1.03] active:scale-95">Read Manifesto</button>
              <span className="text-xs text-tc-text-faint font-mono">Secondary</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-3">
              <button className="px-8 py-3.5 rounded-lg bg-tc-input-bg border border-tc-border text-tc-text-faint font-semibold cursor-not-allowed opacity-50" disabled>Button Off</button>
              <span className="text-xs text-tc-text-faint font-mono">Disabled</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-tc-text-muted">Button On</span>
                <Toggle defaultOn={true} />
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Toggle (click me)</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-4">
              <div className="flex items-center gap-4">
                <span className="text-sm text-tc-text-muted">Button Off</span>
                <Toggle defaultOn={false} />
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Toggle (click me)</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-3">
              <div className="flex gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-tc-card-bg border border-tc-border text-tc-text-muted cursor-pointer hover:border-[#E8722A] hover:text-[#E8722A] transition-all">Lorem</span>
                <span className="px-3 py-1.5 rounded-full text-xs font-mono bg-[rgba(232,114,42,0.15)] border border-[rgba(232,114,42,0.4)] text-[#E8722A] cursor-pointer hover:bg-[rgba(232,114,42,0.25)] transition-all">Dolor sit</span>
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Tag pills</span>
            </Card>
          </div>
        </Section>

        {/* Progress Rings */}
        <Section label="Progress Rings & Gauges">
          <div className="grid sm:grid-cols-3 gap-4">
            <ProgressRing value={60} label="150" sublabel="Prospects" />
            <ProgressRing value={90} label="90" sublabel="Score" />
            <ProgressRing value={100} label="100↑" sublabel="Complete" color="#4ADE80" />
          </div>
        </Section>

        {/* Vertical Sliders */}
        <Section label="Vertical Sliders">
          <Card className="p-6">
            <div className="flex items-end justify-center gap-4 h-[180px]">
              {sliderHeights.map((h, i) => (
                <div key={i} onClick={() => { const n = [...sliderHeights]; n[i] = 20 + Math.random() * 80; setSliderHeights(n); }} className="w-3 rounded-md border border-tc-border relative cursor-pointer overflow-hidden h-full group" style={{ background: sliderTrackBg }}>
                  <div className="absolute bottom-0 left-0 right-0 rounded-md transition-all duration-400 group-hover:shadow-[0_0_12px_rgba(232,114,42,0.5)_inset]" style={{ height: `${h}%`, background: "linear-gradient(to top, #E8722A, #ff9a5c)" }} />
                </div>
              ))}
            </div>
            <p className="text-center text-xs text-tc-text-faint font-mono mt-4">Click any slider to randomize</p>
          </Card>
        </Section>

        {/* Calendar */}
        <Section label="Calendar">
          <Card className="p-6 max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <button onClick={() => changeMonth(-1)} className="w-9 h-9 rounded-full border border-tc-border bg-tc-card-bg flex items-center justify-center text-tc-text-muted hover:border-[#E8722A] hover:text-[#E8722A] transition-all active:scale-95">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <span className="text-[#E8722A] font-semibold text-sm">{months[calMonth]}</span>
              <button onClick={() => changeMonth(1)} className="w-9 h-9 rounded-full border border-tc-border bg-tc-card-bg flex items-center justify-center text-tc-text-muted hover:border-[#E8722A] hover:text-[#E8722A] transition-all active:scale-95">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 mb-2">
              {dayLabels.map(d => <span key={d} className="text-center text-[10px] text-tc-text-faint font-mono">{d}</span>)}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {Array.from({ length: getFirstDay(calMonth, calYear) }).map((_, i) => <div key={`e${i}`} />)}
              {Array.from({ length: getDaysInMonth(calMonth, calYear) }).map((_, i) => {
                const d = i + 1;
                const today = new Date();
                const isToday = today.getMonth() === calMonth && today.getFullYear() === calYear && today.getDate() === d;
                const isSelected = d === selectedDay;
                return (
                  <div key={d} onClick={() => setSelectedDay(d)} className={`w-7 h-7 rounded-md flex items-center justify-center text-xs cursor-pointer transition-all duration-150 ${isSelected ? "bg-[#E8722A] text-black font-semibold" : isToday ? "border border-[#E8722A] text-[#E8722A]" : "text-tc-text-muted hover:bg-[rgba(232,114,42,0.15)] hover:text-[#E8722A]"}`}>
                    {d}
                  </div>
                );
              })}
            </div>
          </Card>
        </Section>

        {/* Information Cards */}
        <Section label="Information Cards">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-[#E8722A]" />
                <span className="text-[#E8722A] font-semibold text-sm">Information</span>
              </div>
              <p className="text-tc-text-muted text-sm leading-relaxed">Tiger Claw keeps the thread clear so serious conversations do not die from delay.</p>
            </Card>
            <Card className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-1 h-5 rounded-full bg-[#E8722A]" />
                <span className="text-[#E8722A] font-semibold text-sm">Ipsum</span>
              </div>
              <div className="flex items-baseline gap-2 mb-2">
                <span className="text-3xl font-bold text-tc-text" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>100↑</span>
                <span className="text-xs text-tc-text-faint font-mono">Prospects</span>
              </div>
              <p className="text-tc-text-muted text-xs leading-relaxed">Consectetuer adipiscing elit, sed diam.</p>
            </Card>
            <Card className="p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-40 h-40 rounded-full blur-[80px] opacity-20 bg-[#E8722A]" />
              <p className="relative font-semibold text-lg mb-2 text-tc-text">Tiger Brain</p>
              <p className="relative text-tc-text-muted text-sm">Remembers every prospect detail across all conversations.</p>
            </Card>
          </div>
        </Section>

        {/* Bar Chart */}
        <Section label="Statistics / Bar Chart">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="font-semibold text-tc-text">Statistics</span>
                <button className="px-3 py-1 text-xs text-tc-text-muted rounded-lg border border-tc-border bg-tc-card-bg flex items-center gap-1 hover:border-[rgba(232,114,42,0.4)] transition-all">
                  Weekly <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6" /></svg>
                </button>
              </div>
              <button onClick={randomizeBars} className="text-xs text-[#E8722A] font-mono hover:underline cursor-pointer">Randomize</button>
            </div>
            <div className="h-1.5 rounded-full bg-tc-input-bg mb-6 overflow-hidden">
              <div className="h-full rounded-full bg-[#E8722A] transition-all duration-1000" style={{ width: "72%" }} />
            </div>
            <div className="flex items-end gap-3" style={{ height: "160px" }}>
              {barHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end h-full">
                  <div className="w-full rounded-t-md transition-all duration-600" style={{ height: `${h}%`, background: `rgba(232,114,42,${0.5 + (h / 200)})` }} />
                  <span className="text-[10px] text-tc-text-faint font-mono mt-2">{barLabels[i]}</span>
                </div>
              ))}
            </div>
          </Card>
        </Section>

        {/* Line Chart */}
        <Section label="Line Chart / Area Graph">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <span className="font-semibold text-tc-text">Consectetuer</span>
              <span className="px-3 py-1 rounded-lg border border-tc-border bg-tc-card-bg text-xs text-tc-text-muted font-mono">4500</span>
            </div>
            <div className="w-full h-[140px]">
              <svg viewBox="0 0 400 140" className="w-full h-full" preserveAspectRatio="none">
                <line x1="0" y1="35" x2="400" y2="35" stroke={gridLineColor} strokeWidth="1" />
                <line x1="0" y1="70" x2="400" y2="70" stroke={gridLineColor} strokeWidth="1" />
                <line x1="0" y1="105" x2="400" y2="105" stroke={gridLineColor} strokeWidth="1" />
                <defs>
                  <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#E8722A" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#E8722A" stopOpacity="0" />
                  </linearGradient>
                </defs>
                <path d="M0,120 C30,110 60,100 100,80 C140,60 160,90 200,70 C240,50 280,30 320,45 C360,60 380,40 400,35 L400,140 L0,140 Z" fill="url(#orangeGrad)" opacity="0.3" />
                <path d="M0,120 C30,110 60,100 100,80 C140,60 160,90 200,70 C240,50 280,30 320,45 C360,60 380,40 400,35" fill="none" stroke="#E8722A" strokeWidth="2.5" strokeLinecap="round" />
                <circle cx="100" cy="80" r="4" fill="#E8722A" />
                <circle cx="200" cy="70" r="4" fill="#E8722A" />
                <circle cx="320" cy="45" r="4" fill="#E8722A" />
                <circle cx="400" cy="35" r="4" fill="#E8722A" />
              </svg>
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-tc-text-faint font-mono">Dolor sit</span>
              <span className="px-3 py-1 rounded-full text-xs font-mono bg-[rgba(232,114,42,0.15)] border border-[rgba(232,114,42,0.4)] text-[#E8722A]">Lorem ipsum</span>
            </div>
          </Card>
        </Section>

        {/* Dropdowns */}
        <Section label="Dropdowns & Selects">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6">
              <label className="text-xs text-tc-text-faint font-mono uppercase tracking-wider mb-2 block">Select Menu</label>
              <Dropdown items={["Follow-up queue", "Active prospects", "Archived threads"]} />
            </Card>
            <Card className="p-6">
              <label className="text-xs text-tc-text-faint font-mono uppercase tracking-wider mb-2 block">Select Menu</label>
              <Dropdown items={["Daily digest", "Weekly summary", "Monthly report"]} />
            </Card>
          </div>
        </Section>

        {/* Checkboxes */}
        <Section label="Checkboxes & Lists">
          <Card className="p-6 max-w-md">
            <div className="space-y-3">
              <CheckItem label="Lorem ipsum" defaultChecked={true} />
              <CheckItem label="Sed nonummy" />
              <CheckItem label="Duis autem vel" />
            </div>
            <div className="mt-6 pt-4 border-t border-tc-border">
              <button className="px-6 py-2.5 rounded-lg bg-[#E8722A] text-black font-semibold text-sm transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(232,114,42,0.4)] active:scale-95">See details</button>
            </div>
          </Card>
        </Section>

        {/* Modals & Dialogs */}
        <Section label="Modals & Dialogs">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6 flex flex-col items-center gap-4">
              <button onClick={() => setModalOpen(true)} className="px-6 py-2.5 rounded-lg bg-[#E8722A] text-black font-semibold text-sm transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(232,114,42,0.4)] active:scale-95">Open Info Modal</button>
              <span className="text-xs text-tc-text-faint font-mono">Information dialog</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-4">
              <button onClick={() => setConfirmModalOpen(true)} className="px-6 py-2.5 rounded-lg border border-[#E8722A] text-[#E8722A] font-semibold text-sm transition-all hover:bg-[rgba(232,114,42,0.1)] hover:shadow-[0_4px_20px_rgba(232,114,42,0.2)] active:scale-95">Open Confirm Modal</button>
              <span className="text-xs text-tc-text-faint font-mono">Confirmation dialog</span>
            </Card>
          </div>
          {modalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setModalOpen(false)}>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 200ms ease-out' }} />
              <div className="relative w-full max-w-md mx-4 bg-tc-surface border border-tc-border rounded-2xl shadow-2xl shadow-black/40 p-8" style={{ animation: 'scaleIn 250ms cubic-bezier(0.23,1,0.32,1)' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[rgba(232,114,42,0.15)] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="16" x2="12" y2="12" /><line x1="12" y1="8" x2="12.01" y2="8" /></svg></div>
                  <h3 className="text-lg font-bold text-tc-text" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}>Tiger Brain Active</h3>
                </div>
                <p className="text-sm text-tc-text-muted leading-relaxed mb-6">Tiger Brain remembers every prospect detail across all conversations. Your thread context is always preserved — no repetition, no lost signals.</p>
                <button onClick={() => setModalOpen(false)} className="w-full py-2.5 rounded-lg bg-[#E8722A] text-black font-semibold text-sm transition-all hover:brightness-110 active:scale-[0.98]">Got it</button>
                <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 w-8 h-8 rounded-full border border-tc-border flex items-center justify-center text-tc-text-faint hover:text-tc-text hover:border-[#E8722A] transition-all"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg></button>
              </div>
            </div>
          )}
          {confirmModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center" onClick={() => setConfirmModalOpen(false)}>
              <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" style={{ animation: 'fadeIn 200ms ease-out' }} />
              <div className="relative w-full max-w-sm mx-4 bg-tc-surface border border-tc-border rounded-2xl shadow-2xl shadow-black/40 p-8" style={{ animation: 'scaleIn 250ms cubic-bezier(0.23,1,0.32,1)' }} onClick={(e) => e.stopPropagation()}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[rgba(239,68,68,0.15)] flex items-center justify-center"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="2"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg></div>
                  <h3 className="text-lg font-bold text-tc-text" style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '0.02em' }}>Confirm Action</h3>
                </div>
                <p className="text-sm text-tc-text-muted leading-relaxed mb-6">Are you sure you want to remove this prospect from the active pipeline? This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setConfirmModalOpen(false)} className="flex-1 py-2.5 rounded-lg border border-tc-border text-tc-text-muted font-semibold text-sm transition-all hover:border-tc-text-faint active:scale-[0.98]">Cancel</button>
                  <button onClick={() => { setConfirmModalOpen(false); toast.error('Prospect removed from pipeline'); }} className="flex-1 py-2.5 rounded-lg bg-[#EF4444] text-white font-semibold text-sm transition-all hover:brightness-110 active:scale-[0.98]">Remove</button>
                </div>
              </div>
            </div>
          )}
        </Section>

        {/* Toast Notifications */}
        <Section label="Toast Notifications">
          <Card className="p-6">
            <div className="flex flex-wrap gap-3">
              <button onClick={() => toast.success('Prospect added to pipeline', { description: 'John Smith is now in your active queue.' })} className="px-4 py-2.5 rounded-lg bg-[#4ADE80]/15 border border-[#4ADE80]/30 text-[#4ADE80] font-semibold text-sm transition-all hover:bg-[#4ADE80]/25 hover:shadow-[0_0_16px_rgba(74,222,128,0.2)] active:scale-95">Success Toast</button>
              <button onClick={() => toast.error('Connection failed', { description: 'Could not reach the Tiger Brain server.' })} className="px-4 py-2.5 rounded-lg bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] font-semibold text-sm transition-all hover:bg-[#EF4444]/25 hover:shadow-[0_0_16px_rgba(239,68,68,0.2)] active:scale-95">Error Toast</button>
              <button onClick={() => toast.warning('Rate limit approaching', { description: 'You have 5 API calls remaining this minute.' })} className="px-4 py-2.5 rounded-lg bg-[#F59E0B]/15 border border-[#F59E0B]/30 text-[#F59E0B] font-semibold text-sm transition-all hover:bg-[#F59E0B]/25 hover:shadow-[0_0_16px_rgba(245,158,11,0.2)] active:scale-95">Warning Toast</button>
              <button onClick={() => toast.info('Tiger Claw v2.4 available', { description: 'New features include multi-thread scheduling.' })} className="px-4 py-2.5 rounded-lg bg-[#3B82F6]/15 border border-[#3B82F6]/30 text-[#3B82F6] font-semibold text-sm transition-all hover:bg-[#3B82F6]/25 hover:shadow-[0_0_16px_rgba(59,130,246,0.2)] active:scale-95">Info Toast</button>
              <button onClick={() => { const id = toast.loading('Syncing prospect data...'); setTimeout(() => toast.success('Sync complete', { id, description: '47 prospects updated.' }), 2500); }} className="px-4 py-2.5 rounded-lg bg-[#E8722A]/15 border border-[#E8722A]/30 text-[#E8722A] font-semibold text-sm transition-all hover:bg-[#E8722A]/25 hover:shadow-[0_0_16px_rgba(232,114,42,0.2)] active:scale-95">Loading → Success</button>
            </div>
            <p className="text-xs text-tc-text-faint font-mono mt-4">Click any button to trigger a toast notification</p>
          </Card>
        </Section>

        {/* Loading Spinners */}
        <Section label="Loading Spinners">
          <div className="grid sm:grid-cols-3 gap-4">
            <Card className="p-8 flex flex-col items-center gap-4">
              <div className="w-12 h-12 rounded-full border-[3px] border-tc-border border-t-[#E8722A] animate-spin" />
              <span className="text-xs text-tc-text-faint font-mono">Ring spinner</span>
            </Card>
            <Card className="p-8 flex flex-col items-center gap-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#E8722A] animate-[pulse_1.2s_ease-in-out_infinite]" />
                <div className="w-3 h-3 rounded-full bg-[#E8722A] animate-[pulse_1.2s_ease-in-out_0.2s_infinite]" />
                <div className="w-3 h-3 rounded-full bg-[#E8722A] animate-[pulse_1.2s_ease-in-out_0.4s_infinite]" />
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Pulse dots</span>
            </Card>
            <Card className="p-8 flex flex-col items-center gap-4">
              <div className="flex items-end gap-1 h-8">
                <div className="w-1.5 h-full bg-[#E8722A] rounded-full animate-[barBounce_1s_ease-in-out_infinite]" />
                <div className="w-1.5 h-3/4 bg-[#E8722A] rounded-full animate-[barBounce_1s_ease-in-out_0.15s_infinite]" />
                <div className="w-1.5 h-full bg-[#E8722A] rounded-full animate-[barBounce_1s_ease-in-out_0.3s_infinite]" />
                <div className="w-1.5 h-3/5 bg-[#E8722A] rounded-full animate-[barBounce_1s_ease-in-out_0.45s_infinite]" />
                <div className="w-1.5 h-4/5 bg-[#E8722A] rounded-full animate-[barBounce_1s_ease-in-out_0.6s_infinite]" />
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Bar equalizer</span>
            </Card>
            <Card className="p-8 flex flex-col items-center gap-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-2 border-tc-border" />
                <div className="absolute w-3 h-3 rounded-full bg-[#E8722A] shadow-[0_0_10px_rgba(232,114,42,0.6)] animate-[orbit_1.5s_linear_infinite]" style={{ top: '0', left: '50%', transformOrigin: '50% 24px', marginLeft: '-6px' }} />
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Orbit spinner</span>
            </Card>
            <Card className="p-8 flex flex-col items-center gap-4">
              <div className="relative w-14 h-14">
                <svg className="w-full h-full animate-[spin_2s_linear_infinite]" viewBox="0 0 56 56" fill="none">
                  <circle cx="28" cy="28" r="24" stroke="var(--tc-border)" strokeWidth="4" />
                  <path d="M28 4 A24 24 0 0 1 52 28" stroke="#E8722A" strokeWidth="4" strokeLinecap="round" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="2"><path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" /></svg>
                </div>
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Branded spinner</span>
            </Card>
            <Card className="p-8 flex flex-col items-center gap-4">
              <button onClick={() => { setSpinnerDemo(true); setTimeout(() => setSpinnerDemo(false), 3000); }} disabled={spinnerDemo} className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all active:scale-95 flex items-center gap-2 ${spinnerDemo ? 'bg-[#E8722A]/60 cursor-wait' : 'bg-[#E8722A] hover:brightness-110 hover:shadow-[0_4px_20px_rgba(232,114,42,0.4)]'} text-black`}>
                {spinnerDemo && <div className="w-4 h-4 rounded-full border-2 border-black/30 border-t-black animate-spin" />}
                {spinnerDemo ? 'Processing...' : 'Click to load'}
              </button>
              <span className="text-xs text-tc-text-faint font-mono">Button loading state</span>
            </Card>
          </div>
        </Section>

        {/* Glitch / Decrypt Text */}
        <Section label="Text Effects">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-8 flex flex-col items-center gap-4">
              <div className="relative">
                <h2 className="text-4xl font-bold text-[#E8722A]" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>TIGER CLAW</h2>
                <h2 className="absolute inset-0 text-4xl font-bold text-[#4ADE80] opacity-70" style={{ fontFamily: "'Bebas Neue', sans-serif", animation: 'glitch1 2s infinite linear' }}>TIGER CLAW</h2>
                <h2 className="absolute inset-0 text-4xl font-bold text-[#3B82F6] opacity-70" style={{ fontFamily: "'Bebas Neue', sans-serif", animation: 'glitch2 2s infinite linear' }}>TIGER CLAW</h2>
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Glitch text effect</span>
            </Card>
            <Card className="p-8 flex flex-col items-center gap-4">
              <button onClick={runDecrypt} className="group">
                <h2 className="text-4xl font-bold text-[#E8722A] font-mono tracking-wider" style={{ fontFamily: "'IBM Plex Mono', monospace" }}>{decryptText}</h2>
              </button>
              <span className="text-xs text-tc-text-faint font-mono">Click to decrypt — scramble reveal</span>
            </Card>
          </div>
        </Section>

        {/* Electric Border / Star Border */}
        <Section label="Electric & Glow Borders">
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="relative group rounded-xl overflow-hidden">
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#E8722A] via-[#F59E0B] to-[#E8722A] opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-[electricPulse_2s_ease-in-out_infinite]" style={{ padding: '2px' }}>
                <div className="w-full h-full rounded-[10px] bg-tc-surface" />
              </div>
              <Card className="relative p-8 flex flex-col items-center gap-3 group-hover:border-transparent transition-all">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#E8722A" strokeWidth="1.5" className="group-hover:drop-shadow-[0_0_8px_rgba(232,114,42,0.6)] transition-all"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" /></svg>
                <span className="text-sm font-semibold text-tc-text">Electric Border</span>
                <span className="text-xs text-tc-text-faint font-mono">Hover to activate</span>
              </Card>
            </div>
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-xl bg-gradient-to-r from-[#E8722A] via-[#4ADE80] to-[#3B82F6] opacity-0 group-hover:opacity-75 blur-sm transition-all duration-500" />
              <Card className="relative p-8 flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4ADE80" strokeWidth="1.5" className="group-hover:drop-shadow-[0_0_8px_rgba(74,222,128,0.6)] transition-all"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
                <span className="text-sm font-semibold text-tc-text">Star Border</span>
                <span className="text-xs text-tc-text-faint font-mono">Rainbow glow on hover</span>
              </Card>
            </div>
            <div className="relative group">
              <div className="absolute -inset-[1px] rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: 'conic-gradient(from 0deg, #E8722A, #F59E0B, #4ADE80, #3B82F6, #8B5CF6, #E8722A)', filter: 'blur(4px)' }} />
              <Card className="relative p-8 flex flex-col items-center gap-3">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" strokeWidth="1.5" className="group-hover:drop-shadow-[0_0_8px_rgba(139,92,246,0.6)] transition-all"><circle cx="12" cy="12" r="10" /><circle cx="12" cy="12" r="4" /><line x1="12" y1="2" x2="12" y2="6" /><line x1="12" y1="18" x2="12" y2="22" /><line x1="2" y1="12" x2="6" y2="12" /><line x1="18" y1="12" x2="22" y2="12" /></svg>
                <span className="text-sm font-semibold text-tc-text">Conic Border</span>
                <span className="text-xs text-tc-text-faint font-mono">Rotating gradient glow</span>
              </Card>
            </div>
          </div>
        </Section>

        {/* Animated Counter */}
        <Section label="Animated Counter">
          <Card className="p-8">
            <div className="flex flex-col sm:flex-row items-center gap-8">
              <div className="flex flex-col items-center gap-2">
                <span className="text-6xl font-bold text-[#E8722A]" style={{ fontFamily: "'Bebas Neue', sans-serif", animation: counterValue === counterTarget ? 'counterPulse 0.5s ease-out' : 'none' }}>{counterValue.toLocaleString()}</span>
                <span className="text-sm text-tc-text-muted font-mono">Prospects Reached</span>
              </div>
              <div className="flex flex-col gap-3">
                <button onClick={animateCounter} className="px-6 py-2.5 rounded-lg bg-[#E8722A] text-black font-semibold text-sm transition-all hover:brightness-110 hover:shadow-[0_4px_20px_rgba(232,114,42,0.4)] active:scale-95">Animate Counter</button>
                <button onClick={() => setCounterValue(0)} className="px-6 py-2.5 rounded-lg border border-tc-border text-tc-text-muted font-semibold text-sm transition-all hover:border-[#E8722A] active:scale-95">Reset</button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Dock Component */}
        <Section label="Dock">
          <Card className="p-8 flex flex-col items-center gap-4">
            <div className="flex items-end gap-1 px-4 py-3 rounded-2xl bg-tc-card-bg border border-tc-border shadow-2xl shadow-black/20">
              {[
                { icon: <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>, label: 'Home' },
                { icon: <><circle cx="11" cy="11" r="8" /><path d="M21 21l-4.35-4.35" /></>, label: 'Search' },
                { icon: <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>, label: 'Prospects' },
                { icon: <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></>, label: 'Pipeline' },
                { icon: <><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></>, label: 'Messages' },
                { icon: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>, label: 'Settings' },
              ].map((item, i) => (
                <button key={i} className="group relative w-12 h-12 rounded-xl bg-tc-card-bg border border-tc-border flex items-center justify-center text-tc-text-muted transition-all duration-200 hover:scale-125 hover:bg-[rgba(232,114,42,0.1)] hover:border-[#E8722A] hover:text-[#E8722A] hover:shadow-[0_8px_24px_rgba(232,114,42,0.3)] hover:-translate-y-2">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">{item.icon}</svg>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded-md bg-tc-surface border border-tc-border text-[10px] font-mono text-tc-text-muted opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">{item.label}</span>
                </button>
              ))}
            </div>
            <span className="text-xs text-tc-text-faint font-mono">macOS-style dock — hover to magnify</span>
          </Card>
        </Section>

        {/* Particle Background */}
        <Section label="Particle Background">
          <Card className="p-0 overflow-hidden relative h-[200px]">
            <div className="absolute inset-0 overflow-hidden">
              {Array.from({ length: 30 }).map((_, i) => (
                <div key={i} className="absolute w-1 h-1 rounded-full bg-[#E8722A]" style={{ left: `${Math.random() * 100}%`, top: `${60 + Math.random() * 40}%`, opacity: 0.3 + Math.random() * 0.7, animation: `particleFloat ${3 + Math.random() * 4}s ease-in-out ${Math.random() * 3}s infinite` }} />
              ))}
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={`g-${i}`} className="absolute w-1.5 h-1.5 rounded-full bg-[#4ADE80]" style={{ left: `${Math.random() * 100}%`, top: `${60 + Math.random() * 40}%`, opacity: 0.2 + Math.random() * 0.5, animation: `particleFloat ${4 + Math.random() * 5}s ease-in-out ${Math.random() * 4}s infinite` }} />
              ))}
            </div>
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
              <span className="text-2xl font-bold text-tc-text" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>Particle Field</span>
              <span className="text-xs text-tc-text-faint font-mono">Floating particles — use as section background</span>
            </div>
          </Card>
        </Section>

        {/* Stepper */}
        <Section label="Stepper">
          <Card className="p-8">
            <div className="flex items-center justify-center gap-0 mb-8">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center">
                  <button onClick={() => setStepperStep(step)} className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step <= stepperStep ? 'bg-[#E8722A] text-black shadow-[0_0_16px_rgba(232,114,42,0.4)]' : 'bg-tc-card-bg border border-tc-border text-tc-text-faint hover:border-[#E8722A]'}`}>{step < stepperStep ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12" /></svg> : step}</button>
                  {step < 4 && <div className={`w-12 sm:w-20 h-0.5 transition-all duration-500 ${step < stepperStep ? 'bg-[#E8722A]' : 'bg-tc-border'}`} />}
                </div>
              ))}
            </div>
            <div className="text-center">
              <p className="text-sm text-tc-text-muted font-mono">
                {stepperStep === 1 && 'Step 1: Connect your calendar'}
                {stepperStep === 2 && 'Step 2: Import prospect list'}
                {stepperStep === 3 && 'Step 3: Configure Tiger Brain'}
                {stepperStep === 4 && 'Step 4: Launch outreach'}
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <button onClick={() => setStepperStep(Math.max(1, stepperStep - 1))} disabled={stepperStep === 1} className="px-4 py-2 rounded-lg border border-tc-border text-tc-text-muted text-sm font-semibold transition-all hover:border-[#E8722A] disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">Back</button>
                <button onClick={() => setStepperStep(Math.min(4, stepperStep + 1))} disabled={stepperStep === 4} className="px-4 py-2 rounded-lg bg-[#E8722A] text-black text-sm font-semibold transition-all hover:brightness-110 disabled:opacity-30 disabled:cursor-not-allowed active:scale-95">Next</button>
              </div>
            </div>
          </Card>
        </Section>

        {/* Status & Navigation */}
        <Section label="Status & Navigation">
          <div className="grid sm:grid-cols-2 gap-4">
            <Card className="p-6 flex flex-col items-center gap-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-tc-border bg-tc-card-bg">
                <span className="w-2.5 h-2.5 rounded-full bg-[#4ADE80] animate-pulse" />
                <span className="text-xs tracking-wide text-tc-text-muted font-mono">SYSTEM OPERATIONAL</span>
              </div>
              <span className="text-xs text-tc-text-faint font-mono">Status chip</span>
            </Card>
            <Card className="p-6 flex flex-col items-center gap-4">
              <nav className={`flex items-center gap-1 px-2 py-2 rounded-full ${navPillBg} backdrop-blur-xl border border-tc-border shadow-2xl shadow-black/20`}>
                <span className="px-3 py-1.5 text-tc-text-muted text-xs font-semibold rounded-full cursor-pointer hover:bg-tc-card-hover transition-all">Problem</span>
                <span className="px-3 py-1.5 text-tc-text-muted text-xs font-semibold rounded-full bg-tc-card-bg cursor-pointer hover:bg-tc-card-hover transition-all">Pricing</span>
                <span className="px-3 py-1.5 text-black text-xs font-semibold rounded-full bg-[#E8722A] cursor-pointer hover:brightness-110 transition-all">Get started</span>
              </nav>
              <span className="text-xs text-tc-text-faint font-mono">Floating nav pill</span>
            </Card>
          </div>
        </Section>

        {/* Sidebar Icon Rail */}
        <Section label="Sidebar Icon Rail">
          <Card className="p-6 flex gap-6">
            <div className="flex flex-col gap-2 p-2 rounded-xl bg-tc-card-bg border border-tc-border">
              {[
                <><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></>,
                <><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
                <><rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></>,
                <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" /></>,
              ].map((icon, i) => (
                <button key={i} className="w-10 h-10 rounded-lg border border-tc-border bg-tc-card-bg flex items-center justify-center cursor-pointer transition-all duration-200 text-tc-text-muted hover:border-[rgba(232,114,42,0.5)] hover:text-[#E8722A] hover:bg-[rgba(232,114,42,0.08)] hover:shadow-[0_0_12px_rgba(232,114,42,0.2)] hover:-translate-y-px active:scale-95">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">{icon}</svg>
                </button>
              ))}
            </div>
            <div className="flex-1 flex items-center justify-center">
              <p className="text-tc-text-faint text-sm font-mono text-center">Vertical icon rail — hover to light up</p>
            </div>
          </Card>
        </Section>
      </main>

      {/* Footer */}
      <footer className="border-t border-tc-border bg-tc-ink py-8 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-6 text-center text-tc-text-faint text-sm font-mono">
          Tiger Claw UI Primitives · Mariah Marketing LLC
        </div>
      </footer>
    </div>
  );
}
