import { CheckCircle2, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { HERO } from "@/lib/content";
import { SITE } from "@/lib/constants";

export function Hero() {
  return (
    <section className="relative flex flex-1 flex-col items-center justify-center text-white">
      <div className="relative mx-auto grid w-full max-w-6xl items-center gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-8">
        <div className="text-center lg:text-left">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-400 md:text-sm">
            {HERO.subhead}
          </p>
          <h1 className="mt-2 text-4xl font-bold leading-[1.1] tracking-tight md:text-4xl lg:text-5xl">
            {HERO.headline}
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-300 md:text-base lg:mx-0">
            {HERO.body}
          </p>

          <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
            {HERO.serviceTags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 bg-navy-800 px-2.5 py-1 text-xs text-slate-300 md:text-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-6 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center lg:justify-start">
            <Button href="#contact" size="sm" className="w-full sm:w-auto">
              Get a free quote
            </Button>
            <Button href={SITE.phoneHref} variant="secondary" size="sm" className="w-full sm:w-auto">
              Call now
            </Button>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-x-4 gap-y-2 lg:justify-start">
            {HERO.trustSignals.map((signal) => (
              <span
                key={signal}
                className="flex items-center gap-1.5 text-sm text-slate-300 md:text-xs"
              >
                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-400" />
                {signal}
              </span>
            ))}
            <span className="flex items-center gap-1.5 text-sm text-slate-300 md:text-xs">
              <MapPin className="h-4 w-4 shrink-0 text-blue-400" />
              Snohomish County, WA
            </span>
          </div>
        </div>

        <div className="relative mx-auto hidden aspect-[4/3] w-full max-w-sm overflow-hidden rounded-xl border border-white/10 bg-navy-800 md:block lg:max-w-none">
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 p-4 text-center">
            <div className="rounded-full bg-blue-500/20 p-3">
              <MapPin className="h-8 w-8 text-blue-400" />
            </div>
            <p className="text-xs font-medium text-slate-300">Hero photo placeholder</p>
          </div>
        </div>
      </div>
    </section>
  );
}
