"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { useEffect, useRef, useState } from "react";
import CtaButton from "./CtaButton";

const links = [
  { href: "#why", label: "Why PFEC" },
  { href: "#universities", label: "Universities" },
  { href: "#process", label: "How it Works" },
  { href: "#stories", label: "Success Stories" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const barRef = useRef(null);

  useEffect(() => {
    let raf = 0;
    const update = () => {
      raf = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, window.scrollY / max) : 0;
      if (barRef.current) barRef.current.style.transform = `scaleX(${p})`;
      setScrolled(window.scrollY > 12);
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
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/85 shadow-[0_6px_24px_-12px_rgba(16,6,148,0.25)] backdrop-blur-xl" : "bg-white"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6 lg:px-10">
        <a href="#top" aria-label="PFEC Global – home" className="shrink-0">
          <Image src={asset("/pfec.png")} alt="PFEC Global – Study Abroad | Visa" width={589} height={236} priority className="h-9 w-auto sm:h-11" />
        </a>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="relative text-sm font-medium text-ink/75 transition-colors hover:text-brand after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-accent after:transition-all hover:after:w-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <CtaButton size="sm" arrow={false} className="sm:h-10 sm:px-5 sm:text-sm" />
      </div>

      {/* scroll progress */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-[3px] bg-brand/5">
        <div
          ref={barRef}
          className="h-full origin-left bg-gradient-to-r from-brand via-[#6b5fd8] to-accent shadow-[0_0_10px_rgba(232,75,55,0.5)]"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
    </header>
  );
}
