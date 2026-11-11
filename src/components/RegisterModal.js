"use client";

import Image from "next/image";
import { asset } from "@/lib/asset";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import Icon from "./Icon";
import LeadForm from "./LeadForm";

const ModalContext = createContext({ open: () => {} });

export function useRegisterModal() {
  return useContext(ModalContext);
}

const EXIT_MS = 300;

export default function RegisterModalProvider({ children }) {
  // mounted = in the DOM, visible = transitioned in (lets us animate both ways)
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);
  const panelRef = useRef(null);
  const lastFocus = useRef(null);

  const open = useCallback(() => {
    lastFocus.current = document.activeElement;
    setMounted(true);
    requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
  }, []);

  const close = useCallback(() => {
    setVisible(false);
    setTimeout(() => {
      setMounted(false);
      lastFocus.current?.focus?.();
    }, EXIT_MS);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const scrollbar = window.innerWidth - document.documentElement.clientWidth;
    const prev = { overflow: document.body.style.overflow, pr: document.body.style.paddingRight };
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbar}px`;

    const onKey = (e) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && panelRef.current) {
        const els = panelRef.current.querySelectorAll("a[href],button:not([disabled]),input,select,textarea");
        if (!els.length) return;
        const first = els[0];
        const last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.querySelector("input")?.focus({ preventScroll: true }), 350);

    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev.overflow;
      document.body.style.paddingRight = prev.pr;
      clearTimeout(t);
    };
  }, [mounted, close]);

  return (
    <ModalContext.Provider value={{ open }}>
      {children}

      {mounted && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center sm:items-center sm:p-6" role="presentation">
          {/* backdrop */}
          <div
            onClick={close}
            aria-hidden
            className={`absolute inset-0 bg-[#05022a]/70 backdrop-blur-sm transition-opacity duration-300 ${
              visible ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* panel */}
          <div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="register-modal-title"
            className={`relative grid max-h-[92dvh] w-full max-w-[880px] overflow-hidden rounded-t-3xl bg-white shadow-[0_40px_100px_-30px_rgba(5,2,42,0.8)] transition-all duration-300 ease-[cubic-bezier(0.2,0.8,0.2,1)] sm:rounded-3xl md:grid-cols-[0.9fr_1fr] ${
              visible
                ? "translate-y-0 opacity-100 sm:scale-100"
                : "translate-y-full opacity-0 sm:translate-y-6 sm:scale-95"
            }`}
          >
            {/* Brand side (desktop) */}
            <div className="hero-gradient relative hidden overflow-hidden md:flex md:flex-col md:justify-between md:p-8">
              <Image src={asset("/banner_hero.png")} alt="" aria-hidden width={626} height={358} className="sparkle pointer-events-none absolute -bottom-10 -left-10 w-[140%] max-w-none opacity-80" />
              <div aria-hidden className="stripe-band absolute top-[42%] -right-10 h-16 w-[80%] opacity-40" />
              <div className="relative">
                <p className="text-xs font-semibold tracking-[0.2em] text-accent uppercase">Free Profile Assessment</p>
                <p className="mt-3 font-display text-5xl leading-[0.95] text-cream uppercase">Your seat at a top 100 university</p>
                <ul className="mt-6 space-y-2.5 text-sm text-white/85">
                  {["Instant profile assessment", "Personalised admission strategy", "Zero service fee for eligible students"].map((t) => (
                    <li key={t} className="flex items-center gap-2">
                      <span className="grid size-5 shrink-0 place-items-center rounded-full bg-accent">
                        <Icon name="check" className="size-3 text-white" strokeWidth={3} />
                      </span>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <Image src={asset("/avater/girl.png")} alt="" aria-hidden width={1200} height={628} className="relative -mx-8 -mb-8 mt-6 w-[calc(100%+4rem)] max-w-none" />
            </div>

            {/* Form side */}
            <div className="relative max-h-[92dvh] min-h-0 overflow-y-auto overscroll-contain p-6 sm:p-8">
              <div aria-hidden className="mx-auto mb-4 h-1.5 w-12 rounded-full bg-ink/15 sm:hidden" />
              <button
                type="button"
                onClick={close}
                aria-label="Close"
                className="absolute top-4 right-4 grid size-9 place-items-center rounded-full bg-brand-50 text-ink/70 transition hover:rotate-90 hover:bg-brand hover:text-white"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden>
                  <path d="M6 6l12 12M18 6 6 18" />
                </svg>
              </button>
              <h2 id="register-modal-title" className="pr-10 text-xl font-bold text-accent">Sign up for a Free Profile Assessment</h2>
              <p className="mt-1 mb-6 text-sm text-muted">Find out if you qualify — it only takes a minute.</p>
              <LeadForm />
            </div>
          </div>
        </div>
      )}
    </ModalContext.Provider>
  );
}
