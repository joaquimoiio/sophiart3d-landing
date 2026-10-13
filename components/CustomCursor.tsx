"use client";

import { useEffect, useRef } from "react";
import { useIsDesktop, usePrefersReducedMotion } from "@/lib/hooks";

/** Cursor estrelinha/bolinha que cresce em itens clicáveis (só desktop). */
export default function CustomCursor() {
  const isDesktop = useIsDesktop();
  const reduced = usePrefersReducedMotion();
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isDesktop || reduced) return;
    const wrap = wrapRef.current;
    if (!wrap) return;

    let tx = window.innerWidth / 2;
    let ty = window.innerHeight / 2;
    let cx = tx;
    let cy = ty;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
    };
    const loop = () => {
      cx += (tx - cx) * 0.22;
      cy += (ty - cy) * 0.22;
      wrap.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    window.addEventListener("mousemove", onMove, { passive: true });

    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const interactive = t?.closest("a, button, [data-cursor], input, textarea, label");
      wrap.classList.toggle("is-big", !!interactive);
    };
    window.addEventListener("mouseover", onOver, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
    };
  }, [isDesktop, reduced]);

  if (!isDesktop || reduced) return null;

  return (
    <div ref={wrapRef} className="custom-cursor" aria-hidden="true">
      <div className="dot grid h-6 w-6 place-items-center rounded-full bg-bubble-500 text-white shadow-[0_6px_18px_rgba(255,79,176,.6)]">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0c.7 6.1 5.2 10.6 12 12-6.8 1.4-11.3 5.9-12 12-.7-6.1-5.2-10.6-12-12C6.8 10.6 11.3 6.1 12 0Z" />
        </svg>
      </div>
    </div>
  );
}
