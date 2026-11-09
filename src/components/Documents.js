import Icon from "./Icon";
import Reveal from "./Reveal";
import { documents } from "@/lib/data";

export default function Documents() {
  return (
    <div className="mx-auto mt-12 max-w-4xl px-4 sm:mt-20 sm:px-6">
        <Reveal className="text-center">
          <h2 className="text-[22px] leading-tight font-bold text-ink sm:text-3xl lg:text-[32px]">
            <span className="text-[#262a8a]">Documents to Carry for the</span>
            <br className="hidden sm:block" />{" "}
            Profile Assessment Session &amp; the World Study Fair
          </h2>
          <p className="mt-3 text-sm text-ink/80 sm:text-[15px]">These will help you apply on spot and claim your rewards!</p>
        </Reveal>

        <ul className="mt-6 grid gap-2.5 sm:mt-8 sm:flex sm:flex-wrap sm:justify-center sm:gap-4">
          {documents.map((d, i) => (
            <Reveal
              as="li"
              key={d.label}
              delay={i * 70}
              className="group flex w-full items-center gap-3 rounded-xl bg-white px-3.5 py-2.5 text-[13px] leading-snug text-ink sm:w-auto sm:px-5 sm:py-3 sm:text-sm shadow-[0_10px_30px_-18px_rgba(39,10,148,0.45)] ring-1 ring-[#dcd9ff] transition-all duration-300 hover:-translate-y-0.5 hover:ring-accent/40 hover:shadow-[0_16px_34px_-18px_rgba(232,75,55,0.5)]"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                <Icon name={d.icon} className="size-[18px]" strokeWidth={1.8} />
              </span>
              {d.label}
            </Reveal>
          ))}
        </ul>
    </div>
  );
}
