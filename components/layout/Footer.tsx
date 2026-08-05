import { Mail, Phone } from "lucide-react";
import { NAV_LINKS, SITE } from "@/lib/constants";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-navy-950 pb-[env(safe-area-inset-bottom)] text-slate-400">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="text-lg font-bold text-white">{SITE.name}</p>
            <p className="mt-1 text-sm">{SITE.tagline}</p>
            <p className="mt-4 text-sm leading-relaxed">{SITE.seasonalNote}</p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Quick links
            </p>
            <ul className="mt-4 space-y-2">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm transition-colors hover:text-white"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-300">
              Contact
            </p>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href={SITE.phoneHref}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4 shrink-0" />
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a
                  href={SITE.emailHref}
                  className="flex items-center gap-2 text-sm transition-colors hover:text-white"
                >
                  <Mail className="h-4 w-4 shrink-0" />
                  {SITE.email}
                </a>
              </li>
            </ul>
            <div className="mt-4 flex gap-3">
              <a
                href={SITE.instagram}
                aria-label="Instagram"
                className="rounded-lg border border-white/10 p-2 transition-colors hover:border-blue-500 hover:text-white"
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a
                href={SITE.facebook}
                aria-label="Facebook"
                className="rounded-lg border border-white/10 p-2 transition-colors hover:border-blue-500 hover:text-white"
              >
                <FacebookIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-sm">
          © {year} {SITE.name}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
