import Image from "next/image";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import { destinations } from "@/lib/data";

export default function Destinations() {
  return (
    <section id="destinations" className="bg-[#f3f2f8] py-16 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-4xl text-center">
          <h2 className="text-2xl leading-tight font-bold text-ink sm:text-3xl lg:text-[32px]">
            <span className="text-[#262a8a]">Exceptional universities.</span> Global opportunities. Your choice.
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-ink/80 sm:text-[15px]">
            Explore our partner institutions among the world&rsquo;s top 100 and discover where your next academic chapter could take you.
          </p>
        </Reveal>

        <div className="mt-10 space-y-5 sm:mt-12 sm:space-y-6">
          {destinations.map((d, i) => (
            <Reveal
              key={d.id}
              delay={i * 80}
              className="rounded-3xl bg-white px-4 py-7 shadow-[0_18px_50px_-30px_rgba(16,6,148,0.35)] ring-1 ring-ink/5 transition-shadow duration-300 hover:shadow-[0_24px_60px_-28px_rgba(16,6,148,0.45)] sm:px-8 sm:py-8"
            >
              <h3 className="flex items-center justify-center gap-3 text-lg font-bold text-ink sm:text-xl">
                <Image
                  src={d.flag}
                  alt=""
                  width={96}
                  height={96}
                  className="size-10 rounded-full shadow-[0_6px_14px_-6px_rgba(0,0,0,0.4)] sm:size-11"
                />
                {d.country}
              </h3>

              <ul className="mt-6 flex flex-wrap justify-center gap-x-6 gap-y-5 sm:gap-x-8">
                {d.unis.map((u) => (
                  <li
                    key={u.src}
                    className="w-[calc(50%-12px)] transition-transform duration-300 hover:-translate-y-1 hover:scale-[1.03] sm:w-[calc(50%-16px)] lg:w-[calc(25%-24px)]"
                  >
                    <Image
                      src={u.src}
                      alt={u.name}
                      width={u.w ?? 326}
                      height={u.h ?? 93}
                      className="mx-auto h-auto w-full max-w-[260px] mix-blend-multiply brightness-[1.06] contrast-[1.05]"
                    />
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-ink/80 sm:text-base">
            Our team of experts can provide free end-to-end assistance based on your profile
          </p>
          <CtaButton variant="outline" size="lg" className="rounded-xl">
            Book a FREE Consultation
          </CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
