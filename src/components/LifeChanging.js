import Image from "next/image";
import { asset } from "@/lib/asset";
import CtaButton from "./CtaButton";
import Documents from "./Documents";
import Reveal from "./Reveal";
import { lifeBenefits } from "@/lib/data";

// Desktop positions: 01 & 02 on the left, 03 & 04 on the right (right-aligned), staggered like the design.
const positions = [
  "lg:top-0 lg:left-0",
  "lg:top-[250px] lg:left-[60px] xl:left-[70px]",
  "lg:top-0 lg:right-0 lg:text-right",
  "lg:top-[250px] lg:right-[60px] xl:right-[70px] lg:text-right",
];

export default function LifeChanging() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,#FBFBFB_0%,#DCD9FF_55%,#FBFBFB_100%)] pt-16 pb-16 sm:pt-20 sm:pb-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">
        <Reveal className="mx-auto max-w-6xl text-center">
          <h2 className="text-2xl leading-tight font-bold text-ink sm:text-3xl lg:text-[28px] xl:text-[30px]">
            <span className="text-[#262a8a]">More than Just Choosing a University.</span> A Life Changing Opportunity
          </h2>
          <p className="mx-auto mt-3 max-w-3xl text-sm leading-relaxed text-ink/80 sm:text-[15px]">
            The right university experience can influence more than your academic qualifications. It can shape the way
            you think, the people you meet, the opportunities you discover and the future you build.
          </p>
        </Reveal>

        <div className="relative mt-10 lg:mt-10 lg:h-[640px]">
          {/* Girl + concentric rings */}
          <div className="pointer-events-none relative mx-auto h-[340px] sm:h-[440px] lg:absolute lg:inset-x-0 lg:bottom-0 lg:h-[600px]">
            <div aria-hidden className="absolute inset-0 flex items-end justify-center">
              {["h-[104%]", "h-[87%]", "h-[70%]"].map((h, i) => (
                <span
                  key={h}
                  className={`absolute top-[54%] left-1/2 aspect-square -translate-x-1/2 -translate-y-1/2 animate-[ringPulse_6s_ease-in-out_infinite] rounded-full border-[1.5px] border-[#8f86e8]/60 ${h}`}
                  style={{ animationDelay: `${i * 0.6}s` }}
                />
              ))}
              <span className="absolute top-1/2 left-1/2 aspect-square w-[min(300px,60%)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/50 blur-2xl" />
            </div>
            <Image
              src={asset("/avater/girl.png")}
              alt="Smiling student holding books, ready to study abroad"
              width={1200}
              height={628}
              sizes="(max-width: 1024px) 160vw, 1070px"
              className="absolute bottom-0 left-1/2 h-full w-auto max-w-none -translate-x-[53%] [mask-image:linear-gradient(to_bottom,#000_78%,transparent_100%)]"
            />
          </div>

          {/* Benefit cards */}
          <ol className="relative z-10 -mt-6 grid gap-4 sm:grid-cols-2 lg:mt-0 lg:block">
            {lifeBenefits.map((b, i) => (
              <Reveal
                as="li"
                key={b.title}
                delay={i * 100}
                className={`group rounded-2xl bg-white/65 p-6 shadow-[0_18px_40px_-24px_rgba(39,10,148,0.35)] ring-1 ring-white backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/85 hover:shadow-[0_24px_50px_-22px_rgba(39,10,148,0.45)] lg:absolute lg:w-[290px] xl:w-[310px] ${positions[i]}`}
              >
                <p className="text-xl font-light text-accent">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-2 text-lg leading-snug font-bold text-brand sm:text-xl">{b.title}</h3>
                <p className="mt-2 text-[13px] leading-relaxed text-ink/75">{b.text}</p>
              </Reveal>
            ))}
          </ol>

          {/* CTA bar */}
          <Reveal className="relative z-20 mx-auto mt-6 flex max-w-[560px] flex-col items-center gap-4 rounded-2xl bg-white p-6 text-center shadow-[0_24px_60px_-24px_rgba(39,10,148,0.45)] sm:flex-row sm:justify-between sm:text-left lg:absolute lg:bottom-8 lg:left-1/2 lg:mt-0 lg:w-[560px] lg:-translate-x-1/2">
            <p className="text-base leading-snug text-ink sm:max-w-[240px]">Ready to Turn your Study Abroad Dreams into Reality?</p>
            <div className="flex flex-col items-center gap-2">
              <CtaButton size="md" arrow={false} className="px-7">
                Book Free Consultation
              </CtaButton>
              <p className="text-xs text-ink/70">✨ Free Guidance | Open Now ✨</p>
            </div>
          </Reveal>
        </div>
      </div>
      <Documents />
    </section>
  );
}
