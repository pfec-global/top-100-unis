import Image from "next/image";
import Link from "next/link";
import { asset } from "@/lib/asset";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import RegisterModalProvider from "@/components/RegisterModal";

export const metadata = {
  title: "Thank You | PFEC Global",
  description: "Your registration has been received. A PFEC Global counsellor will contact you shortly.",
};

const steps = [
  { n: "01", title: "We review your profile", text: "Our experts check your details against top 100 university requirements." },
  { n: "02", title: "A counsellor calls you", text: "Expect a call from your nearest PFEC office within 24–48 hours." },
  { n: "03", title: "Get your free assessment", text: "Receive a personalised university shortlist and admission plan." },
];

export default function ThankYou() {
  return (
    <RegisterModalProvider>
      <Header homeHref={asset("/")} />

      <main className="bg-[#f7f7f8]">
        <section className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-12 sm:px-6 sm:py-16 lg:grid-cols-[1fr_1.05fr] lg:gap-14 lg:px-10 lg:py-20">
          {/* Message */}
          <div className="animate-[fadeUp_.7s_ease-out_both]">
            <span className="grid size-16 place-items-center rounded-full bg-green-100 text-green-600 shadow-[0_0_0_8px_rgba(34,197,94,0.08)]">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="m5 12 4 4L19 6" />
              </svg>
            </span>

            <p className="mt-6 text-xs font-semibold tracking-[0.2em] text-accent uppercase">Registration Successful</p>
            <h1 className="mt-2 font-display text-[clamp(3rem,7vw,5rem)] leading-[0.95] text-brand uppercase">
              Thank you!
            </h1>
            <p className="mt-4 max-w-lg text-base leading-7 text-muted sm:text-lg">
              Your free profile assessment request has been received. You&rsquo;re one step closer to studying at one of the world&rsquo;s top 100 universities.
            </p>

            <ol className="mt-8 grid gap-4">
              {steps.map((s) => (
                <li
                  key={s.n}
                  className="group relative flex cursor-default gap-4 overflow-hidden rounded-2xl border border-transparent bg-white p-4 shadow-[0_10px_30px_-20px_rgba(16,6,148,0.35)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-brand/15 hover:shadow-[0_18px_40px_-18px_rgba(16,6,148,0.45)]"
                >
                  {/* accent bar slides in on hover */}
                  <span aria-hidden className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
                  <span className="font-display text-3xl leading-none text-accent transition-transform duration-300 group-hover:scale-110">{s.n}</span>
                  <div>
                    <p className="text-sm font-bold text-ink transition-colors duration-300 group-hover:text-brand sm:text-base">{s.title}</p>
                    <p className="mt-0.5 text-sm leading-6 text-muted">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-accent px-6 text-sm font-semibold text-white shadow-[0_10px_24px_-10px_rgba(232,75,55,0.8)] transition hover:-translate-y-0.5 hover:bg-accent-600"
              >
                Back to Home
              </Link>
              <a
                href="https://pfecglobal.com.bd/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-brand/20 bg-white px-6 text-sm font-semibold text-brand transition hover:-translate-y-0.5 hover:border-brand/40"
              >
                Visit PFEC Global
              </a>
            </div>
          </div>

          {/* Image */}
          <div className="animate-[fadeUp_.9s_ease-out_.15s_both]">
            <Image
              src={asset("/thank-you.webp")}
              alt="Smiling student holding books, ready to study abroad"
              width={1716}
              height={1178}
              priority
              className="h-auto w-full"
            />
          </div>
        </section>
      </main>

      <Footer />
    </RegisterModalProvider>
  );
}
