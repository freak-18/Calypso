import { useState, useEffect } from "react";
import { MessageCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CtaButton, CtaLink } from "./Cta";
import { Reveal, SectionHeading } from "./Reveal";
import { getSelectedService, clearSelectedService } from "@/lib/quoteStore";

const needs = [
  "Starter Website",
  "Business Website",
  "Premium Website",
  "E-Commerce",
  "Maintenance",
  "Domain & Hosting",
  "Custom Feature",
  "Not Sure Yet",
];

const WA_NUMBER = "916374423734";

export function Contact() {
  const [need, setNeed] = useState("");
  const [desc, setDesc] = useState("");

  // Auto-fill when navigated from a service card
  useEffect(() => {
    const prefill = getSelectedService();
    if (prefill.service) {
      setNeed(prefill.service);
      setDesc(prefill.desc);
      clearSelectedService();
    }

    const handler = (e: Event) => {
      const { service, desc } = (e as CustomEvent<{ service: string; desc: string }>).detail;
      setNeed(service);
      setDesc(desc);
    };
    window.addEventListener("calypso:service-selected", handler);
    return () => window.removeEventListener("calypso:service-selected", handler);
  }, []);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const name     = fd.get("name") as string;
    const business = fd.get("business") as string;
    const phone    = fd.get("phone") as string;
    const email    = fd.get("email") as string;
    const project  = fd.get("project") as string || desc;

    const msg = [
      `Hi CalypsoWebsiteBuilders! I would like to get a quote.`,
      ``,
      `>> Name: ${name}`,
      business ? `>> Business: ${business}` : null,
      `>> Phone: ${phone}`,
      `>> Email: ${email}`,
      need ? `>> Service: ${need}` : null,
      project ? `>> Project:\n${project}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    window.open(
      `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(msg)}`,
      "_blank",
      "noopener,noreferrer",
    );

    (e.currentTarget as HTMLFormElement).reset();
    setNeed("");
    setDesc("");
  }

  return (
    <section id="contact" className="relative overflow-hidden py-16 sm:py-24 lg:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem]"
        style={{ background: "var(--gradient-abyss)", transform: "rotate(180deg)" }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-14">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Ready to Build Your Digital Presence?"
              subtitle="Tell us about your business — we'll get back to you with a free consultation and quote."
            />
            <Reveal delay={120}>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:mt-9">
                <CtaLink
                  href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi CalypsoWebsiteBuilders! I would like to get a quote.")}`}
                  target="_blank"
                  rel="noreferrer"
                  variant="teal"
                  className="w-full justify-center sm:w-auto"
                >
                  <MessageCircle className="size-4" />
                  Chat With Us on WhatsApp
                </CtaLink>
                <CtaLink href="#enquiry" variant="ghost" className="w-full justify-center sm:w-auto">
                  Fill Out the Enquiry Form
                </CtaLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <form
              id="enquiry"
              onSubmit={handleSubmit}
              className="surface-card rounded-2xl p-5 sm:rounded-[2rem] sm:p-7 lg:p-9"
            >
              <div className="grid gap-4 sm:grid-cols-2 sm:gap-5">
                <Field id="name" label="Full Name" required />
                <Field id="business" label="Business Name" />
                <Field id="phone" label="Phone / WhatsApp" type="tel" required />
                <Field id="email" label="Email" type="email" required />
              </div>

              <div className="mt-4 space-y-2 sm:mt-5">
                <Label className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
                  What do you need?
                </Label>
                <Select value={need} onValueChange={setNeed}>
                  <SelectTrigger className="h-11 w-full rounded-xl border-input bg-background/40">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {needs.map((n) => (
                      <SelectItem key={n} value={n}>{n}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-4 space-y-2 sm:mt-5">
                <Label
                  htmlFor="project"
                  className="text-xs tracking-[0.14em] uppercase text-muted-foreground"
                >
                  Tell us about your project
                </Label>
                <Textarea
                  id="project"
                  name="project"
                  rows={4}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="rounded-xl border-input bg-background/40"
                  placeholder="Goals, timeline, references..."
                />
              </div>

              <CtaButton type="submit" className="mt-6 w-full sm:mt-7">
                Send via WhatsApp
                <Send className="size-4" />
              </CtaButton>
            </form>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Field({
  id,
  label,
  type = "text",
  required,
}: {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id} className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
        {label}
      </Label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        className="h-11 rounded-xl border-input bg-background/40"
      />
    </div>
  );
}
