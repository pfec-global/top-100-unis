import Image from "next/image";
import CtaButton from "./CtaButton";
import { avatars } from "@/lib/data";

export default function Hero() {
  return (
    <section id="top" className="px-3 pt-3 sm:px-6 sm:pt-5 lg:px-8">
      <div className="hero-gradient relative isolate mx-auto max-w-[1400px] overflow-hidden rounded-[24px] sm:rounded-[32px]">
        {/* soft glows */}
        <div aria-hidden className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[#2a1cff]/25 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:22px_22px]" />

        {/* Copy */}
        <div className="grid gap-8 px-5 pt-12 sm:px-10 sm:pt-16 lg:grid-cols-[1.15fr_1fr] lg:gap-12 lg:px-16 lg:pt-20 xl:px-24">
          <h1 className="animate-[fadeUp_.8s_ease-out_both] font-display text-[clamp(3rem,8.5vw,5.5rem)] leading-[0.95] tracking-[0.005em] text-cream uppercase">
            Are you eligible for <br className="hidden sm:block" />
            the world&rsquo;s <span className="relative inline-block text-white">
              top 100
              <svg aria-hidden viewBox="0 0 200 12" preserveAspectRatio="none" className="absolute -bottom-1 left-0 h-2.5 w-full text-accent">
                <path d="M2 9C50 3 150 3 198 8" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
              </svg>
            </span>
            <br />
            universities?
          </h1>

          <div className="flex flex-col justify-center gap-4 lg:max-w-md lg:justify-self-end lg:pt-6">
            <p className="text-base font-bold text-white sm:text-lg">Check your eligibility with expert guidance</p>
            <p className="text-sm leading-relaxed text-white/80 sm:text-[15px]">
              We&rsquo;ll help you strategically plan your application. Get expert guidance and{" "}
              <strong className="font-semibold text-white">FREE end-to-end application assistance</strong> if you qualify.
            </p>
            <div className="mt-2 flex flex-wrap items-center gap-5">
              <CtaButton size="md" />
              <div className="flex items-center gap-3">
                <div className="flex -space-x-3">
                  {avatars.map((a) => (
                    <Image key={a} src={a} alt="" width={40} height={40} className="size-9 rounded-full border-2 border-[#100694] object-cover" />
                  ))}
                </div>
                <p className="text-xs leading-tight text-white/75">
                  Trusted by students
                  <br />
                  heading abroad
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Boarding pass stage */}
        <div className="relative mt-10 pb-10 sm:mt-14 sm:pb-14 lg:mt-12">
          {/* gold sparkles */}
          <Image
            src="/banner_hero.png"
            alt=""
            aria-hidden
            width={626}
            height={358}
            className="animate-twinkle pointer-events-none absolute bottom-0 left-0 w-[70%] max-w-[620px] sparkle sm:w-[45%]"
          />
          <Image
            src="/banner_hero.png"
            alt=""
            aria-hidden
            width={626}
            height={358}
            className="animate-twinkle pointer-events-none absolute right-0 top-0 w-[70%] max-w-[620px] -scale-x-100 sparkle [animation-delay:2s] sm:w-[45%]"
          />

          {/* diagonal stripe runway */}
          <div aria-hidden className="absolute inset-x-0 top-[22%] h-[46%] bg-[#07033a]/80 sm:top-[28%] sm:h-[34%]">
            <div className="stripe-band absolute inset-y-0 left-0 w-1/2 opacity-90 [mask-image:linear-gradient(90deg,#000_40%,transparent)]" />
            <div className="stripe-band absolute inset-y-0 right-0 w-1/2 opacity-90 [mask-image:linear-gradient(270deg,#000_40%,transparent)]" />
          </div>
          <div aria-hidden className="absolute inset-x-0 bottom-0 h-[38%] bg-gradient-to-b from-transparent to-black/70" />

          {/* ticket */}
          <div className="relative z-10 mx-auto w-[92%] max-w-[640px] animate-float">
            <div className="absolute -inset-4 -z-10 rounded-3xl bg-[#5b4dff]/30 blur-2xl" aria-hidden />
            <Image
              src="/banner_ticket.png"
              alt="Boarding pass: Bangladesh to Top 100 Universities in the World. Passenger: You. Free expert guidance from PFEC Global. Class: Student, Seat: Reserved."
              width={2481}
              height={1063}
              priority
              sizes="(max-width: 700px) 92vw, 640px"
              className="h-auto w-full rounded-md shadow-[0_30px_60px_-20px_rgba(0,0,0,0.8)]"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
