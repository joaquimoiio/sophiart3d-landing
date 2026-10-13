import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Registra os plugins apenas no browser (SSR-safe).
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export { gsap, ScrollTrigger };
