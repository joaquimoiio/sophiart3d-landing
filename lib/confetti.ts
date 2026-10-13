"use client";

/** Dispara uma explosão de confete em (x, y). Usado pelos CTAs e easter eggs. */
export function fireConfetti(x?: number, y?: number, count = 26) {
  if (typeof window === "undefined") return;
  const cx = x ?? window.innerWidth / 2;
  const cy = y ?? window.innerHeight / 2;
  window.dispatchEvent(
    new CustomEvent("sophiart:confetti", { detail: { x: cx, y: cy, count } })
  );
}
