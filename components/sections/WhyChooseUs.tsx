import { Check } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Section, SectionHeading } from "@/components/ui/Section";
import { WHY_CHOOSE_US, PRICING, PRICING_DISCLAIMER } from "@/lib/content";

export function WhyChooseUs({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section id="why-us" variant="dark-alt" embedded={embedded}>
      <SectionHeading
        compact
        dark
        title="Why choose us"
        subtitle="Reliable, friendly service from a local team that treats every job like it matters."
      />

      <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-4 md:gap-2">
        {WHY_CHOOSE_US.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 rounded-lg border border-white/10 bg-navy-800 p-3 md:gap-1.5 md:p-2.5"
          >
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-400 md:h-3.5 md:w-3.5" />
            <span className="text-sm leading-snug text-slate-300 md:text-xs">
              {item}
            </span>
          </li>
        ))}
      </ul>

      <div
        id="pricing"
        className="mt-5 scroll-mt-[calc(var(--header-height)+env(safe-area-inset-top,0px)+var(--panel-top-gap))] md:mt-5"
      >
        <SectionHeading
          compact
          dark
          title="Starting prices"
          subtitle="Transparent pricing to help you plan. Every job gets a free personalized quote."
        />

        <div className="overflow-hidden rounded-xl border border-white/10 bg-navy-800 shadow-sm">
          <ul>
            {PRICING.map((row, i) => (
              <li
                key={row.service}
                className={`grid grid-cols-[1fr_auto] items-center gap-3 px-4 py-2.5 md:gap-2 md:px-4 md:py-2 ${
                  i !== PRICING.length - 1 ? "border-b border-white/10" : ""
                }`}
              >
                <span className="text-sm font-medium text-white md:text-xs">
                  {row.service}
                </span>
                <span className="text-base font-bold text-blue-400 md:text-sm">
                  {row.price}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-3 text-xs leading-relaxed text-slate-400 md:mt-2 md:text-xs">
          {PRICING_DISCLAIMER}
        </p>

        <div className="mt-4 md:mt-3">
          <Button href="#contact" size="sm" className="w-full sm:w-auto">
            Get a free quote
          </Button>
        </div>
      </div>
    </Section>
  );
}
