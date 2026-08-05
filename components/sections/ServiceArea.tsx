import { MapPin, Star } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Section, SectionAnchor, SectionHeading } from "@/components/ui/Section";
import { TESTIMONIALS } from "@/lib/content";
import { NEIGHBORHOODS, SITE } from "@/lib/constants";

export function ServiceArea({ embedded = false }: { embedded?: boolean }) {
  return (
    <Section id="service-area" variant="light-alt" embedded={embedded}>
      <SectionHeading
        compact
        title="Service area"
        subtitle="Proudly serving homeowners across Snohomish County."
      />

      <div className="grid shrink-0 grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        <div className="h-44 overflow-hidden rounded-xl border border-slate-200 bg-slate-100 md:h-36">
          <iframe
            title="Everything Bros service area map"
            src="https://maps.google.com/maps?q=Edmonds,+WA&t=&z=11&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        <div className="min-w-0">
          <div className="flex items-center gap-2 text-navy-950">
            <MapPin className="h-4 w-4 shrink-0 text-blue-500 md:h-3.5 md:w-3.5" />
            <h3 className="text-sm font-semibold md:text-sm">Neighborhoods we serve</h3>
          </div>
          <ul className="mt-3 grid grid-cols-2 gap-1.5 md:mt-2 md:gap-1">
            {NEIGHBORHOODS.map((neighborhood) => (
              <li
                key={neighborhood}
                className="rounded bg-white px-2 py-1 text-xs text-slate-600 shadow-sm md:px-1.5 md:py-0.5 md:text-[10px]"
              >
                {neighborhood}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs leading-relaxed text-slate-600 md:mt-2 md:text-[10px]">
            <span className="font-medium text-navy-950">Seasonal: </span>
            {SITE.seasonalNote}
          </p>
        </div>
      </div>

      <SectionAnchor id="reviews" className="mt-6 md:mt-5">
        <SectionHeading
          compact
          title="What customers say"
          subtitle="Real feedback from homeowners in Edmonds, Lynnwood, and surrounding neighborhoods."
        />

        <div className="grid grid-cols-1 gap-3 md:grid-cols-3 md:gap-3">
          {TESTIMONIALS.map((testimonial) => (
            <Card key={testimonial.author + testimonial.location} className="p-4 md:p-3">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 fill-blue-500 text-blue-500 md:h-3 md:w-3"
                  />
                ))}
              </div>
              <blockquote className="mt-2 text-sm leading-relaxed text-slate-600 md:mt-1.5 md:text-[10px]">
                &ldquo;{testimonial.quote}&rdquo;
              </blockquote>
              <footer className="mt-2 text-sm font-semibold text-navy-950 md:mt-1.5 md:text-[10px]">
                {testimonial.author}
                <span className="font-normal text-slate-600">
                  {" "}
                  · {testimonial.location}
                </span>
              </footer>
            </Card>
          ))}
        </div>

        <div className="mt-4 shrink-0 text-center md:mt-3">
          <Button href="#contact" variant="secondary" size="sm" className="w-full sm:w-auto">
            Leave a review
          </Button>
        </div>
      </SectionAnchor>
    </Section>
  );
}
