import { useEffect, useRef, useState } from "react";
import { Reveal, SectionHeading } from "./Reveal";
import { useCountUp, useReveal } from "@/hooks/use-reveal";
import {
  aboutParagraph,
  aboutPortrait,
  hobbies,
  nowItems,
  profile,
  skills,
  stats,
  timeline,
  workCards,
} from "@/lib/site-data";

/* ---------------- Stats ---------------- */
function Stat({ value, label, suffix, delay }: { value: number; label: string; suffix: string; delay: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>(0.4);
  const n = useCountUp(value, visible);
  return (
    <div ref={ref} className={`reveal ${visible ? "is-visible" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="font-display text-4xl leading-none text-gradient sm:text-5xl">
        {n.toLocaleString()}
        {suffix}
      </div>
      <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}

export function StatsBlock() {
  return (
    <div className="grid grid-cols-3 gap-6 sm:gap-8">
      {stats.map((s, i) => (
        <Stat key={s.label} value={s.value} label={s.label} suffix={s.suffix} delay={i * 120} />
      ))}
    </div>
  );
}

/* ---------------- About ---------------- */
export function About() {
  const tiltRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = tiltRef.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `perspective(900px) rotateY(${px * 12}deg) rotateX(${-py * 12}deg) translateZ(0)`;
    };
    const reset = () => {
      el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
    };
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerleave", reset);
    return () => {
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerleave", reset);
    };
  }, []);

  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="about" title="The short version" />
      <div className="grid items-center gap-12 md:grid-cols-[1fr_0.8fr]">
        <Reveal>
          <p className="text-lg leading-relaxed text-muted-foreground sm:text-xl">{aboutParagraph}</p>
        </Reveal>
        <Reveal delay={120}>
          <div
            ref={tiltRef}
            className="overflow-hidden rounded-3xl border border-border shadow-[var(--shadow-soft)] transition-transform duration-300 ease-out will-change-transform"
          >
            <img
              src={aboutPortrait}
              alt={`Portrait of ${profile.name}`}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ---------------- Work ---------------- */
export function Work() {
  return (
    <section id="work" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="work" title="What I actually do" />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {workCards.map((c, i) => (
          <Reveal key={c.title} delay={i * 100}>
            <article className="soft-card group h-full overflow-hidden rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-[var(--glow)]">
              {c.photo && (
                <img
                  src={c.photo}
                  alt={c.title}
                  loading="lazy"
                  className="aspect-[16/11] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
              <div className="p-6">
                <h3 className="text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.line}</p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Skills ---------------- */
export function Skills() {
  const { ref, visible } = useReveal<HTMLDivElement>(0.3);
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="skills" title="Where the hours went" />
      <div ref={ref} className="grid gap-5 sm:grid-cols-2">
        {skills.map((s, i) => (
          <div key={s.name}>
            <div className="flex items-baseline justify-between">
              <span className="text-sm font-medium">{s.name}</span>
              <span className="font-mono text-xs text-muted-foreground">{s.value}%</span>
            </div>
            <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full"
                style={{
                  background: "var(--gradient-accent)",
                  width: visible ? `${s.value}%` : "0%",
                  transition: `width 1.2s cubic-bezier(.22,1,.36,1) ${i * 100}ms`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Hobbies + lightbox ---------------- */
export function Hobbies() {
  const [open, setOpen] = useState<number | null>(null);
  const active = open === null ? null : hobbies[open];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <section id="hobbies" className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <SectionHeading eyebrow="off the clock" title="Hobbies, mildly obsessive" />
      <div className="grid auto-rows-[220px] grid-cols-2 gap-4 sm:auto-rows-[260px] lg:grid-cols-4">
        {hobbies.map((h, i) => (
          <Reveal
            key={h.name}
            delay={i * 90}
            className={i === 0 ? "col-span-2 row-span-2" : i === 3 ? "col-span-2" : ""}
          >
            <button
              onClick={() => setOpen(i)}
              className="group relative h-full w-full overflow-hidden rounded-3xl border border-border text-left"
            >
              <img
                src={h.cover}
                alt={h.name}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="scrim absolute inset-0" />
              <div className="absolute inset-x-0 bottom-0 p-5">
                <h3 className="text-lg font-semibold text-white">{h.name}</h3>
                <p className="max-h-0 overflow-hidden text-sm text-white/75 opacity-0 transition-all duration-300 group-hover:max-h-16 group-hover:opacity-100">
                  {h.line}
                </p>
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      {active && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.name}
        >
          <div className="w-full max-w-4xl" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-white">{active.name}</h3>
                <p className="text-sm text-white/60">{active.line}</p>
              </div>
              <button
                onClick={() => setOpen(null)}
                className="rounded-full border border-white/25 px-4 py-1.5 font-mono text-xs uppercase tracking-widest text-white"
              >
                close
              </button>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {active.gallery.map((src, gi) => (
                <img
                  key={gi}
                  src={src}
                  alt={`${active.name} ${gi + 1}`}
                  loading="lazy"
                  className="aspect-[3/4] w-full rounded-2xl object-cover"
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

/* ---------------- Timeline ---------------- */
export function Timeline() {
  return (
    <section className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeading eyebrow="journey" title="How I got here" />
      </div>
      <div className="no-scrollbar flex snap-x snap-mandatory gap-5 overflow-x-auto px-6 pb-4 lg:px-[max(1.5rem,calc((100vw-72rem)/2))]">
        {timeline.map((t, i) => (
          <Reveal key={t.year} delay={i * 80} className="shrink-0 snap-start">
            <article className="soft-card w-[240px] rounded-3xl p-5 sm:w-[280px]">
              <img
                src={t.photo}
                alt={t.title}
                loading="lazy"
                className="mb-4 h-14 w-14 rounded-2xl object-cover"
              />
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-primary">{t.year}</p>
              <h3 className="mt-2 font-semibold">{t.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{t.line}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ---------------- Quote + Now ---------------- */
export function QuoteAndNow() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <p className="font-display text-3xl leading-snug sm:text-5xl">“{profile.motto}”</p>
      </Reveal>
      <Reveal delay={120} className="mx-auto mt-16 max-w-2xl">
        <div className="soft-card overflow-hidden rounded-2xl">
          <div className="flex items-center gap-2 border-b border-border px-4 py-3">
            <span className="h-2.5 w-2.5 rounded-full bg-destructive" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground" />
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="ml-2 font-mono text-xs text-muted-foreground">~/now</span>
          </div>
          <ul className="space-y-2 p-5 font-mono text-sm">
            {nowItems.map((n) => (
              <li key={n} className="text-muted-foreground">
                <span className="text-primary">$</span> {n}
              </li>
            ))}
          </ul>
        </div>
      </Reveal>
    </section>
  );
}

/* ---------------- Reactions + Contact ---------------- */
const EMOJI = ["🔥", "👏", "🤯", "💜", "☕"];

export function Contact() {
  const [counts, setCounts] = useState<number[]>(() => [12, 8, 5, 21, 3]);
  const href = `https://wa.me/${profile.whatsapp}?text=${encodeURIComponent(profile.whatsappText)}`;

  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-32 pt-12 text-center">
      <Reveal>
        <h2 className="font-display text-4xl sm:text-6xl">Let's make something.</h2>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">
          One message, no forms, no funnels. I reply faster than I should.
        </p>
        <a
          href={href}
          target="_blank"
          rel="noreferrer"
          className="glow-ring mt-10 inline-flex items-center gap-2 rounded-full px-8 py-4 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-1"
          style={{ background: "var(--gradient-accent)" }}
        >
          Message me on WhatsApp
        </a>
      </Reveal>

      <Reveal delay={140} className="mt-16">
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-muted-foreground">
          leave a reaction
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          {EMOJI.map((e, i) => (
            <button
              key={e}
              onClick={() =>
                setCounts((c) => c.map((v, idx) => (idx === i ? v + 1 : v)))
              }
              className="soft-card rounded-full px-4 py-2 text-sm transition-transform hover:-translate-y-1 active:scale-95"
            >
              <span className="mr-2">{e}</span>
              <span className="font-mono text-xs text-muted-foreground">{counts[i]}</span>
            </button>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
