import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/calypso/Header";
import { Hero } from "@/components/calypso/Hero";
import { Services } from "@/components/calypso/Services";
import { Why } from "@/components/calypso/Why";
import { Work } from "@/components/calypso/Work";
import { Process } from "@/components/calypso/Process";
import { Pricing } from "@/components/calypso/Pricing";
import { Testimonials } from "@/components/calypso/Testimonials";
import { Faq } from "@/components/calypso/Faq";
import { Contact } from "@/components/calypso/Contact";
import { Footer } from "@/components/calypso/Footer";

const title = "Calypso Website Builders — We Build Your Digital Presence";
const description =
  "Calypso designs and builds professional, high-converting websites for businesses ready to be taken seriously online — from first impression to first client.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <Header />
      <main>
        <Hero />
        <Services />
        <Why />
        <Work />
        <Process />
        <Pricing />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
