// Code snippets for each primitive section in the gallery
// Each key matches the section label

export const codeSnippets: Record<string, string> = {
  "Navigation & Controls": `// Navigation arrows & media controls
<div className="flex items-center gap-3">
  {["←", "→", "‹", "⏸", "□", "★", "›"].map((icon, i) => (
    <button key={i} className="w-9 h-9 rounded-full border border-tc-border
      bg-tc-card-bg flex items-center justify-center
      hover:border-[#E8722A] hover:text-[#E8722A]
      hover:shadow-[0_0_10px_rgba(232,114,42,0.3)]
      active:scale-95 transition-all duration-200">
      {icon}
    </button>
  ))}
</div>

// Progress bar (clickable)
<div className="h-2 rounded-full bg-tc-input-bg border border-tc-border
  overflow-hidden cursor-pointer" onClick={handleProgressClick}>
  <div className="h-full rounded-full bg-[#E8722A] transition-all duration-300"
    style={{ width: \`\${progressWidth}%\` }} />
</div>`,

  "Inputs & Search": `// Search input
<div className="relative">
  <input
    type="text"
    placeholder="Search prospects..."
    className="w-full pl-4 pr-10 py-2.5 rounded-lg border border-tc-border
      bg-tc-input-bg text-tc-text placeholder-tc-text-faint text-sm
      focus:border-[#E8722A] focus:shadow-[0_0_12px_rgba(232,114,42,0.2)]
      transition-all outline-none"
  />
  <svg className="absolute right-3 top-1/2 -translate-y-1/2 text-tc-text-faint"
    width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2">
    <circle cx="11" cy="11" r="8" />
    <path d="M21 21l-4.35-4.35" />
  </svg>
</div>`,

  "Buttons & Toggles": `// Primary CTA
<button className="px-6 py-2.5 rounded-lg bg-[#E8722A] text-black
  font-semibold text-sm transition-all hover:brightness-110
  hover:shadow-[0_4px_20px_rgba(232,114,42,0.4)] active:scale-95">
  Deploy Tiger
</button>

// Secondary button
<button className="px-6 py-2.5 rounded-lg border border-tc-border
  text-tc-text font-semibold text-sm transition-all
  hover:border-[#E8722A] hover:text-[#E8722A]
  hover:shadow-[0_0_12px_rgba(232,114,42,0.2)] active:scale-95">
  Read Manifesto
</button>

// Toggle switch
function Toggle({ defaultOn = false }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div onClick={() => setOn(!on)}
      className={\`w-[52px] h-[28px] rounded-[14px] relative cursor-pointer
        transition-all duration-300 \${on
          ? "bg-[#E8722A] shadow-[0_0_16px_rgba(232,114,42,0.5)]"
          : "bg-[#2a2a2a] border border-tc-border"}\`}>
      <div className={\`w-[22px] h-[22px] rounded-full bg-white absolute
        top-[2px] shadow-[0_2px_4px_rgba(0,0,0,0.3)] transition-all
        duration-300 \${on ? "left-[26px]" : "left-[3px]"}\`} />
    </div>
  );
}`,

  "Progress Rings & Gauges": `// Animated SVG progress ring
function ProgressRing({ value, label, color = "#E8722A" }) {
  const circumference = 2 * Math.PI * 52;
  const offset = circumference * (1 - value / 100);
  const [animated, setAnimated] = useState(false);

  // Animate on scroll into view
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) setAnimated(true);
    }, { threshold: 0.5 });
    obs.observe(containerRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <svg className="w-[120px] h-[120px] -rotate-90" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r="52" fill="none"
        stroke="rgba(255,255,255,0.05)" strokeWidth="8" />
      <circle cx="60" cy="60" r="52" fill="none"
        stroke={color} strokeWidth="8" strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={animated ? offset : circumference}
        style={{ transition: "stroke-dashoffset 1s ease" }} />
    </svg>
  );
}`,

  "Vertical Sliders": `// Equalizer-style vertical sliders
<div className="flex items-end justify-center gap-3 h-[120px]">
  {sliderHeights.map((h, i) => (
    <div key={i} className="w-3 rounded-full bg-[#E8722A]
      transition-all duration-500 ease-out cursor-pointer
      hover:bg-[#ff8c3a] hover:shadow-[0_0_10px_rgba(232,114,42,0.4)]"
      style={{ height: \`\${h}%\` }}
      onClick={() => randomize()} />
  ))}
</div>`,

  "Calendar": `// Calendar widget with month navigation
const [month, setMonth] = useState(5); // June
const [year, setYear] = useState(2026);
const [selectedDay, setSelectedDay] = useState(23);

const daysInMonth = new Date(year, month + 1, 0).getDate();
const firstDay = new Date(year, month, 1).getDay();

<div className="grid grid-cols-7 gap-1">
  {Array.from({ length: firstDay }).map((_, i) => <div key={i} />)}
  {Array.from({ length: daysInMonth }).map((_, i) => (
    <div key={i} onClick={() => setSelectedDay(i + 1)}
      className={\`w-8 h-8 rounded-full flex items-center justify-center
        text-xs cursor-pointer transition-all \${selectedDay === i + 1
          ? "bg-[#E8722A] text-black font-bold shadow-[0_0_12px_rgba(232,114,42,0.4)]"
          : "hover:bg-[rgba(232,114,42,0.15)] text-tc-text-muted"}\`}>
      {i + 1}
    </div>
  ))}
</div>`,

  "Information Cards": `// Info card with accent border
<div className="border border-tc-border bg-tc-card-bg rounded-xl p-6
  transition-all duration-300 hover:border-[rgba(232,114,42,0.3)]
  hover:shadow-[0_4px_24px_rgba(232,114,42,0.08)]">
  <div className="flex items-center gap-2 mb-3">
    <span className="text-[#E8722A] font-bold text-sm"
      style={{ fontFamily: "'Bebas Neue'" }}>Information</span>
  </div>
  <p className="text-sm text-tc-text-muted leading-relaxed">
    Tiger Claw keeps the thread clear so serious
    conversations do not die from delay.
  </p>
</div>`,

  "Statistics / Bar Chart": `// Animated bar chart
const [barHeights, setBarHeights] = useState([40, 65, 85, 100, 70, 50, 30]);
const labels = ["S", "M", "T", "W", "T", "F", "S"];

<div className="flex items-end justify-between gap-2 h-[140px]">
  {barHeights.map((h, i) => (
    <div key={i} className="flex-1 flex flex-col items-center gap-2">
      <div className="w-full rounded-t-md bg-[#E8722A]
        transition-all duration-500 ease-out"
        style={{ height: \`\${h}%\` }} />
      <span className="text-xs text-tc-text-faint">{labels[i]}</span>
    </div>
  ))}
</div>

// Randomize button
<button onClick={() => setBarHeights(prev =>
  prev.map(() => 20 + Math.random() * 80)
)}>Randomize</button>`,

  "Line Chart / Area Graph": `// SVG area chart with gradient fill
<svg viewBox="0 0 600 200" className="w-full h-[200px]">
  <defs>
    <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stopColor="#E8722A" stopOpacity="0.3" />
      <stop offset="100%" stopColor="#E8722A" stopOpacity="0" />
    </linearGradient>
  </defs>
  <path d="M0,180 C100,160 150,80 200,100 C250,120 300,40 350,60
    C400,80 450,20 500,50 C550,80 600,30 600,30 L600,200 L0,200 Z"
    fill="url(#areaGrad)" />
  <path d="M0,180 C100,160 150,80 200,100 C250,120 300,40 350,60
    C400,80 450,20 500,50 C550,80 600,30 600,30"
    fill="none" stroke="#E8722A" strokeWidth="2.5" />
</svg>`,

  "Dropdowns & Selects": `// Dropdown with animation
function Dropdown({ items }) {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  return (
    <div className="relative">
      <button onClick={() => setOpen(!open)}
        className={\`w-full flex items-center justify-between px-4 py-2.5
          rounded-lg border transition-all \${open
            ? "border-[#E8722A] shadow-[0_0_12px_rgba(232,114,42,0.2)]"
            : "border-tc-border hover:border-[rgba(232,114,42,0.4)]"}\`}>
        <span>{selected || "Select menu"}</span>
        <ChevronDown className={\`transition-transform \${open ? "rotate-180" : ""}\`} />
      </button>
      {open && (
        <div className="absolute top-full left-0 right-0 mt-1 rounded-lg
          bg-tc-card-bg border border-tc-border shadow-xl z-10">
          {items.map(item => (
            <div key={item} onClick={() => { setSelected(item); setOpen(false); }}
              className="px-4 py-2.5 text-sm hover:bg-[rgba(232,114,42,0.1)]
                hover:text-[#E8722A] cursor-pointer">{item}</div>
          ))}
        </div>
      )}
    </div>
  );
}`,

  "Checkboxes & Lists": `// Animated checkbox
function CheckItem({ label, defaultChecked = false }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center gap-3 cursor-pointer"
      onClick={() => setChecked(!checked)}>
      <div className={\`w-[22px] h-[22px] rounded-[4px] border-2
        flex items-center justify-center transition-all \${checked
          ? "bg-[#E8722A] border-[#E8722A] shadow-[0_0_10px_rgba(232,114,42,0.4)]"
          : "border-tc-text-faint bg-transparent"}\`}>
        <svg className={\`transition-all \${checked
          ? "opacity-100 scale-100" : "opacity-0 scale-50"}\`}
          width="14" height="14" viewBox="0 0 24 24"
          fill="none" stroke="white" strokeWidth="3">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
      <span className="text-sm text-tc-text-muted">{label}</span>
    </div>
  );
}`,

  "Modals & Dialogs": `// Modal with backdrop blur and scale-in animation
{modalOpen && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center"
    onClick={() => setModalOpen(false)}>
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"
      style={{ animation: 'fadeIn 200ms ease-out' }} />
    <div className="relative w-full max-w-md mx-4 bg-tc-surface
      border border-tc-border rounded-2xl shadow-2xl p-8"
      style={{ animation: 'scaleIn 250ms cubic-bezier(0.23,1,0.32,1)' }}
      onClick={(e) => e.stopPropagation()}>
      <h3 className="text-lg font-bold">Tiger Brain Active</h3>
      <p className="text-sm text-tc-text-muted mt-4">
        Tiger Brain remembers every prospect detail...
      </p>
      <button onClick={() => setModalOpen(false)}
        className="w-full py-2.5 mt-6 rounded-lg bg-[#E8722A]
          text-black font-semibold">Got it</button>
    </div>
  </div>
)}

// CSS keyframes needed:
@keyframes fadeIn { from { opacity: 0 } to { opacity: 1 } }
@keyframes scaleIn { from { opacity:0; transform:scale(0.95) }
  to { opacity:1; transform:scale(1) } }`,

  "Toast Notifications": `// Using Sonner for toast notifications
import { toast } from "sonner";

// Success
toast.success('Prospect added to pipeline', {
  description: 'John Smith is now in your active queue.'
});

// Error
toast.error('Connection failed', {
  description: 'Could not reach the Tiger Brain server.'
});

// Warning
toast.warning('Rate limit approaching', {
  description: 'You have 5 API calls remaining this minute.'
});

// Loading → Success pattern
const id = toast.loading('Syncing prospect data...');
setTimeout(() => {
  toast.success('Sync complete', { id, description: '47 prospects updated.' });
}, 2500);`,

  "Loading Spinners": `// Ring spinner
<div className="w-10 h-10 border-3 border-tc-border border-t-[#E8722A]
  rounded-full animate-spin" />

// Pulse dots
<div className="flex gap-2">
  {[0, 1, 2].map(i => (
    <div key={i} className="w-3 h-3 rounded-full bg-[#E8722A]"
      style={{ animation: \`pulse 1.2s ease-in-out \${i * 0.2}s infinite\` }} />
  ))}
</div>

// Bar equalizer
<div className="flex items-end gap-1 h-8">
  {[0, 1, 2, 3].map(i => (
    <div key={i} className="w-1.5 bg-[#E8722A] rounded-full"
      style={{ animation: \`barBounce 0.8s ease-in-out \${i * 0.1}s infinite alternate\` }} />
  ))}
</div>

// Button loading state
<button disabled className="px-6 py-2.5 rounded-lg bg-[#E8722A]
  text-black font-semibold opacity-80 flex items-center gap-2">
  <div className="w-4 h-4 border-2 border-black/30 border-t-black
    rounded-full animate-spin" />
  Processing...
</button>`,

  "Text Effects": `// Glitch text effect (CSS)
.glitch {
  position: relative;
  font-family: 'Bebas Neue', sans-serif;
  color: #E8722A;
}
.glitch::before, .glitch::after {
  content: attr(data-text);
  position: absolute; left: 0; top: 0;
}
.glitch::before {
  animation: glitch-1 2s infinite linear alternate-reverse;
  clip-path: polygon(0 0, 100% 0, 100% 35%, 0 35%);
  color: #ff3e3e;
}
.glitch::after {
  animation: glitch-2 2s infinite linear alternate-reverse;
  clip-path: polygon(0 65%, 100% 65%, 100% 100%, 0 100%);
  color: #3effff;
}

// Decrypt/scramble reveal (JS)
function runDecrypt(target: string) {
  const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?0123456789";
  let iteration = 0;
  const interval = setInterval(() => {
    setText(target.split("").map((char, i) =>
      i < iteration ? char : chars[Math.floor(Math.random() * chars.length)]
    ).join(""));
    iteration += 0.5;
    if (iteration > target.length) clearInterval(interval);
  }, 40);
}`,

  "Electric & Glow Borders": `// Electric border (hover activated)
<div className="relative rounded-xl border border-tc-border p-6
  overflow-hidden group">
  <div className="absolute inset-0 rounded-xl opacity-0
    group-hover:opacity-100 transition-opacity duration-300"
    style={{
      background: 'conic-gradient(from 0deg, #E8722A, #ff3e3e, #E8722A)',
      padding: '2px',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude'
    }} />
  <span>Electric Border</span>
</div>

// Star border (rainbow glow)
<div className="rounded-xl p-6 border border-transparent
  hover:shadow-[0_0_20px_rgba(232,114,42,0.3),0_0_40px_rgba(232,114,42,0.1)]
  transition-all duration-500">
  <span>Star Border</span>
</div>`,

  "Animated Counter": `// Animated counter with easing
function AnimatedCounter({ target = 2847 }) {
  const [value, setValue] = useState(0);

  const animate = () => {
    const duration = 2000;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setValue(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  return (
    <div>
      <span className="text-5xl font-bold text-[#E8722A]"
        style={{ fontFamily: "'Bebas Neue'" }}>
        {value.toLocaleString()}
      </span>
      <button onClick={animate}>Animate Counter</button>
    </div>
  );
}`,

  "Dock": `// macOS-style dock with hover magnification
<div className="flex items-end justify-center gap-2 py-3 px-4
  rounded-2xl border border-tc-border bg-tc-card-bg/80 backdrop-blur-md
  group">
  {["Home", "Search", "Prospects", "Pipeline", "Messages", "Settings"]
    .map((item, i) => (
    <button key={i} className="w-10 h-10 rounded-xl border border-tc-border
      bg-tc-card-bg flex items-center justify-center
      transition-all duration-200 ease-out
      hover:scale-150 hover:-translate-y-2 hover:bg-[rgba(232,114,42,0.15)]
      hover:border-[#E8722A] hover:shadow-[0_4px_16px_rgba(232,114,42,0.3)]">
      <Icon name={item} />
    </button>
  ))}
</div>`,

  "Particle Background": `// Canvas particle field
function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      r: Math.random() * 2 + 1,
    }));

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        // Wrap around edges
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(232, 114, 42, 0.6)';
        ctx.fill();
      });
      requestAnimationFrame(animate);
    }
    animate();
  }, []);

  return <canvas ref={canvasRef} className="w-full h-[200px]" />;
}`,

  "Stepper": `// Multi-step stepper
function Stepper({ steps = 4, current = 1 }) {
  return (
    <div className="flex items-center justify-center gap-0">
      {Array.from({ length: steps }).map((_, i) => (
        <Fragment key={i}>
          <div className={\`w-10 h-10 rounded-full flex items-center
            justify-center font-bold text-sm transition-all \${
              i + 1 <= current
                ? "bg-[#E8722A] text-black shadow-[0_0_16px_rgba(232,114,42,0.4)]"
                : "border-2 border-tc-border text-tc-text-faint"
            }\`}>
            {i + 1}
          </div>
          {i < steps - 1 && (
            <div className={\`w-12 h-0.5 \${
              i + 1 < current ? "bg-[#E8722A]" : "bg-tc-border"
            }\`} />
          )}
        </Fragment>
      ))}
    </div>
  );
}`,

  "Status & Navigation": `// Status chip
<span className="inline-flex items-center gap-2 px-4 py-2 rounded-full
  border border-[#4ADE80]/30 bg-[#4ADE80]/10">
  <span className="w-2 h-2 rounded-full bg-[#4ADE80] animate-pulse" />
  <span className="text-xs font-mono text-[#4ADE80] tracking-wider">
    SYSTEM OPERATIONAL
  </span>
</span>

// Floating nav pill
<div className="inline-flex items-center gap-1 px-2 py-1.5 rounded-full
  border border-tc-border bg-tc-card-bg/80 backdrop-blur-md">
  {["Problem", "Pricing", "Get started"].map(item => (
    <button key={item} className="px-4 py-1.5 rounded-full text-xs
      font-medium text-tc-text-muted transition-all
      hover:bg-[rgba(232,114,42,0.1)] hover:text-[#E8722A]">
      {item}
    </button>
  ))}
</div>`,

  "Sidebar Icon Rail": `// Vertical icon rail with hover glow
<div className="flex flex-col gap-2 p-2 rounded-xl border border-tc-border
  bg-tc-card-bg">
  {icons.map((icon, i) => (
    <button key={i} className="w-10 h-10 rounded-lg flex items-center
      justify-center text-tc-text-faint transition-all duration-200
      hover:bg-[rgba(232,114,42,0.1)] hover:text-[#E8722A]
      hover:shadow-[0_0_12px_rgba(232,114,42,0.2)]">
      <Icon name={icon} size={18} />
    </button>
  ))}
</div>`,

  "Video Primitives": `// YouTube video card primitives — 1920×1080
// Intro Card (after hook, 5 sec)
<div className="rounded-lg overflow-hidden border border-tc-border">
  <img
    src="/assets/video-intro-card.png"
    alt="Intro Card — Before/After AI"
    className="w-full h-auto"
  />
</div>

// Middle Card (mid-roll, 3 sec)
<div className="rounded-lg overflow-hidden border border-tc-border">
  <img
    src="/assets/video-middle-card.png"
    alt="Middle Card — Take Action Today"
    className="w-full h-auto"
  />
</div>

// CTA Card (end screen, 5-8 sec)
<div className="rounded-lg overflow-hidden border border-tc-border">
  <img
    src="/assets/video-cta-card.png"
    alt="CTA Card — Free Beginner Guide"
    className="w-full h-auto"
  />
</div>`,
};
