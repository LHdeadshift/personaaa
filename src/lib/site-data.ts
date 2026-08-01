import a1 from "@/assets/image.png.asset.json";
import a2 from "@/assets/image-2.png.asset.json";
import a3 from "@/assets/image-3.png.asset.json";
import a4 from "@/assets/image-4.png.asset.json";
import a5 from "@/assets/image-5.png.asset.json";
import a6 from "@/assets/image-6.png.asset.json";
import a7 from "@/assets/image-7.png.asset.json";
import a8 from "@/assets/image-8.png.asset.json";
import a9 from "@/assets/image-9.png.asset.json";

// ---- EDIT ME: all copy lives here -------------------------------------
export const profile = {
  name: "Aarohi",
  tagline: "Designer-developer building interfaces that feel alive.",
  whatsapp: "919999999999", // digits only, country code first
  whatsappText: "Hey Aarohi — saw your site, the turntable is unreal. Let's talk.",
  motto: "Make it feel inevitable, then make it feel fun.",
};

/**
 * Hero turntable frames. Ideally 20 images ~18° apart.
 * With fewer, the rig automatically falls back to an evenly-spaced
 * 3D rotateY card carousel across the full 360°.
 */
export const turntableFrames = [a1, a2, a3, a4, a5, a6, a7, a8, a9].map((m) => m.url);

export const aboutPortrait = a1.url;

export const stats = [
  { label: "Years designing", value: 6, suffix: "+" },
  { label: "Projects shipped", value: 42, suffix: "" },
  { label: "Cups of coffee", value: 3120, suffix: "" },
];

export const aboutParagraph = `I'm ${profile.name} — twenty-six, endlessly curious, and happiest somewhere between a Figma canvas and a running dev server. I design and build interfaces for teams who care about the small stuff: the easing curve on a drawer, the half-second a counter takes to settle, the way a page should feel finished before you can explain why. Most of my work lives at the intersection of product design and front-end engineering, lately with a lot of AI-flavoured interaction thrown in, because the interesting problem right now isn't what a model can do — it's how it should feel to use one. Outside of that I'm a chronic over-photographer, a mediocre-but-committed cook, and the person who will absolutely reorganise your slide deck uninvited.`;

export const workCards = [
  {
    title: "Product Design",
    line: "End-to-end flows, design systems, and the unglamorous states nobody prototypes.",
    photo: a3.url,
  },
  {
    title: "Front-end Engineering",
    line: "React, TypeScript, and motion work that ships — not just a pretty prototype.",
    photo: a7.url,
  },
  {
    title: "AI Interaction",
    line: "Chat, agents, and generative UI patterns that stay legible under pressure.",
    photo: a6.url,
  },
];

export const skills = [
  { name: "Interface design", value: 94 },
  { name: "React / TypeScript", value: 88 },
  { name: "Motion & interaction", value: 90 },
  { name: "Design systems", value: 82 },
  { name: "AI / prompt design", value: 76 },
];

export const hobbies = [
  {
    name: "Photography",
    line: "Golden hour, film grain, far too many rolls undeveloped.",
    cover: a5.url,
    gallery: [a5.url, a2.url, a8.url],
  },
  {
    name: "Dance",
    line: "Classical roots, terrible improv, zero regrets.",
    cover: a9.url,
    gallery: [a9.url, a4.url, a7.url],
  },
  {
    name: "Coffee",
    line: "A grinder I cannot justify and opinions I cannot defend.",
    cover: a6.url,
    gallery: [a6.url, a3.url, a1.url],
  },
  {
    name: "City wandering",
    line: "Same three streets, new detail every single time.",
    cover: a8.url,
    gallery: [a8.url, a2.url, a5.url],
  },
];

export const timeline = [
  { year: "2016", title: "Started design school", line: "First critique, first ego death.", photo: a1.url },
  { year: "2019", title: "First product role", line: "Learned that shipping beats polishing.", photo: a3.url },
  { year: "2021", title: "Went hybrid", line: "Stopped handing off and started building.", photo: a7.url },
  { year: "2023", title: "AI everything", line: "Rebuilt my practice around generative UI.", photo: a6.url },
  { year: "Now", title: "Independent", line: "Selective client work + this playground.", photo: a2.url },
];

export const nowItems = [
  "learning → WebGPU shaders (badly, joyfully)",
  "building → an agentic design-review tool",
  "reading → The Timeless Way of Building",
  "listening → too much drum & bass",
];
