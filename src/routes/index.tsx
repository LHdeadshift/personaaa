import { createFileRoute } from "@tanstack/react-router";
import { Turntable } from "@/components/site/Turntable";
import { Reveal } from "@/components/site/Reveal";
import { CursorGlow, EasterEgg, ThemeToggle } from "@/components/site/Chrome";
import {
  About,
  Contact,
  Hobbies,
  QuoteAndNow,
  Skills,
  StatsBlock,
  Timeline,
  Work,
} from "@/components/site/Sections";
import { profile } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${profile.name} — Designer-Developer Portfolio` },
      {
        name: "description",
        content:
          "A one-page portfolio and live demo of modern web interaction design: a draggable 3D photo turntable, scroll-reveal sections, and playful motion.",
      },
      { property: "og:title", content: `${profile.name} — Designer-Developer Portfolio` },
      {
        property: "og:description",
        content:
          "Draggable 3D photo turntable, animated stats, hobby bento gallery, and a one-tap WhatsApp hello.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <CursorGlow />
      <EasterEgg />

      <header className="fixed inset-x-0 top-0 z-40 mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <button
          onClick={() => (window as unknown as { partyTime?: () => void }).partyTime?.()}
          className="font-display text-xl tracking-tight"
          aria-label="Logo"
        >
          {profile.name}
          <span className="text-primary">.</span>
        </button>
        <ThemeToggle />
      </header>

      {/* Hero */}
      <section className="relative mx-auto flex min-h-screen max-w-6xl flex-col justify-center gap-14 px-6 pb-16 pt-28 lg:flex-row lg:items-center lg:gap-16">
        <div className="order-2 flex-1 lg:order-1">
          <Reveal>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-primary">
              portfolio / live demo
            </p>
            <h1 className="mt-4 text-5xl font-semibold leading-[0.95] tracking-tight sm:text-7xl">
              {profile.name}
              <span className="text-gradient">.</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-muted-foreground">{profile.tagline}</p>
          </Reveal>
          <div className="mt-12">
            <StatsBlock />
          </div>
        </div>
        <div className="order-1 flex-1 lg:order-2">
          <Turntable />
        </div>
      </section>

      <About />
      <Work />
      <Skills />
      <Hobbies />
      <Timeline />
      <QuoteAndNow />
      <Contact />

      <footer className="border-t border-border py-10 text-center font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
        built as a demo · ↑↑↓↓←→←→ba
      </footer>
    </main>
  );
}
