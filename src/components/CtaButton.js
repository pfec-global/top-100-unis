"use client";

import Icon from "./Icon";
import { useRegisterModal } from "./RegisterModal";

const sizes = {
  sm: "h-9 px-4 text-xs",
  md: "h-11 px-6 text-sm",
  lg: "h-13 px-8 text-base",
};

const variants = {
  solid:
    "bg-accent text-white shadow-[0_8px_24px_-8px_rgba(232,75,55,0.7)] hover:bg-accent-600 hover:shadow-[0_14px_32px_-10px_rgba(232,75,55,0.85)]",
  outline:
    "border border-accent bg-white text-accent hover:bg-accent hover:text-white hover:shadow-[0_14px_32px_-12px_rgba(232,75,55,0.7)]",
};

export default function CtaButton({ children = "Register for Free", size = "md", arrow = true, variant = "solid", className = "" }) {
  const { open } = useRegisterModal();
  return (
    <button
      type="button"
      onClick={open}
      aria-haspopup="dialog"
      className={`group/btn inline-flex cursor-pointer items-center justify-center gap-2 rounded-lg font-semibold transition-all duration-300 hover:-translate-y-0.5 ${variants[variant]} focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${sizes[size]} ${className}`}
    >
      {children}
      {arrow && <Icon name="arrow" className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />}
    </button>
  );
}
