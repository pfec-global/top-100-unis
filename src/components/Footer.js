import Image from "next/image";
import { asset } from "@/lib/asset";
import CountUp from "./CountUp";
import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

const stats = [
  { to: 22000, suffix: "+", label: ["Students", "Assisted"] },
  { to: 550, suffix: "+", label: ["Institutions across", "11 Countries"] },
  { to: 19, suffix: "+", label: ["Years of", "Experience"] },
  { to: 17, suffix: "", label: ["Offices across", "the Globe"] },
];

const legal = [
  { href: "https://pfecglobal.com.bd/terms-of-use/", label: "Terms & Conditions" },
  { href: "https://pfecglobal.com.bd/privacy-policy/", label: "Privacy Policy" },
];

export default function Footer() {
  return (
    <footer>
      <div className="relative isolate overflow-hidden bg-[#270A94] py-14 sm:py-16 lg:py-20">
        <div aria-hidden className="absolute -top-32 -left-32 -z-10 size-[460px] rounded-full bg-[#4a2bd6]/40 blur-[120px]" />
        <div aria-hidden className="absolute -right-24 -bottom-40 -z-10 size-[420px] rounded-full bg-[#100694]/60 blur-[110px]" />
        <div aria-hidden className="stripe-band absolute right-0 bottom-0 -z-10 h-14 w-[40%] opacity-[0.12] [mask-image:linear-gradient(270deg,#000,transparent)]" />

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 sm:px-6 lg:grid-cols-[1fr_auto] lg:gap-16 lg:px-10">
          <Reveal>
            <Image
              src={asset("/pfec_footer.png")}
              alt="PFEC Global – Study Abroad | Visa"
              width={395}
              height={153}
              className="h-14 w-auto rounded-md sm:h-16"
            />
            <h2 className="mt-6 text-2xl leading-tight font-bold text-white sm:text-[28px]">
              Your study abroad journey starts with one conversation.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-white/80">
              Beginning in 2006, PFEC Global&rsquo;s expertise in student migration consultancy evolved from a single
              Melbourne office to a multinational presence, spanning Australia, Bangladesh, Sri Lanka, and India. We now
              proudly represent international educational institutions, consistently turning students&rsquo; dreams into
              their reality.
            </p>
            <CtaButton size="md" className="mt-6">
              Book Free Consultation
            </CtaButton>
          </Reveal>

          <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:w-[440px]">
            {stats.map((s, i) => (
              <Reveal
                as="li"
                key={s.label.join(" ")}
                delay={i * 90}
                className="rounded-xl bg-white px-4 py-4 shadow-[0_18px_40px_-20px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1 sm:px-5"
              >
                <CountUp to={s.to} suffix={s.suffix} className="block text-2xl font-bold text-accent sm:text-[26px]" />
                <p className="mt-1 text-xs leading-snug text-ink/80 sm:text-[13px]">
                  {s.label[0]}
                  <br />
                  {s.label[1]}
                </p>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>

      <div className="bg-[#1a1a1a]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/75 sm:flex-row sm:px-6 sm:text-[13px] lg:px-10">
          <p>&copy; {new Date().getFullYear()} PFEC Global | All Rights Reserved</p>
          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {legal.map((l) => (
              <a key={l.label} href={l.href} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-white">
                {l.label}
              </a>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  );
}
