const paths = {
  arrow: <path d="M5 12h14M13 6l6 6-6 6" />,
  search: (
    <>
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.2" />
    </>
  ),
  doc: (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
      <path d="M14 3v5h5M9 13h6M9 17h4" />
    </>
  ),
  award: (
    <>
      <circle cx="12" cy="9" r="6" />
      <path d="m8.5 14-1.5 7 5-3 5 3-1.5-7" />
    </>
  ),
  passport: (
    <>
      <rect x="5" y="3" width="14" height="18" rx="2" />
      <circle cx="12" cy="10" r="3" />
      <path d="M9 17h6" />
    </>
  ),
  plane: <path d="M10.5 21 12 14l-7.5-1.5L3 10l9.5-.5L17 3c1-1 2.5-1 3 0s0 2-1 3l-6.5 4.5L12 20z" />,
  check: <path d="m5 12 5 5 9-10" />,
  star: <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z" />,
  quote: <path d="M7 7h4v4c0 3-1.5 5-4 6M15 7h4v4c0 3-1.5 5-4 6" />,
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  cap: (
    <>
      <path d="M2 9l10-5 10 5-10 5z" />
      <path d="M6 11v5c0 1.5 2.7 3 6 3s6-1.5 6-3v-5M22 9v6" />
    </>
  ),
  certificate: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M7 8h6M7 12h4" />
      <circle cx="16.5" cy="15.5" r="2.5" />
      <path d="m15 17.5-.8 3.5 2.3-1.2 2.3 1.2-.8-3.5" />
    </>
  ),
  monitor: (
    <>
      <rect x="3" y="4" width="18" height="12" rx="2" />
      <path d="M8 20h8M12 16v4M7 9l2 2 4-4" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7" width="18" height="13" rx="2" />
      <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M3 13h18" />
    </>
  ),
};

export default function Icon({ name, className = "size-5", strokeWidth = 2, fill = "none" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill={fill}
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
