"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import CtaButton from "./CtaButton";
import { steps } from "@/lib/data";

const STEP_VH = 45; // scroll distance (in vh) spent on each step while pinned (desktop)
const DECK_STEP_VH = 60; // same, for the mobile card deck
const PIN_QUERY = "(min-width: 1024px) and (min-height: 700px) and (prefers-reduced-motion: no-preference)";
const DECK_QUERY = "(max-width: 1023px) and (min-height: 560px) and (prefers-reduced-motion: no-preference)";

const useIsoLayoutEffect = typeof window === "undefined" ? useEffect : useLayoutEffect;

/** Height of the sticky site header (h-16 below sm, 72px from sm up). */
const headerHeight = () => (window.matchMedia("(min-width: 640px)").matches ? 72 : 64);

export default function Process() {
  const wrapRef = useRef(null);
  const stickyRef = useRef(null);
  const listRef = useRef(null);
  const anchorRef = useRef(null); // viewport bottom of the section when the deck finished
  // mode: "init" (SSR / before measuring) | "pin" (desktop, scroll-driven row)
  //       | "deck" (mobile, scroll-driven stacked cards) | "flow" (reveal on view)
  const [mode, setMode] = useState("init");
  const [header, setHeader] = useState(72);
  const [count, setCount] = useState(0); // how many steps are revealed
  const [done, setDone] = useState(false); // once true, the section is static forever

  // Pick the mode on mount (and again if the viewport changes category).
  useIsoLayoutEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      setCount(steps.length);
      setDone(true);
      setMode("flow");
      return;
    }
    const pick = () => {
      setHeader(headerHeight());
      setMode((m) => {
        // Desktop pin is one-shot; don't re-enter it after it has finished.
        if (window.matchMedia(PIN_QUERY).matches) return m === "flow" && done ? "flow" : "pin";
        if (window.matchMedia(DECK_QUERY).matches) return "deck";
        return "flow";
      });
    };
    pick();
    const mqs = [PIN_QUERY, DECK_QUERY, "(min-width: 640px)"].map((q) => window.matchMedia(q));
    mqs.forEach((mq) => mq.addEventListener("change", pick));
    return () => mqs.forEach((mq) => mq.removeEventListener("change", pick));
  }, []);

  // Scroll-driven sequence (desktop pin + mobile deck).
  useEffect(() => {
    const desktop = mode === "pin";
    if (!(desktop || mode === "deck") || done) return;
    const wrap = wrapRef.current;
    let raf = 0;

    const update = () => {
      raf = 0;
      const rect = wrap.getBoundingClientRect();
      const pinH = stickyRef.current.offsetHeight;
      const extra = wrap.offsetHeight - pinH;
      const scrolled = header - rect.top; // px scrolled since the section pinned
      const p = extra > 0 ? scrolled / extra : 1;

      if (scrolled >= 0) {
        // never go backwards: steps already shown stay shown
        const next = Math.min(steps.length, Math.floor(p * steps.length) + 1);
        setCount((c) => Math.max(c, next));
      }

      if (p >= 1) {
        // Sequence finished: release the pin and remove the extra scroll space.
        setCount(steps.length);
        setDone(true);
        if (desktop) {
          // Desktop layout doesn't change, so just undo the pinned distance.
          const offset = Math.min(Math.max(scrolled, 0), extra);
          requestAnimationFrame(() => window.scrollBy({ top: -offset, behavior: "instant" }));
        } else {
          // Mobile: the deck unfolds into a list; keep the section's bottom
          // (step 5 + CTA) where it is on screen. Corrected in the layout effect below.
          anchorRef.current = rect.bottom;
        }
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
  }, [mode, done, header]);

  // Mobile deck just finished: it re-rendered as a static list, so shift the
  // scroll position to keep the section's bottom where the user was looking.
  useIsoLayoutEffect(() => {
    if (!done || anchorRef.current == null) return;
    const delta = wrapRef.current.getBoundingClientRect().bottom - anchorRef.current;
    anchorRef.current = null;
    window.scrollBy({ top: delta, behavior: "instant" });
  }, [done]);

  // Short screens: reveal cards one after another as they enter view (once).
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

  const deck = mode === "deck" && !done; // stacked cards, only while the sequence runs
  const pinning = (mode === "pin" || mode === "deck") && !done;
  const fixedHeight = mode === "pin" || deck;
  const progress = count / steps.length;

  function cardStyle(i) {
    if (!deck) return undefined;
    const depth = count - 1 - i; // 0 = top card, 1 = just behind it, …
    if (depth < 0) return { transform: "translateY(115%) scale(0.96)", opacity: 0, zIndex: i };
    return {
      transform: `translateY(${-depth * 12}px) scale(${1 - depth * 0.05})`,
      opacity: depth > 2 ? 0 : 1,
      zIndex: i,
    };
  }

  return (
    <section
      id="process"
      ref={wrapRef}
      className="relative bg-[#270A94]"
      style={
        pinning
          ? { height: `calc(100svh - ${header}px + ${steps.length * (deck ? DECK_STEP_VH : STEP_VH)}svh)` }
          : undefined
      }
    >
      <div
        ref={stickyRef}
        className={`relative isolate overflow-hidden ${
          fixedHeight ? "flex items-center" : "py-16 sm:py-20"
        } ${deck ? "py-6" : ""} ${pinning ? "sticky" : ""}`}
        style={fixedHeight ? { top: pinning ? header : undefined, height: `calc(100svh - ${header}px)` } : undefined}
      >
        {/* subtle depth */}
        <div aria-hidden className="absolute -top-40 -left-40 -z-10 size-[520px] rounded-full bg-[#4a2bd6]/40 blur-[120px]" />
        <div aria-hidden className="absolute -right-32 -bottom-48 -z-10 size-[480px] rounded-full bg-[#100694]/60 blur-[120px]" />
        <div aria-hidden className="absolute inset-0 -z-10 opacity-[0.06] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:24px_24px]" />

        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-10">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between lg:gap-16">
            <h2
              className={`max-w-[640px] leading-tight font-bold text-white sm:text-[28px] ${
                deck ? "text-xl [@media(max-height:700px)]:text-lg" : "text-2xl"
              }`}
            >
              A great university application doesn&rsquo;t happen by chance. It&rsquo;s strategically built.
            </h2>
            <p
              className={`max-w-md text-sm leading-relaxed text-white/80 lg:text-right ${
                deck ? "text-[13px] [@media(max-height:760px)]:hidden" : ""
              }`}
            >
              Your academic results are just one part of your application. The right course, university selection,
              supporting documents and application timing all play an important role.
            </p>
          </div>

          {/* progress */}
          <div className={`flex items-center gap-4 ${deck ? "mt-5" : "mt-8 lg:mt-10"}`} aria-hidden>
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

          <ol
            ref={listRef}
            className={deck ? "mt-4 grid pt-8" : "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5"}
          >
            {steps.map((s, i) => {
              const shown = i < count;
              const active = pinning && i === count - 1;
              return (
                <li
                  key={s.title}
                  style={cardStyle(i)}
                  className={`group relative overflow-hidden rounded-2xl bg-[#f5f4fb] p-6 transition-all duration-700 ease-[cubic-bezier(0.2,0.8,0.2,1)] hover:bg-white ${
                    deck
                      ? "col-start-1 row-start-1 origin-top"
                      : `sm:last:col-span-2 lg:last:col-span-1 ${
                          shown ? "translate-y-0 scale-100 opacity-100 blur-0" : "translate-y-10 scale-95 opacity-0 blur-[2px]"
                        }`
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
                  <h3 className={`text-base leading-snug font-bold text-ink ${deck ? "mt-4" : "mt-5"}`}>{s.title}</h3>
                  <p className="mt-3 text-[13px] leading-relaxed text-muted">{s.text}</p>
                </li>
              );
            })}
          </ol>

          <div
            className={`flex flex-col items-start gap-4 transition-all duration-700 ${deck ? "mt-6" : "mt-10"} ${
              count >= steps.length ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-6 opacity-0"
            }`}
          >
            <p className={`text-sm font-semibold text-white ${deck ? "[@media(max-height:700px)]:hidden" : ""}`}>
              Aiming higher is important. Having a clear strategy to get there makes all the difference.
            </p>
            <CtaButton size="md" />
          </div>
        </div>
      </div>
    </section>
  );
}
