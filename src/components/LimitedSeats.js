import CtaButton from "./CtaButton";
import Reveal from "./Reveal";

function WarningIcon() {
  return (
    <div className="relative mx-auto size-14 sm:size-16">
      {/* soft pulse behind the icon */}
      <span aria-hidden className="absolute inset-1 animate-ping rounded-full bg-accent/20 [animation-duration:2.4s] motion-reduce:hidden" />
      <svg viewBox="0 0 64 60" className="relative size-full animate-[nudge_3.2s_ease-in-out_infinite] drop-shadow-[0_8px_12px_rgba(232,75,55,0.35)]" aria-hidden>
        <defs>
          <linearGradient id="warn-face" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ff7a66" />
            <stop offset="0.55" stopColor="#e84b37" />
            <stop offset="1" stopColor="#c9301f" />
          </linearGradient>
          <linearGradient id="warn-shine" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
            <stop offset="0.6" stopColor="#fff" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M27.4 5.2a5.3 5.3 0 0 1 9.2 0l24.6 44.1A5.3 5.3 0 0 1 56.6 57H7.4a5.3 5.3 0 0 1-4.6-7.7z" fill="url(#warn-face)" />
        <path d="M27.4 5.2a5.3 5.3 0 0 1 9.2 0L48 25.6C38 30 22 30 12.5 31.6z" fill="url(#warn-shine)" />
        <rect x="28.6" y="18" width="6.8" height="21" rx="3.4" fill="#fff" />
        <circle cx="32" cy="46.5" r="3.9" fill="#fff" />
      </svg>
    </div>
  );
}

export default function LimitedSeats() {
  return (
    <section className="bg-[#FDEDEB] py-14 sm:py-16">
      <Reveal className="mx-auto flex max-w-3xl flex-col items-center px-4 text-center sm:px-6">
        <WarningIcon />
        <h2 className="mt-5 text-xl font-bold text-ink sm:text-2xl lg:text-[26px]">Limited Seats Available at top universities!</h2>
        <p className="mt-3 text-sm leading-relaxed text-ink/80 sm:text-[15px]">
          This is your best chance to apply for upcoming intakes before deadlines close.
          <br className="hidden sm:block" /> By applying with our assistance, you will get faster acceptances and up to
          100% scholarship!
        </p>
        <CtaButton size="md" className="mt-6">
          Get Started for Free
        </CtaButton>
      </Reveal>
    </section>
  );
}
