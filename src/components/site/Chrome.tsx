import { useEffect, useRef, useState } from "react";

export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let tx = x;
    let ty = y;
    let raf = 0;
    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const tick = () => {
      x += (tx - x) * 0.045;
      y += (ty - y) * 0.045;
      el.style.transform = `translate3d(${x - 300}px, ${y - 300}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div
        ref={ref}
        className="h-[600px] w-[600px] rounded-full blur-[120px]"
        style={{ background: "var(--pink-glow)", opacity: 0.35 }}
      />
      <div
        className="absolute right-[-10%] top-[-10%] h-[450px] w-[450px] rounded-full blur-[140px]"
        style={{ background: "var(--pink-cloud)", opacity: 0.25, animation: "float-slow 14s ease-in-out infinite" }}
      />
    </div>
  );
}

export function ThemeToggle() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    document.documentElement.classList.toggle("light", light);
  }, [light]);
  return (
    <button
      onClick={() => setLight((v) => !v)}
      aria-label="Toggle colour theme"
      className="soft-card rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest text-foreground transition-transform hover:-translate-y-0.5"
    >
      {light ? "dark" : "light"}
    </button>
  );
}

/** Konami code easter egg → confetti burst */
export function EasterEgg() {
  const [burst, setBurst] = useState(0);
  useEffect(() => {
    const seq = [
      "ArrowUp","ArrowUp","ArrowDown","ArrowDown",
      "ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a",
    ];
    let i = 0;
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === seq[i]?.toLowerCase()) {
        i++;
        if (i === seq.length) {
          i = 0;
          setBurst((b) => b + 1);
        }
      } else {
        i = e.key === seq[0] ? 1 : 0;
      }
    };
    window.addEventListener("keydown", onKey);
    (window as unknown as { partyTime?: () => void }).partyTime = () => setBurst((b) => b + 1);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!burst) return null;
  return (
    <div key={burst} className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
      {Array.from({ length: 60 }).map((_, i) => (
        <span
          key={i}
          className="absolute top-0 h-3 w-1.5 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            background: i % 3 === 0 ? "var(--primary)" : i % 3 === 1 ? "var(--foreground)" : "var(--muted-foreground)",
            ["--dx" as string]: `${(Math.random() - 0.5) * 240}px`,
            animation: `confetti-fall ${2 + Math.random() * 1.6}s cubic-bezier(.3,.7,.4,1) ${Math.random() * 0.6}s forwards`,
          }}
        />
      ))}
    </div>
  );
}
