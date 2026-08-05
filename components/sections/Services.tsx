import { HeartHandshake } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section, SectionHeading } from "@/components/ui/Section";
import {
  EXTERIOR_SERVICES,
  HOME_ASSISTANCE_SERVICES,
  PAINTING_CALLOUT,
} from "@/lib/content";

export function Services({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section id="services" variant="light" embedded={embedded}>
      <SectionHeading
        compact
        className="shrink-0"
        title="Our services"
        subtitle="Exterior cleaning and home assistance from one trusted local team."
      />

      <div className="flex min-h-0 flex-1 flex-col gap-5 md:grid md:grid-cols-[7fr_3fr] md:gap-5">
        <div className="flex min-h-0 min-w-0 flex-col">
          <h3 className="mb-2 shrink-0 text-sm font-semibold text-navy-950 md:text-sm">
            Exterior services
          </h3>
          <Card className="p-3 md:min-h-0 md:flex-1 md:overflow-hidden md:p-3">
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 md:grid-cols-2 md:content-start lg:grid-cols-3">
              {EXTERIOR_SERVICES.map((service) => {
                const Icon = service.icon;
                return (
                  <Card key={service.name} className="p-3 md:p-2.5">
                    <div className="flex items-start gap-2.5 md:gap-2">
                      <div className="shrink-0 rounded-lg bg-blue-500/10 p-2 md:p-1.5">
                        <Icon className="h-4 w-4 text-blue-500 md:h-4 md:w-4" />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-sm font-semibold leading-tight text-navy-950 md:text-xs">
                          {service.name}
                        </h4>
                        {service.details && (
                          <ul className="mt-1 space-y-0.5">
                            {service.details.map((detail) => (
                              <li
                                key={detail}
                                className="text-xs leading-snug text-slate-500 md:text-[10px]"
                              >
                                {detail}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          </Card>
        </div>

        <div className="flex min-h-0 min-w-0 flex-col">
          <h3 className="mb-2 shrink-0 text-sm font-semibold text-navy-950 md:text-sm">
            Home assistance
          </h3>
          <Card className="flex flex-col p-3 md:min-h-0 md:flex-1 md:p-3">
            <HeartHandshake className="mb-2 h-5 w-5 shrink-0 text-blue-500 md:h-4 md:w-4" />
            <div className="flex flex-wrap content-start gap-2 md:gap-1.5">
              {HOME_ASSISTANCE_SERVICES.map((service) => (
                <span
                  key={service}
                  className="rounded-full bg-slate-50 px-2.5 py-1 text-xs text-slate-600 md:px-2 md:py-0.5 md:text-[10px]"
                >
                  {service}
                </span>
              ))}
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-4 shrink-0 md:mt-4">
        <p className="mx-auto max-w-3xl text-center text-xs leading-relaxed text-slate-600 md:text-xs">
          {PAINTING_CALLOUT}
        </p>
      </div>
    </Section>
  );
}
