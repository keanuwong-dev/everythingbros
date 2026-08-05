import { Section, SectionHeading } from "@/components/ui/Section";
import { ABOUT, FOUNDERS } from "@/lib/content";

export function About({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section id="about" variant="dark" embedded={embedded}>
      <SectionHeading
        compact
        dark
        centered
        title={ABOUT.title}
        subtitle={ABOUT.intro}
      />

      <div className="flex min-h-0 flex-1 flex-col items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-12 md:flex-row md:gap-[calc(1in+3rem)] lg:gap-[calc(1in+4rem)]">
          {FOUNDERS.map((founder) => (
            <div
              key={founder.name}
              className="flex w-full max-w-sm flex-col items-center text-center md:w-[2.5in] md:max-w-[2.5in]"
            >
              <div
                className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border border-white/10 bg-navy-800 text-sm text-slate-400 md:h-32 md:w-32"
                aria-label={`${founder.name} photo placeholder`}
              >
                Photo
              </div>
              <h3 className="mt-4 text-base font-semibold text-white md:text-sm">
                {founder.name}
              </h3>
              <p className="text-sm font-medium text-blue-400 md:text-xs">
                {founder.role}
              </p>
              <p className="mt-2 w-full text-sm leading-relaxed text-slate-300 md:text-sm">
                {founder.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
