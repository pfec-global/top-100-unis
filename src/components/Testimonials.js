"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import Reveal from "./Reveal";
import { testimonials } from "@/lib/data";

const AUTOPLAY_MS = 3000;
const GAP = 20; // px between cards
const N = testimonials.length;
// Render the list 3× so the slider can loop forever; we live in the middle copy.
const slides = [...testimonials, ...testimonials, ...testimonials];

export default function Testimonials() {
  const viewportRef = useRef(null);
  const [index, setIndex] = useState(N); // position in `slides`
  const [animate, setAnimate] = useState(true);
  const [step, setStep] = useState(0); // card width + gap, in px
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  const drag = useRef(null);

  const active = ((index % N) + N) % N;

  // Measure card width (responsive).
  useEffect(() => {
    const vp = viewportRef.current;
    const measure = () => {
      const card = vp.querySelector("article");
      if (card) setStep(card.offsetWidth + GAP);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(vp);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMq = () => setReduced(mq.matches);
    onMq();
    mq.addEventListener("change", onMq);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, []);

  const go = useCallback((dir) => {
    setAnimate(true);
    setIndex((i) => i + dir);
  }, []);

  const goTo = (i) => {
    setAnimate(true);
    setIndex(N + i);
  };

  // After sliding into a clone, jump silently back to the middle copy.
  const onTransitionEnd = (e) => {
    if (e.target !== e.currentTarget) return;
    if (index >= 2 * N || index < N) {
      setAnimate(false);
      setIndex((i) => (i >= 2 * N ? i - N : i + N));
    }
  };

  // Re-enable animation on the frame after a silent jump.
  useEffect(() => {
    if (animate) return;
    const r = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(r);
  }, [animate]);

  // Autoplay.
  useEffect(() => {
    if (paused || reduced) return;
    const t = setTimeout(() => go(1), AUTOPLAY_MS);
    return () => clearTimeout(t);
  }, [index, paused, reduced, go]);

  // Swipe / drag (touch + mouse): the track follows the pointer, then snaps.
  const [dragX, setDragX] = useState(0);
  const [dragging, setDragging] = useState(false);
  const suppressClick = useRef(false);

  const onPointerDown = (e) => {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    suppressClick.current = false;
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY, t: performance.now(), dx: 0, axis: null };
    setPaused(true);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;
    if (!d.axis) {
      if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
      d.axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      if (d.axis === "y") {
        // vertical intent: let the page scroll
        drag.current = null;
        return;
      }
      e.currentTarget.setPointerCapture?.(e.pointerId);
      setDragging(true);
    }
    d.dx = dx;
    setDragX(dx);
  };
  const endDrag = (cancelled) => {
    const d = drag.current;
    drag.current = null;
    if (d?.axis === "x" && step) {
      const v = d.dx / Math.max(1, performance.now() - d.t); // px per ms
      let n = Math.round(-d.dx / step); // whole cards dragged past
      if (n === 0 && !cancelled && (Math.abs(d.dx) > step * 0.15 || Math.abs(v) > 0.4)) n = d.dx < 0 ? 1 : -1;
      n = Math.max(-N, Math.min(N, n));
      setAnimate(true);
      if (n) setIndex((i) => i + n);
      suppressClick.current = true;
    }
    setDragging(false);
    setDragX(0);
    if (window.matchMedia("(hover: none)").matches) setPaused(false);
  };

  return (
    <section id="stories" className="overflow-hidden bg-[#FBFBFB] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <h2 className="text-2xl font-bold text-ink sm:text-[28px]">
            <span className="text-[#262a8a]">Honest advice.</span> Real outcomes.
          </h2>
          <div className="flex items-center gap-4">
            <p className="text-xs text-ink/80 sm:text-sm">Personal guidance based on your goals, virtual or in person.</p>
            <div className="hidden gap-2 sm:flex">
              {[-1, 1].map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => go(d)}
                  aria-label={d < 0 ? "Previous testimonial" : "Next testimonial"}
                  className="grid size-10 cursor-pointer place-items-center rounded-full border border-[#272063]/15 bg-white text-[#272063] transition hover:border-[#272063] hover:bg-[#272063] hover:text-white active:scale-95"
                >
                  <Icon name="arrow" className={`size-4 ${d < 0 ? "rotate-180" : ""}`} />
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* viewport: clips on the left only, so the next card peeks out on the right */}
        <div
          ref={viewportRef}
          className="mt-8 [clip-path:inset(-40px_-100vw_-40px_0)]"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => {
            if (!drag.current) setPaused(false);
          }}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
          aria-roledescription="carousel"
          aria-label="Student testimonials"
        >
          <div
            className={`flex touch-pan-y select-none ${dragging ? "cursor-grabbing" : "cursor-grab"} ${
              animate && !dragging ? "transition-transform duration-700 ease-[cubic-bezier(0.65,0,0.35,1)]" : ""
            }`}
            style={{ gap: GAP, transform: `translate3d(${-index * step + dragX}px,0,0)` }}
            onTransitionEnd={onTransitionEnd}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={() => endDrag(false)}
            onPointerCancel={() => endDrag(true)}
            onClickCapture={(e) => {
              if (suppressClick.current) {
                e.preventDefault();
                e.stopPropagation();
                suppressClick.current = false;
              }
            }}
            onDragStart={(e) => e.preventDefault()}
          >
            {slides.map((t, i) => {
              const isActive = i === index;
              return (
                <article
                  key={i}
                  aria-roledescription="slide"
                  aria-label={`${(i % N) + 1} of ${N}`}
                  aria-hidden={i < index || i > index + 1}
                  className={`group grid w-[86vw] shrink-0 overflow-hidden rounded-2xl bg-[#272063] p-3 shadow-[0_24px_50px_-28px_rgba(39,32,99,0.8)] transition-opacity duration-700 sm:w-[520px] sm:grid-cols-[180px_1fr] sm:p-4 lg:w-[calc((min(100vw,80rem)-5rem-20px)/2.1)] ${
                    isActive || i === index + 1 ? "opacity-100" : "opacity-60"
                  }`}
                >
                  <div className="relative self-start overflow-hidden rounded-xl bg-[#FFC727] sm:h-full sm:min-h-[200px] sm:self-stretch">
                    <Image
                      src={t.img}
                      alt={t.name}
                      width={t.w}
                      height={t.h}
                      draggable={false}
                      sizes="(max-width: 639px) calc(86vw - 24px), 180px"
                      className="pointer-events-none block h-auto w-full object-top transition-transform duration-700 sm:absolute sm:inset-0 sm:size-full sm:object-cover sm:group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-col justify-center px-2 pt-5 pb-2 sm:px-5 sm:py-3">
                    <p className="text-[13px] leading-relaxed text-white/90">{t.quote}</p>
                    <p className="mt-4 text-sm font-bold tracking-wide text-[#FFC727] uppercase">{t.name}</p>
                    <p className="mt-1 text-xs font-medium text-white/80">{t.subject}</p>
                    <p className="mt-0.5 text-xs text-white/60">
                      {t.university}, {t.country}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {[t.scholarship, t.intake && `Intake: ${t.intake}`].filter(Boolean).map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-white/10 px-2.5 py-1 text-[11px] font-medium text-[#FFC727]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* dots with autoplay progress */}
        <div className="mt-6 flex justify-center gap-2">
          {testimonials.map((t, i) => (
            <button
              key={t.img}
              type="button"
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
              aria-current={i === active}
              className={`relative h-2 cursor-pointer overflow-hidden rounded-full transition-all duration-500 ${
                i === active ? "w-10 bg-[#272063]/20" : "w-2 bg-[#272063]/25 hover:bg-[#272063]/50"
              }`}
            >
              {i === active && (
                <span
                  key={index}
                  className="absolute inset-y-0 left-0 rounded-full bg-[#272063]"
                  style={
                    paused || reduced
                      ? { width: "100%" }
                      : { width: "100%", transformOrigin: "left", animation: `dotFill ${AUTOPLAY_MS}ms linear both` }
                  }
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
