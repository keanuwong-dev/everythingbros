"use client";

import { useState } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-navy-950 pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 sm:py-4 lg:px-8">
        <a href="#" className="flex flex-col leading-none">
          <span className="text-lg font-bold text-white">{SITE.name}</span>
          <span className="text-xs text-slate-400">{SITE.tagline}</span>
        </a>

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-slate-300 transition-colors hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Button href="#contact" size="sm">
            Get a quote
          </Button>
        </div>

        <button
          type="button"
          className="min-h-11 min-w-11 rounded-lg p-2 text-white lg:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <div
        className={cn(
          "border-t border-white/10 bg-navy-950 lg:hidden",
          open ? "block" : "hidden",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 transition-colors hover:bg-navy-800 hover:text-white"
            >
              {link.label}
            </a>
          ))}
          <a
            href={SITE.phoneHref}
            className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium text-slate-300 hover:bg-navy-800 hover:text-white"
          >
            <Phone className="h-4 w-4" />
            {SITE.phone}
          </a>
          <Button href="#contact" className="mt-2 w-full" onClick={() => setOpen(false)}>
            Get a quote
          </Button>
        </nav>
      </div>
    </header>
  );
}
