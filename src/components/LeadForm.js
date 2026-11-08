"use client";

import { useId, useState } from "react";
import Icon from "./Icon";

const field =
  "h-11 w-full rounded-lg border border-transparent bg-[#f1f3f7] px-4 text-sm text-ink placeholder:text-ink/45 outline-none transition focus:border-brand/40 focus:bg-white focus:ring-4 focus:ring-brand/10";

function Select({ id, name, label, options }) {
  return (
    <div className="relative">
      <label className="sr-only" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={`${field} cursor-pointer appearance-none pr-10 invalid:text-ink/45`}
      >
        <option value="" disabled>{label}</option>
        {options.map((o) => (
          <option key={o} className="text-ink">{o}</option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

function intakeOptions() {
  const now = new Date();
  const year = now.getFullYear();
  const out = [];
  for (let y = year; y <= year + 2; y++) {
    for (const [m, label] of [[1, "February"], [6, "July"], [8, "September"]]) {
      if (y === year && m <= now.getMonth()) continue;
      out.push(`${label} ${y}`);
    }
  }
  return out.slice(0, 6);
}

export default function LeadForm({ submitLabel = "Register for FREE" }) {
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const [status, setStatus] = useState("idle"); // idle | sending | done

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    // TODO: send `data` to the CRM / lead endpoint.
    void data;
    await new Promise((r) => setTimeout(r, 700));
    setStatus("done");
  }

  if (status === "done") {
    return (
      <div className="flex animate-[fadeUp_.5s_ease-out_both] flex-col items-center gap-3 py-10 text-center">
        <span className="grid size-14 place-items-center rounded-full bg-green-100 text-green-600">
          <Icon name="check" className="size-7" strokeWidth={2.5} />
        </span>
        <h3 className="text-lg font-bold text-ink">You&rsquo;re on board!</h3>
        <p className="max-w-xs text-sm text-muted">
          Thanks for registering. A PFEC Global counsellor will contact you shortly for your free profile assessment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-3">
      <label className="sr-only" htmlFor={id("name")}>Full Name</label>
      <input id={id("name")} name="name" required autoComplete="name" placeholder="Full Name" className={field} />

      <label className="sr-only" htmlFor={id("email")}>Email ID</label>
      <input id={id("email")} name="email" type="email" required autoComplete="email" placeholder="Email ID" className={field} />

      <label className="sr-only" htmlFor={id("phone")}>Phone Number</label>
      <input id={id("phone")} name="phone" type="tel" required autoComplete="tel" placeholder="Phone Number" className={field} />

      <Select id={id("destination")} name="destination" label="Preferred Destination" options={["Australia", "United Kingdom", "Canada", "Not sure yet"]} />
      <Select id={id("intake")} name="intake" label="Preferred Intake" options={intakeOptions()} />
      <Select id={id("level")} name="level" label="Study Level" options={["Undergraduate", "Postgraduate", "PhD / Research"]} />

      <label className="mt-1 flex cursor-pointer items-center gap-2 text-xs text-ink/80">
        <input type="checkbox" name="consent" required className="size-4 cursor-pointer accent-accent" />
        <span>
          I agree to the{" "}
          <a href="#" className="text-accent underline underline-offset-2">privacy policy</a> and{" "}
          <a href="#" className="text-accent underline underline-offset-2">Terms of Use</a>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === "sending"}
        className="mt-1 inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-lg bg-accent text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(232,75,55,0.8)] transition hover:-translate-y-0.5 hover:bg-accent-600 disabled:cursor-wait disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            Submitting…
          </>
        ) : (
          submitLabel
        )}
      </button>
    </form>
  );
}
