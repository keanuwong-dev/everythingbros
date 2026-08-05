import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { About } from "@/components/sections/About";
import { ServiceArea } from "@/components/sections/ServiceArea";
import { Contact } from "@/components/sections/Contact";
import { PagePart } from "@/components/ui/Section";

export default function Home() {
  return (
    <>
      <PagePart variant="dark" hero contentAlign="center">
        <Hero />
      </PagePart>

      <PagePart variant="light" contentAlign="start">
        <Services embedded />
      </PagePart>

      <PagePart variant="dark-alt" contentAlign="start">
        <WhyChooseUs embedded />
      </PagePart>

      <PagePart variant="dark" contentAlign="center">
        <About embedded />
      </PagePart>

      <PagePart variant="light-alt" contentAlign="start">
        <ServiceArea embedded />
      </PagePart>

      <div className="snap-none" data-free-scroll>
        <Contact />
      </div>
    </>
  );
}
