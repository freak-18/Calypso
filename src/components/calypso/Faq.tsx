import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Reveal, SectionHeading } from "./Reveal";

const faqs = [
  {
    q: "How long does it take to build a website?",
    a: "Most projects take 2–4 weeks depending on complexity, from discovery call to launch.",
  },
  {
    q: "Do I need to provide content and images?",
    a: "We can work with what you provide, or help you develop content and source imagery as part of your package.",
  },
  {
    q: "What if I don't have a domain or hosting yet?",
    a: "No problem — we handle domain registration and hosting setup for you.",
  },
  {
    q: "Can I update the website myself after launch?",
    a: "Yes. We build on user-friendly platforms and can train you, or handle updates through our maintenance plans.",
  },
  {
    q: "Do you offer e-commerce websites?",
    a: "Yes, including payment gateway integration, product catalogs, and order management.",
  },
  {
    q: "What's included in maintenance?",
    a: "Monthly backups, security monitoring, content updates, and performance checks.",
  },
];

export function Faq() {
  return (
    <section id="faq" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />

        <Reveal delay={100}>
          <Accordion type="single" collapsible className="mt-12 space-y-3">
            {faqs.map((f, i) => (
              <AccordionItem
                key={f.q}
                value={`item-${i}`}
                className="surface-card rounded-2xl border-b-0 px-6"
              >
                <AccordionTrigger className="py-5 text-left font-display text-base font-semibold hover:no-underline">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-sm leading-relaxed text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Reveal>
      </div>
    </section>
  );
}
