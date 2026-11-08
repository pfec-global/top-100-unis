"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CtaButton from "./CtaButton";
import { steps } from "@/lib/data";

const HEADER = 72; // sticky header height on desktop
const STEP_VH = 45; // scroll distance (in vh) spent on each step while pinned
const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

export default function Process() {
  const wrapRef = useRef(null);
  const listRef = useRef(null);
  // mode: "init" (SSR / before measuring) | "pin" (scroll-driven, desktop) | "flow" (reveal on view)
  const [mode, setMode] = useState("init");
  const [count, setCount] = useState(0); // how many steps are revealed
  const [done, setDone] = useState(false); // once true, the section is static forever

  // Pick the mode on mount.
  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(steps.length);
      setDone(true);
      setMode("flow");
      return;
    }
    setMode(window.matchMedia(PIN_QUERY).matches ? "pin" : "flow");
  }, []);

  // Desktop: pinned, scroll-driven sequence.
  useEffect(() => {
    if (mode !== "pin" || done) return;
    const wrap = wrapRef.current;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const pinH = window.innerHeight - HEADER;
      const extra = wrap.offsetHeight - pinH;
      const scrolled = HEADER - rect.top; // px scrolled since the section pinned
      const p = extra > 0 ? scrolled / extra : 1;

      if (scrolled >= 0) {
        // never go backwards: steps already shown stay shown
        const next = Math.min(steps.length, Math.floor(p * steps.length) + 1);
        setCount((c) => Math.max(c, next));
      }

      if (p >= 1) {
        // Sequence finished: release the pin and remove the extra scroll space
        // without moving anything on screen.
        const offset = Math.min(Math.max(scrolled, 0), extra);
        setCount(steps.length);
        setDone(true);
        requestAnimationFrame(() => window.scrollBy({ top: -offset, behavior: "instant" }));
      }
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
  }, [mode, done]);

  // Mobile / short screens: reveal cards one after another as they enter view (once).
  useEffect(() => {
    if (mode !== "flow" || done) return;
    const items = [...listRef.current.children];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = items.indexOf(e.target);
            setCount((c) => Math.max(c, i + 1));
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.35 }
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mode, done]);

  const pinning = mode === "pin" && !done;
  const progress = count / steps.length;

  return (
    <section
      id="process"
      ref={wrapRef}
      className="relative bg-[#270A94]"
      style={pinning ? { height: `calc(100vh - ${HEADER}px + ${steps.length * STEP_VH}vh)` } : undefined}
    >
      <div
        className={`relative isolate overflow-hidden ${
          mode === "pin" ? "flex items-center" : "py-16 sm:py-20"
        } ${pinning ? "sticky" : ""}`}
        style={mode === "pin" ? { top: pinning ? HEADER : undefined, height: `calc(100vh - ${HEADER}px)` } : undefined}
      >
        {/* subtle depth */}
        <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[520px] rounded-full bg-[#4a2bd6]/40 blur-[120px]" />
        <div aria-hidden className="absolute -right-32 -bottom-48 -z-10 size-[480px] rounded-full bg-[#100694]/60 blur-[120px]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <h2 className="max-w-[640px] text-2xl leading-tight font-bold text-white sm:text-[28px]">
              A great university application doesn&rsquo;t happen by chance. It&rsquo;s strategically built.
            </h2>
            <p className="max-w-md text-sm leading-relaxed text-white/80 lg:text-right">
              Your academic results are just one part of your application. The right course, university selection,
              supporting documents and application timing all play an important role.
            </p>
          </div>

          {/* progress */}
          <div className="mt-8 flex items-center gap-4 lg:mt-10" aria-hidden>
            <span className="font-display text-2xl leading-none text-[#f7c64a] tabular-nums">
              {String(Math.max(count, 1)).padStart(2, "0")}
              <span className="text-white/40"> / {String(steps.length).padStart(2, "0")}</span>
            </span>
            <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/15">
              <div
                className="h-full origin-left rounded-full bg-gradient-to-r from-[#f7c64a] to-accent transition-transform duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{ transform: `scaleX(${progress})` }}
              />
            </div>
          </div>

          <ol ref={listRef} className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => {
              const shown = i < count;
              const active = pinning && i === count - 1;
              return (
                <li
                  key={s.title}
                  className={`group relative overflow-hidden rounded-2xl bg-[#f5f4fb] p-6 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-white sm:last:col-span-2 lg:last:col-span-1 ${
                    shown ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-10 scale-95 opacity-0 blur-[2px]"
                  } ${active ? "shadow-[0_24px_60px_-18px_rgba(247,198,74,0.45)] ring-2 ring-[#f7c64a]/70" : "shadow-none ring-0"}`}
                >
                  <span
                    aria-hidden
                    className={`absolute inset-x-0 top-0 h-1 origin-left bg-accent transition-transform duration-700 ${
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                    }`}
                  />
                  <span className="grid size-9 place-items-center rounded-lg bg-[#270A94] text-base font-bold text-[#f7c64a]">
                    {i + 1}
                  </span>
                  <h3 className="mt-5 text-base leading-snug font-bold text-ink">{s.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{s.text}</p>
                </li>
              );
            })}
          </ol>

          <div
            className={`mt-10 flex flex-col items-start gap-4 transition-all duration-700 ${
              count >= steps.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
          >
            <p className="text-sm font-semibold text-white">
              Aiming higher is important. Having a clear strategy to get there makes all the difference.
            </p>
            <CtaButton size="md" />
          </div>
        </div>
      </div>
    </section>
  );
}
