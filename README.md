# Aura Showcase

Build a personal one-page website that doubles as a live demo of modern web/AI interaction design. Tone: confident, minimal, a little playful. Dark base theme with one accent color (I'll specify, default electric violet). Smooth scroll, scroll-reveal on every section, no layout shift.

1. Hero — 3D rotating photo rig (the centerpiece)

Full-viewport hero. Center-stage: a 360°-style photo turntable built from 20 sequential photos of the person (front, 3/4, side, back, angled up/down) behave like a product-shot spinner: drag left/right or auto-rotate slowly, snapping between frames with easing so it feels like a real 3D object, not a slideshow.

Fallback: if fewer than 20 photos are supplied, interpolate with a CSS 3D perspective/rotateY card-flip between however many are given, evenly spaced across 360°.

Small "drag to rotate" hint that fades after first interaction.

[PHOTO SLOT: 20 images, same lighting/background/pose, incrementing ~18° apart — angle_01.jpg … angle_20.jpg]

Name + one-line identity tag beneath, animated stat counters to the side (e.g. years experience, projects shipped, cups of coffee — whatever's true), counting up on scroll into view.

2. About paragraph

Single, well-written paragraph (not bullet fragments): who they are, what work they do, and a natural mention of age/life stage worked into the sentence rather than listed as a stat.

Sits next to a portrait photo with a subtle parallax tilt on mouse move (tilt.js-style, pure CSS/JS transform, no library needed).

[PHOTO SLOT: 1 close portrait — about_portrait.jpg]

3. Work / what I do

Card grid, 2–3 columns. Each card: role/skill title, 1-line description, optional photo/screenshot, hover-lift with soft shadow.

Optional: a horizontal scroll-snap "timeline" strip if they want career progression shown instead of a grid.

[PHOTO SLOT: 1 photo per work card — work_01.jpg, work_02.jpg, work_03.jpg…]

4. Hobbies gallery

Masonry or bento-grid layout, one tile per hobby, photo as background with a gradient-scrim caption on hover/tap revealing the hobby name + a short line.

Clicking a tile opens a lightweight lightbox with 2–3 more photos of that hobby.

[PHOTO SLOT: 1 cover + 2–3 extra per hobby — hobby[name]_cover.jpg, hobby[name]_2.jpg…]

5. Extra sections worth adding

Interactive skill radar/bars — animated on scroll, values fill in from 0.

Timeline / journey strip — horizontal scroll-snap cards: school → milestones → now, each with a tiny photo thumbnail.

Favorite quote or personal motto — large serif type, centered, understated.

"Now" mini-widget — what they're currently learning/working on, styled like a small terminal or notes card (matches your AI-demo angle nicely).

Contact via WhatsApp deep link — same pattern as the restaurant template (https://wa.me/<number>?text=...), single glowing CTA button, no form/backend needed.

Easter egg — a tiny hidden interaction (konami code, click the logo 5x, etc.) that triggers a fun animation — reinforces the "AI capability showcase" angle.

Dark/light toggle — instant, persists via CSS variables only (no localStorage dependency needed if kept in-session).

Cursor-reactive background — faint particle or gradient blob that drifts toward the cursor, kept subtle so it doesn't fight the 3D hero.

Guestbook / reactions strip — visitors tap an emoji reaction, count increments client-side (cosmetic, resets on reload unless you want it backed later).

6. Technical constraints (matches your v5 template rules)

Frontend-only, no Supabase/backend.

Scroll-reveal via IntersectionObserver, not a heavy animation library unless Framer Motion is already available.

Hero 3D turntable and skill bars must have CSS-only fallbacks if JS/Three.js fails to load — never a blank hero.

Lazy-load all photo sets below the fold.

Self-check before calling any section done: does it render with placeholder/fewer photos than specified without breaking layout? Is contrast readable in both themes? Does the turntable still feel smooth on mobile touch drag?

Photo checklist to gather before building

Section Count Notes Hero turntable 20 Same distance/lighting, ~18° apart, plain background ideal About portrait 1 Close crop, good lighting Work cards 1 per card Or screenshots of actual work Hobbies 3–4 per hobby 1 cover + supporting shots Timeline (optional) 1 per milestone Can be old/candid photos

use the following photos

This project is built for **Aura Showcase** - Personal Portfolio.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
