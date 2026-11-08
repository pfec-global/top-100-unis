import Image from "next/image";
import { marqueeUniversities } from "@/lib/data";

function Track({ hidden }) {
  return (
    <ul className="flex shrink-0 items-center gap-4 pr-4" aria-hidden={hidden || undefined}>
      {marqueeUniversities.map((u) => (
        <li key={u.src} className="shrink-0">
          <Image
            src={u.src}
            alt={hidden ? "" : u.name}
            width={u.w}
            height={150}
            className="h-14 w-auto rounded-lg sm:h-[68px]"
          />
        </li>
      ))}
    </ul>
  );
}

export default function UniMarquee() {
  return (
    <section aria-label="Top 100 world universities" className="mx-auto max-w-[1400px] px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-8">
        <div className="shrink-0 text-center md:border-r md:border-accent/60 md:pr-8 md:text-left">
          <p className="text-sm text-ink/80">Explore &amp; Apply to</p>
          <p className="bg-[linear-gradient(180deg,#100694_0%,#10069473_100%)] bg-clip-text font-display text-[42px] leading-none text-transparent">Top 100</p>
          <p className="text-sm text-ink/80">World Universities</p>
        </div>
        <div className="group marquee-mask relative w-full overflow-hidden">
          <div className="flex w-max animate-marquee">
            <Track />
            <Track hidden />
          </div>
        </div>
      </div>
    </section>
  );
}
