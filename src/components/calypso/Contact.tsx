import { useState } from "react";
import { MessageCircle, Send } from "lucide-react";
import { toast } from "sonner";
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

const needs = [
  "Starter Website",
  "Business Website",
  "Premium Website",
  "E-Commerce",
  "Maintenance",
  "Custom Feature",
  "Not Sure Yet",
];

const WHATSAPP_URL = "https://wa.me/910000000000?text=Hi%20Calypso%2C%20I%27d%20like%20a%20quote";

export function Contact() {
  const [need, setNeed] = useState("");

  return (
    <section id="contact" className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[34rem]"
        style={{ background: "var(--gradient-abyss)", transform: "rotate(180deg)" }}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              align="left"
              eyebrow="Contact"
              title="Ready to Build Your Digital Presence?"
              subtitle="Tell us about your business — we'll get back to you with a free consultation and quote."
            />
            <Reveal delay={120}>
              <div className="mt-9 flex flex-wrap gap-3">
                <CtaLink href={WHATSAPP_URL} target="_blank" rel="noreferrer" variant="teal">
                  <MessageCircle className="size-4" />
                  Chat With Us on WhatsApp
                </CtaLink>
                <CtaLink href="#enquiry" variant="ghost">
                  Fill Out the Enquiry Form
                </CtaLink>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100}>
            <form
              id="enquiry"
              onSubmit={(e) => {
                e.preventDefault();
                toast.success("Thanks! We'll be in touch within one business day.");
                (e.currentTarget as HTMLFormElement).reset();
                setNeed("");
              }}
              className="surface-card rounded-[2rem] p-7 sm:p-9"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field id="name" label="Full Name" required />
                <Field id="business" label="Business Name" />
                <Field id="phone" label="Phone / WhatsApp Number" type="tel" required />
                <Field id="email" label="Email" type="email" required />
              </div>

              <div className="mt-5 space-y-2">
                <Label className="text-xs tracking-[0.14em] uppercase text-muted-foreground">
                  What do you need?
                </Label>
                <Select value={need} onValueChange={setNeed}>
                  <SelectTrigger className="h-11 w-full rounded-xl border-input bg-background/40">
                    <SelectValue placeholder="Select an option" />
                  </SelectTrigger>
                  <SelectContent>
                    {needs.map((n) => (
                      <SelectItem key={n} value={n}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="mt-5 space-y-2">
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
                  className="rounded-xl border-input bg-background/40"
                  placeholder="Goals, timeline, references..."
                />
              </div>

              <CtaButton type="submit" className="mt-7 w-full">
                Send Enquiry
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
