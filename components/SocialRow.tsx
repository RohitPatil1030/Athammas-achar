function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" fill="currentColor">
      <path d="M14.2 8.5V6.8c0-.7.5-1 1.2-1H17V3h-2.1C12.2 3 11 4.4 11 6.6v1.9H9v2.7h2V21h3.2v-9.8h2.2l.4-2.7h-2.6z" />
    </svg>
  );
}

export function SocialRow() {
  return (
    <div>
      <p className="text-sm font-medium text-forest">Social channels</p>
      <div className="mt-3 flex gap-3" aria-label="Social channels opening soon">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-cream text-forest">
          <InstagramIcon />
          <span className="sr-only">Instagram, opening soon</span>
        </span>
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-forest/15 bg-cream text-forest">
          <FacebookIcon />
          <span className="sr-only">Facebook, opening soon</span>
        </span>
      </div>
      <p className="mt-2 text-sm text-forest/70">Our social tables are being set.</p>
    </div>
  );
}
