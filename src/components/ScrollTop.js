"use client";

import { useEffect, useRef, useState } from "react";

const R = 22;
const C = 2 * Math.PI * R;

/** Floating back-to-top arrow (bottom-right) with a ring that fills as you scroll. */
export default function ScrollTop() {
  const [show, setShow] = useState(false);
  const ringRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (ringRef.current) ringRef.current.style.strokeDashoffset = String(C * (1 - p));
      setShow(window.scrollY > 500);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <button
      type="button"
      aria-label="Back to top"
      tabIndex={show ? 0 : -1}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={`group fixed right-4 bottom-4 z-40 grid size-14 cursor-pointer place-items-center rounded-full bg-white shadow-[0_14px_34px_-12px_rgba(16,6,148,0.55)] transition-all duration-500 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:-translate-y-1 sm:right-6 sm:bottom-6 ${
        show ? "translate-y-0 scale-100 opacity-100" : "pointer-events-none translate-y-6 scale-75 opacity-0"
      }`}
    >
      <svg viewBox="0 0 56 56" className="absolute inset-0 size-full -rotate-90" aria-hidden>
        <circle cx="28" cy="28" r={R} fill="none" stroke="#e3e1f7" strokeWidth="3" />
        <circle
          ref={ringRef}
          cx="28"
          cy="28"
          r={R}
          fill="none"
          stroke="url(#st-grad)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray={C}
          strokeDashoffset={C}
        />
        <defs>
          <linearGradient id="st-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#100694" />
            <stop offset="1" stopColor="#e84b37" />
          </linearGradient>
        </defs>
      </svg>
      <span className="relative grid size-10 place-items-center rounded-full bg-brand text-white transition-colors duration-300 group-hover:bg-accent">
        <svg viewBox="0 0 24 24" className="size-5 animate-[nudgeUp_2s_ease-in-out_infinite]" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M12 19V5M6 11l6-6 6 6" />
        </svg>
      </span>
    </button>
  );
}
