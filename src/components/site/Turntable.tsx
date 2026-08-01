import { useEffect, useRef, useState } from "react";
import { turntableFrames } from "@/lib/site-data";

const AUTO_SPEED = 6; // degrees per second

export function Turntable() {
  const stageRef = useRef<HTMLDivElement>(null);
  const rigRef = useRef<HTMLDivElement>(null);
  const rotation = useRef(0);
  const velocity = useRef(0);
  const dragging = useRef(false);
  const lastX = useRef(0);
  const snapTo = useRef<number | null>(null);
  const [interacted, setInteracted] = useState(false);

  const frames = turntableFrames;
  const count = Math.max(frames.length, 1);
  const step = 360 / count;

  useEffect(() => {
    const rig = rigRef.current;
    if (!rig) return;
    const cells = Array.from(rig.children) as HTMLElement[];
    let raf = 0;
    let last = performance.now();
    const reduced =
      typeof matchMedia !== "undefined" && matchMedia("(prefers-reduced-motion: reduce)").matches;

    const paint = () => {
      const r = rotation.current;
      rig.style.transform = `rotateY(${r}deg)`;
      for (let i = 0; i < cells.length; i++) {
        // angle of this cell relative to viewer
        let a = ((i * step + r) % 360 + 360) % 360;
        if (a > 180) a -= 360;
        const facing = Math.max(0, Math.cos((a * Math.PI) / 180));
        cells[i].style.opacity = String(0.12 + Math.pow(facing, 3) * 0.88);
        cells[i].style.zIndex = String(Math.round(facing * 100));
      }
    };

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (!dragging.current) {
        if (snapTo.current !== null) {
          const diff = snapTo.current - rotation.current;
          if (Math.abs(diff) < 0.05) {
            rotation.current = snapTo.current;
            snapTo.current = null;
          } else {
            rotation.current += diff * Math.min(1, dt * 8);
          }
        } else if (Math.abs(velocity.current) > 1) {
          rotation.current += velocity.current * dt;
          velocity.current *= Math.pow(0.12, dt);
        } else if (!reduced) {
          rotation.current -= AUTO_SPEED * dt;
        }
      }
      paint();
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [step]);

  const onDown = (e: React.PointerEvent) => {
    dragging.current = true;
    snapTo.current = null;
    velocity.current = 0;
    lastX.current = e.clientX;
    setInteracted(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };
  const onMove = (e: React.PointerEvent) => {
    if (!dragging.current) return;
    const dx = e.clientX - lastX.current;
    lastX.current = e.clientX;
    rotation.current += dx * 0.45;
    velocity.current = dx * 18;
  };
  const onUp = () => {
    if (!dragging.current) return;
    dragging.current = false;
    // snap to nearest frame with easing
    const settle = rotation.current + velocity.current * 0.12;
    snapTo.current = Math.round(settle / step) * step;
    velocity.current = 0;
  };

  const radius = 210;

  return (
    <div className="relative select-none">
      <div
        ref={stageRef}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        className="relative mx-auto flex h-[380px] w-full max-w-[320px] cursor-grab touch-none items-center justify-center active:cursor-grabbing sm:h-[460px] sm:max-w-[380px]"
        style={{ perspective: "1200px" }}
        aria-label="360 degree photo turntable, drag to rotate"
        role="img"
      >
        <div
          ref={rigRef}
          className="relative h-full w-full"
          style={{ transformStyle: "preserve-3d" }}
        >
          {frames.map((src, i) => (
            <div
              key={i}
              className="absolute inset-0 overflow-hidden rounded-3xl border border-border bg-card shadow-[var(--shadow-soft)]"
              style={{
                transform: `rotateY(${i * step}deg) translateZ(${radius}px)`,
                backfaceVisibility: "hidden",
              }}
            >
              <img
                src={src}
                alt={`Turntable frame ${i + 1}`}
                draggable={false}
                loading={i === 0 ? "eager" : "lazy"}
                className="h-full w-full object-cover"
              />
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute -bottom-6 h-16 w-3/4 rounded-[100%] blur-2xl"
          style={{ background: "var(--gradient-accent)", opacity: 0.35 }}
        />
      </div>
      <p
        className="mt-6 text-center font-mono text-xs uppercase tracking-[0.28em] text-muted-foreground transition-opacity duration-700"
        style={{ opacity: interacted ? 0 : 1 }}
      >
        ← drag to rotate →
      </p>
    </div>
  );
}
