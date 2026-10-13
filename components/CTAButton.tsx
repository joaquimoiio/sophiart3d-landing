"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Variant = "primary" | "secondary" | "light";

type CTAButtonProps = {
  children: ReactNode;
  href?: string;
  icon?: ReactNode;
  variant?: Variant;
  size?: "md" | "lg";
  onClick?: () => void;
  className?: string;
  external?: boolean;
  ariaLabel?: string;
};

const base =
  "btn-mash group inline-flex items-center gap-3 font-semibold leading-none";

const variants: Record<Variant, string> = {
  primary:
    "text-white bg-bubble-600 border-[3px] border-grape-800 shadow-[0_6px_0_var(--color-grape-800)]",
  secondary:
    "text-grape-800 bg-white border-[3px] border-grape-800 shadow-[0_6px_0_var(--color-grape-800)]",
  light:
    "text-grape-900 bg-lemon-400 border-[3px] border-grape-900 shadow-[0_6px_0_rgba(0,0,0,.35)]",
};

const sizes = {
  md: "px-6 py-3 text-[1.05rem]",
  lg: "px-8 py-4 text-[1.22rem]",
};

const iconWrap: Record<Variant, string> = {
  primary: "bg-white/25",
  secondary: "bg-grape-500/12",
  light: "bg-grape-900/12",
};

export default function CTAButton({
  children,
  href,
  icon,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  external = false,
  ariaLabel,
}: CTAButtonProps) {
  const reduce = useReducedMotion();

  const content = (
    <>
      <span className="pt-1">{children}</span>
      {icon ? (
        <span
          className={`btn-icon grid h-9 w-9 place-items-center rounded-full ${iconWrap[variant]}`}
        >
          {icon}
        </span>
      ) : null}
    </>
  );

  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className={cls}
        aria-label={ariaLabel}
        whileHover={reduce ? undefined : { scale: 1.035 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
        transition={{ type: "spring", stiffness: 420, damping: 17 }}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      onClick={onClick}
      className={cls}
      aria-label={ariaLabel}
      whileHover={reduce ? undefined : { scale: 1.035 }}
      whileTap={reduce ? undefined : { scale: 0.96 }}
      transition={{ type: "spring", stiffness: 420, damping: 17 }}
    >
      {content}
    </motion.button>
  );
}
