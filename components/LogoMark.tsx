export function LogoMark({ className = "h-11 w-11" }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={className} aria-hidden="true">
      <circle cx="32" cy="32" r="32" fill="#0F382A" />
      <path
        d="M14 40c2 10 10 16 20 16 8 0 14-4 16-10-6 2-12 1-16-2 2 4 1 8-3 10-6 2-12-1-14-8-1-3-2-5-3-6z"
        fill="#134232"
      />
      <ellipse cx="24" cy="28" rx="9" ry="10" fill="#F0C8A8" />
      <path
        d="M14 30c0-12 6-18 12-18 7 0 12 6 12 14 0 3-1 6-3 8-2-6-6-8-10-7-5 1-9 2-11 3z"
        fill="#F4EBD9"
      />
      <path d="M19 27c2 2 5 2 7 0" fill="none" stroke="#0F382A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M26 27c2 2 5 2 7 0" fill="none" stroke="#0F382A" strokeWidth="1.2" strokeLinecap="round" />
      <path d="M21 33c2.5 2.4 6.5 2.4 9 0" fill="none" stroke="#B85D36" strokeWidth="1.2" strokeLinecap="round" />
      <circle cx="27" cy="22.5" r="1" fill="#B85D36" />
      <ellipse cx="44" cy="40" rx="8" ry="9" fill="#B85D36" />
      <ellipse cx="44" cy="31" rx="5" ry="1.4" fill="#D49B35" />
      <circle cx="44" cy="28.6" r="1.3" fill="#FCF9F2" />
    </svg>
  );
}
