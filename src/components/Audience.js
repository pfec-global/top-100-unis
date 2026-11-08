import Image from "next/image";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";
import { audience } from "@/lib/data";

export default function Audience() {
  return (
    <section className="bg-white py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-bold text-[#262a8a] sm:text-[28px]">Who Should Attend?</h2>

        <ul className="mt-10 grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
          {audience.map((a, i) => (
            <Reveal as="li" key={a.img} delay={i * 110} className="group flex flex-col items-center text-center">
              <div className="relative">
                {/* hover halo */}
                <span
                  aria-hidden
                  className="absolute -inset-2 rounded-full bg-gradient-to-br from-[#dcd9ff] to-accent/30 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <div
                  className={`relative size-32 overflow-hidden rounded-full ring-4 ring-white shadow-[0_18px_40px_-20px_rgba(39,10,148,0.55)] transition-transform duration-500 group-hover:-translate-y-1.5 sm:size-36 lg:size-[150px] ${
                    a.cutout ? "bg-gradient-to-b from-[#dcd9ff] to-[#b9b3f5]" : ""
                  }`}
                >
                  {a.cutout ? (
                    <Image
                      src={a.img}
                      alt=""
                      width={1200}
                      height={628}
                      sizes="300px"
                      className="absolute top-[6%] left-1/2 h-[190%] w-auto max-w-none -translate-x-[53%] transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    // the source photos have the circle baked in on a cream canvas → zoom past it
                    <Image
                      src={a.img}
                      alt=""
                      width={1024}
                      height={1024}
                      sizes="300px"
                      className="size-full scale-[1.16] object-cover transition-transform duration-700 group-hover:scale-[1.22]"
                    />
                  )}
                </div>
              </div>
              <p className="mt-4 text-sm leading-snug text-ink sm:text-base">
                {a.label[0]} <br className="hidden lg:inline" />
                {a.label[1]}
              </p>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-10 flex flex-col items-center gap-3 text-center">
          <p className="text-xs text-ink/80 sm:text-sm">Sounds like you are one of them? Don&rsquo;t wait any further</p>
          <CtaButton size="md">Sign up for Free</CtaButton>
        </Reveal>
      </div>
    </section>
  );
}
