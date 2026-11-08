"use client";

import { useEffect, useRef, useState } from "react";

const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Counts from 0 to `to` once, the first time it scrolls into view. */
export default function CountUp({ to, suffix = "", duration = 2000, className = "" }) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const r = requestAnimationFrame(() => setValue(to));
      return () => cancelAnimationFrame(r);
    }
    let raf = 0;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        const start = performance.now();
        const tick = (now) => {
          const t = Math.min(1, (now - start) / duration);
          setValue(Math.round(easeOutExpo(t) * to));
          if (t < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`} aria-label={`${to.toLocaleString("en-US")}${suffix}`}>
      <span aria-hidden>
        {value.toLocaleString("en-US")}
        {suffix}
      </span>
    </span>
  );
}
