"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import type { FaqItem } from "@/data/faq";

function Item({ item }: { item: FaqItem }) {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className="rounded-[1.75rem] border-[3px] border-grape-800 bg-white shadow-[0_6px_0_rgba(0,0,0,.35)]"
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        className="flex w-full items-center gap-4 px-6 py-6 text-left"
      >
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-lg font-bold text-white transition-transform duration-500 ${
            open ? "rotate-45 bg-grape-500" : "bg-bubble-500"
          }`}
          aria-hidden="true"
        >
          +
        </span>
        <span className="flex-1 font-display text-lg font-semibold text-grape-800 sm:text-xl">
          {item.q}
        </span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-6 pl-[4.25rem] text-[1.05rem] font-semibold leading-relaxed text-grape-800/85">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Accordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="flex flex-col gap-4">
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </div>
  );
}
