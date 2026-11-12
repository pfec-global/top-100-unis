
"use client";

import { useEffect, useId, useRef, useState } from "react";

const ZOHO_ACTION =
  "https://forms.zohopublic.in/pfecglobal/form/AreyoueligibletostudyattheworldsTop100Universities/formperma/dZA-SNr7Lbd8wZC5z6OOkYtIb8AYVjh2P4hZDXmro28/htmlRecords/submit";

const UTM_KEYS = [
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
];

// Zoho dropdown fields and original values
const SELECTS = [
  {
    name: "Dropdown7",
    label: "Your Nearest PFEC Office",
    options: [
      "Dhanmondi",
      "Banani",
      "Uttara",
      "Chattogram",
    ],
    full: true,
  },
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
    full: true,
  },
  {
    name: "Dropdown3",
    label: "Preferred Study Year",
    options: ["2027", "2028", "2029", "2030"],
  },
  {
    name: "Dropdown5",
    label: "Preferred Study Level",
    options: [
      "Under Graduate",
      "Post Graduate",
    ],
  },
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
    options: [
      "Not Yet Decided",
      "Q1 (Jan - Mar)",
      "Q2 (Apr - Jun)",
      "Q3 (Jul - Sep)",
      "Q4 (Oct - Dec)",
    ],
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
    full: true,
  },
  {
    name: "Dropdown",
    label: "Highest Completed Qualification",
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
    options: [
      "CGPA 3.7 - 4.0",
      "CGPA 3.0 - 3.6",
      "CGPA 2.5 - 2.9",
      "Below CGPA 2.5",
      "Awaiting Results",
      "Others",
    ],
  },
  {
    name: "Dropdown9",
    label: "Education Budget",
    options: [
      "Less than 10 lac BDT",
      "Within 20 lac BDT",
      "Within 50 lac BDT",
      "50 lac and Above",
    ],
    full: true,
  },
];

// Common input styling
const inputClass =
  "block h-[46px] w-full min-w-0 rounded-[10px] border border-[#d7d8e5] bg-white px-4 text-[13px] font-normal text-[#252535] outline-none transition placeholder:text-[#999baa] focus:border-[#100b91] focus:ring-2 focus:ring-[#100b91]/10";

const labelClass =
  "mb-2 block text-[13px] font-semibold leading-5 text-[#111827]";

// Required field label
function FieldLabel({ htmlFor, children }) {
  return (
    <label htmlFor={htmlFor} className={labelClass}>
      {children} <span className="text-[#f04438]">*</span>
    </label>
  );
}

// Text input component
function TextField({
  id,
  name,
  label,
  placeholder,
  type = "text",
  autoComplete,
}) {
  return (
    <div className="w-full min-w-0">
      <FieldLabel htmlFor={id}>
        {label}
      </FieldLabel>

      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        maxLength={255}
        autoComplete={autoComplete}
        required
        className={inputClass}
      />
    </div>
  );
}

// Dropdown component
function SelectField({
  id,
  name,
  label,
  options,
  full = false,
}) {
  return (
    <div
      className={`w-full min-w-0 ${
        full ? "col-span-2 max-sm:col-span-1" : ""
      }`}
    >
      <FieldLabel htmlFor={id}>
        {label}
      </FieldLabel>

      <div className="relative w-full">
        <select
          id={id}
          name={name}
          defaultValue=""
          required
          className={`${inputClass} cursor-pointer appearance-none pr-10`}
        >
          <option value="" disabled>
            Select {label}
          </option>

          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <svg
          viewBox="0 0 24 24"
          className="pointer-events-none absolute right-4 top-1/2 size-4 -translate-y-1/2 text-[#666]"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}

// Main Lead Form
export default function LeadForm({
  submitLabel = "Submit Registration",
}) {
  const uid = useId();

  const id = (key) => `${uid}-${key}`;

  const formRef = useRef(null);

  const [status, setStatus] = useState("idle");

  // UTM tracking and referrer
  useEffect(() => {
    const form = formRef.current;

    if (!form) return;

    const params = new URLSearchParams(
      window.location.search
    );

    UTM_KEYS.forEach((key) => {
      const value = params.get(key);

      if (value && form.elements[key]) {
        form.elements[key].value = value;
      }
    });

    if (form.elements.zc_gad) {
      form.elements.zc_gad.value =
        params.get("gclid") || "";
    }

    if (form.elements.zf_referrer_name) {
      form.elements.zf_referrer_name.value =
        document.referrer || "";
    }
  }, []);

  // Phone validation
  function handlePhoneChange(event) {
    const input = event.currentTarget;

    input.value = input.value
      .replace(/\D/g, "")
      .slice(0, 10);

    input.setCustomValidity("");
  }

  // Form submission
  async function onSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;

    if (!form.reportValidity()) {
      return;
    }

    const phone =
      form.elements.PhoneNumber_countrycode;

    if (!/^[0-9]{10}$/.test(phone.value)) {
      phone.setCustomValidity(
        "Please enter a valid 10-digit phone number."
      );

      phone.reportValidity();
      return;
    }

    phone.setCustomValidity("");

    const formData = new FormData(form);

    setStatus("sending");

    try {
      await fetch(ZOHO_ACTION, {
        method: "POST",
        mode: "no-cors",
        body: formData,
      });

      setStatus("done");
    } catch (error) {
      console.error("Zoho submission error:", error);
      setStatus("error");
    }
  }

  // Success message
  if (status === "done") {
    return (
      <div className="flex w-full flex-col items-center gap-3 bg-white py-10 text-center">
        <div className="grid size-14 place-items-center rounded-full bg-green-100 text-green-600">
          <svg
            viewBox="0 0 24 24"
            className="size-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m5 12 4 4L19 6" />
          </svg>
        </div>

        <h3 className="text-lg font-bold text-[#111]">
          Registration Submitted!
        </h3>

        <p className="max-w-sm text-sm leading-6 text-gray-500">
          Thank you for registering with PFEC Global.
          Our counsellor will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <section className="w-full min-w-0 bg-transparent font-montserrat">

      <form
        ref={formRef}
        action={ZOHO_ACTION}
        name="form"
        id="pfec-registration-form"
        method="POST"
        acceptCharset="UTF-8"
        encType="multipart/form-data"
        onSubmit={onSubmit}
        className="flex w-full min-w-0 flex-col gap-5"
      >

        {/* Zoho Hidden Fields */}

        <input
          type="hidden"
          name="zf_referrer_name"
          defaultValue=""
        />

        <input
          type="hidden"
          name="zf_redirect_url"
          defaultValue=""
        />

        <input
          type="hidden"
          name="zc_gad"
          defaultValue=""
        />

        {UTM_KEYS.map((key) => (
          <input
            key={key}
            type="hidden"
            name={key}
            defaultValue=""
          />
        ))}

        {/* TWO COLUMN FORM GRID */}

        <div className="grid w-full grid-cols-2 gap-x-4 gap-y-[18px] max-sm:grid-cols-1">

          {/* First Name */}
          <TextField
            id={id("first")}
            name="Name_First"
            label="First Name"
            placeholder="Enter First Name"
            autoComplete="given-name"
          />

          {/* Last Name */}
          <TextField
            id={id("last")}
            name="Name_Last"
            label="Last Name"
            placeholder="Enter Last Name"
            autoComplete="family-name"
          />

          {/* Email */}
          <TextField
            id={id("email")}
            name="Email"
            label="Email"
            type="email"
            placeholder="Enter Email Address"
            autoComplete="email"
          />

          {/* Phone Number */}
          <div className="w-full min-w-0">
            <FieldLabel htmlFor={id("phone")}>
              Phone Number
            </FieldLabel>

            <div className="flex w-full min-w-0 gap-2">

              <div className="flex h-[46px] w-[68px] shrink-0 items-center justify-center rounded-[10px] border border-[#d7d8e5] bg-[#f8f8fc] text-[13px] font-semibold text-[#171717]">
                +880
              </div>

              <input
                id={id("phone")}
                type="tel"
                name="PhoneNumber_countrycode"
                compname="PhoneNumber"
                phoneFormat="1"
                isCountryCodeEnabled={false}
                placeholder="Enter 10 Digit Number"
                maxLength={10}
                minLength={10}
                pattern="[0-9]{10}"
                title="Please enter exactly 10 digits."
                inputMode="numeric"
                autoComplete="tel-national"
                onChange={handlePhoneChange}
                required
                className={`${inputClass} flex-1 px-3`}
              />

            </div>
          </div>

          {/* All Dropdown Fields */}

          {SELECTS.map((select) => (
            <SelectField
              key={select.name}
              id={id(select.name)}
              {...select}
            />
          ))}

        </div>

        {/* Privacy Policy Checkbox */}

        <label className="mt-1 flex cursor-pointer items-start gap-3">

          <input
            type="checkbox"
            name="Privacy_Consent"
            required
            className="mt-1 size-4 shrink-0 cursor-pointer accent-[#100b91]"
          />

          <span className="text-[11px] leading-[19px] text-[#77798b]">
            I have read and agree to PFEC Global's{" "}

            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#100b91] underline"
            >
              Privacy Policy
            </a>

            {" "}and{" "}

            <a
              href="/terms-and-conditions"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[#100b91] underline"
            >
              Terms & Conditions
            </a>

            . <span className="text-[#f04438]">*</span>
          </span>

        </label>

        {/* Error Message */}

        {status === "error" && (
          <p
            role="alert"
            className="text-center text-sm text-red-600"
          >
            Something went wrong. Please try again.
          </p>
        )}

        {/* Submit Button */}

        <div className="flex w-full justify-center">

          <button
            type="submit"
            disabled={status === "sending"}
            className="flex min-h-[46px] w-full max-w-[260px] items-center justify-center gap-2 rounded-full bg-[#f04435] px-7 py-3 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#d93629] disabled:cursor-wait disabled:opacity-70"
          >
            {status === "sending" ? (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Submitting...
              </>
            ) : (
              submitLabel
            )}
          </button>

        </div>

      </form>
    </section>
  );
}
