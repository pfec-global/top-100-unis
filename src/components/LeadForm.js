"use client";

import { useEffect, useId, useRef, useState } from "react";
import Icon from "./Icon";

const ZOHO_ACTION =
  "https://forms.zohopublic.in/pfecglobal/form/PFECGlobalTop100UniversitiesEligibilityCheckFreeCo/formperma/MeutgscMV_HJ971vNkJqn5tuIVGbzXpduS63N6toFho/htmlRecords/submit";

const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"];

// Field names + option values must match the Zoho form exactly.
const SELECTS = [
  { name: "Dropdown7", label: "Your Nearest PFEC Office", options: ["Dhanmondi", "Banani", "Uttara", "Chattogram"] },
  {
    name: "Dropdown1",
    label: "Your Preferred Study Destination",
    options: [
      "Australia",
      "Canada",
      "Europe",
      "Ireland",
      "Japan",
      "Malaysia",
      "New Zealand",
      "Open to multiple destinations",
      "UK",
      "USA",
    ],
  },
  { name: "Dropdown3", label: "Your Preferred Study Year", options: ["2027", "2028", "2029", "2030"] },
  { name: "Dropdown5", label: "Your Preferred Study Level", options: ["Under Graduate", "Post Graduate"] },
  {
    name: "Dropdown2",
    label: "English Language Test Status",
    options: [
      "I have the scores available",
      "My exams are scheduled or waiting for results",
      "I have not appeared for any exams",
      "I am planning to reappear soon",
    ],
  },
  {
    name: "Dropdown6",
    label: "Preferred Study Intake",
    options: ["Not Yet Decided", "Q1 (Jan - Mar)", "Q2 (Apr - Jun)", "Q3 (Jul - Sep)", "Q4 (Oct - Dec)"],
  },
  {
    name: "Dropdown4",
    label: "How do you plan to fund your studies?",
    options: [
      "I have my own funds",
      "My parents will fund my studies",
      "My siblings/relatives will fund my studies",
      "I don't have any fund",
    ],
  },
  {
    name: "Dropdown",
    label: "What is your highest completed qualification?",
    options: [
      "SSC / O Levels",
      "HSC / A Levels",
      "Diploma",
      "Bachelor’s Degree",
      "Master’s Degree",
      "Professional Certification",
      "Others",
    ],
  },
  {
    name: "Dropdown8",
    label: "Latest Education Score",
    options: ["CGPA 3.7 - 4.0", "CGPA 3.0 - 3.6", "CGPA 2.5 - 2.9", "Below CGPA 2.5", "Awaiting Results", "Others"],
  },
  {
    name: "Dropdown9",
    label: "Education Budget",
    options: ["Less than 10 lac BDT", "Within 20 lac BDT", "Within 50 lac BDT", "50 lac and Above"],
  },
];

const field =
  "h-11 w-full rounded-lg border border-transparent bg-[#f1f3f7] px-4 text-sm text-ink placeholder:text-ink/45 outline-none transition focus:border-brand/40 focus:bg-white focus:ring-4 focus:ring-brand/10";

function Select({ id, name, label, options, className = "", fieldClass = "" }) {
  return (
    <div className={`relative ${className}`}>
      <label className="sr-only" htmlFor={id}>{label}</label>
      <select
        id={id}
        name={name}
        required
        defaultValue=""
        className={`${field} ${fieldClass} cursor-pointer appearance-none truncate pr-10 invalid:text-ink/45`}
      >
        <option value="" disabled>{label}</option>
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">{o}</option>
        ))}
      </select>
      <svg viewBox="0 0 24 24" aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-accent" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m6 9 6 6 6-6" />
      </svg>
    </div>
  );
}

// `wide`: used in the desktop modal — on lg+ screens fields sit in two columns
// (grouped into sections) so the whole form fits without scrolling.
export default function LeadForm({ submitLabel = "Register for FREE", wide = false }) {
  const two = wide ? "lg:grid-cols-2 lg:gap-x-3 lg:gap-y-2.5" : "";
  const f = wide ? `${field} lg:h-10` : field;
  const heading = wide ? "hidden lg:flex lg:items-center lg:justify-between text-sm font-bold text-ink" : "hidden";
  const uid = useId();
  const id = (k) => `${uid}-${k}`;
  const formRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | sending | done | error

  // Fill UTM + referrer hidden fields from the landing URL.
  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const params = new URLSearchParams(window.location.search);
    for (const k of UTM_KEYS) {
      const v = params.get(k);
      if (v && form.elements[k]) form.elements[k].value = v;
    }
    if (form.elements.zc_gad) form.elements.zc_gad.value = params.get("gclid") || "";
    if (form.elements.zf_referrer_name) form.elements.zf_referrer_name.value = document.referrer || "";
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (!e.currentTarget.reportValidity()) return;
    const body = new FormData(e.currentTarget);
    setStatus("sending");
    try {
      // Zoho doesn't send CORS headers, so the response is opaque; a network
      // failure still throws and is reported as an error.
      await fetch(ZOHO_ACTION, { method: "POST", mode: "no-cors", body });
      setStatus("done");
    } catch {
      setStatus("error");
    }
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
    <form
      ref={formRef}
      action={ZOHO_ACTION}
      method="POST"
      acceptCharset="UTF-8"
      encType="multipart/form-data"
      onSubmit={onSubmit}
      className="grid gap-3"
    >
      <input type="hidden" name="zf_referrer_name" defaultValue="" />
      <input type="hidden" name="zf_redirect_url" defaultValue="" />
      <input type="hidden" name="zc_gad" defaultValue="" />
      {UTM_KEYS.map((k) => (
        <input key={k} type="hidden" name={k} defaultValue="" />
      ))}

      <div className={`grid gap-3 ${two}`}>
        <p className={`${heading} lg:col-span-2`}>
          Basic Details <span className="text-xs font-medium text-accent">*Mandatory fields</span>
        </p>
        <div className={`grid grid-cols-2 gap-3 ${wide ? "lg:contents" : ""}`}>
          <div>
            <label className="sr-only" htmlFor={id("first")}>First Name</label>
            <input id={id("first")} name="Name_First" maxLength={255} required autoComplete="given-name" placeholder="First Name" className={f} />
          </div>
          <div>
            <label className="sr-only" htmlFor={id("last")}>Last Name</label>
            <input id={id("last")} name="Name_Last" maxLength={255} autoComplete="family-name" placeholder="Last Name" className={f} />
          </div>
        </div>

        <div>
          <label className="sr-only" htmlFor={id("email")}>Email</label>
          <input id={id("email")} name="Email" type="email" maxLength={255} required autoComplete="email" placeholder="Email" className={f} />
        </div>

        <div>
          <label className="sr-only" htmlFor={id("phone")}>Phone Number</label>
          <input
            id={id("phone")}
            name="PhoneNumber_countrycode"
            type="tel"
            inputMode="numeric"
            minLength={11}
            maxLength={11}
            pattern="[0-9]{11}"
            title="Enter a phone number with exactly 11 digits."
            required
            autoComplete="tel"
            placeholder="Phone Number (11 digits)"
            onInvalid={(e) => e.currentTarget.setCustomValidity("Enter a phone number with exactly 11 digits.")}
            onInput={(e) => e.currentTarget.setCustomValidity("")}
            className={f}
          />
        </div>

        <p className={`${heading} lg:col-span-2 lg:mt-2`}>Other Information</p>
        {SELECTS.map((s, i) => (
          <Select
            key={s.name}
            id={id(s.name)}
            {...s}
            fieldClass={wide ? "lg:h-10" : ""}
            // odd one out spans the full row so the two-column grid stays even
            className={wide && i === SELECTS.length - 1 && SELECTS.length % 2 ? "lg:col-span-2" : ""}
          />
        ))}
      </div>

      <label className="mt-1 flex cursor-pointer items-center gap-2 text-xs text-ink/80">
        <input type="checkbox" required className="size-4 cursor-pointer accent-accent" />
        <span>
          I agree to the{" "}
          <a href="https://pfecglobal.com.bd/privacy-policy/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">privacy policy</a> and{" "}
          <a href="https://pfecglobal.com.bd/terms-of-use/" target="_blank" rel="noopener noreferrer" className="text-accent underline underline-offset-2">Terms of Use</a>
        </span>
      </label>

      {status === "error" && (
        <p role="alert" className="text-xs text-red-600">
          Something went wrong. Please check your connection and try again.
        </p>
      )}

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
