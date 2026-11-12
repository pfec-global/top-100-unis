
import LeadForm from "./LeadForm";
import Reveal from "./Reveal";
import { benefits } from "@/lib/data";

export default function WhyChoose() {
  return (
    <section id="why" className="bg-[#f7f7f8] py-16 sm:py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-10">

        {/* Left Column - Why Choose PFEC */}
        <div className="w-full min-w-0">
          <Reveal>
            <p className="text-2xl font-light text-ink sm:text-[32px]">
              Why Choose
            </p>

            <h2 className="text-2xl leading-tight font-bold text-ink sm:text-[32px]">
              PFEC Global for Study Abroad Assistance?
            </h2>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2 sm:gap-y-14">
            {benefits.map((b, i) => (
              <Reveal
                key={b.title}
                delay={(i % 2) * 120}
                className="group"
              >
                <h3 className="text-lg leading-snug font-bold text-brand sm:text-xl">
                  {b.title[0]}
                  <br />
                  {b.title[1]}
                </h3>

                <span
                  aria-hidden
                  className="mt-3 block h-0.5 w-14 rounded-full bg-[#9d97d8] transition-all duration-500 group-hover:w-24 group-hover:bg-accent"
                />

                <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted">
                  {b.text}
                </p>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Right Column - Registration Form */}
        <Reveal
          id="register"
          className="w-full min-w-0 scroll-mt-24 lg:sticky lg:top-24"
        >
          <div className="w-full min-w-0 rounded-2xl bg-white p-5 shadow-[0_24px_60px_-28px_rgba(16,6,148,0.20)] ring-1 ring-ink/5 sm:p-7">

            <h2 className="mb-6 text-center text-lg font-bold text-accent sm:text-xl">
              Sign up for a Free Profile Assessment
            </h2>

            <LeadForm />
          </div>
        </Reveal>

      </div>
    </section>
  );
}
