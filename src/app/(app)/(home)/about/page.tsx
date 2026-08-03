import type { Metadata } from "next";

import { Card, CTA, Hero, MarketingShell, SectionTitle } from "@/components/marketing";

export const metadata: Metadata = {
  title: "About — Zantora",
  description:
    "Zantora is a modern, open-source multitenant e-commerce platform where every shop runs on its own subdomain.",
};

export const dynamic = "force-dynamic";

const techStack = [
  { tech: "Next.js 15", description: "React framework with the App Router (RSC, ISR, SSR)" },
  { tech: "PayloadCMS", description: "Headless CMS backed by MongoDB" },
  { tech: "tRPC", description: "End-to-end type-safe backend calls" },
  { tech: "TailwindCSS", description: "Utility-first styling" },
  { tech: "shadcn/ui", description: "Modern, clean UI components" },
  { tech: "TypeScript", description: "Strongly typed across the whole codebase" },
  { tech: "MongoDB", description: "Flexible NoSQL data layer" },
  { tech: "Stripe", description: "Payments and connected marketplace payouts" },
];

const values = [
  {
    title: "Multitenant by design",
    body: "Every store gets its own subdomain and isolated catalog — ideal for SaaS commerce and marketplaces.",
  },
  {
    title: "Built for speed",
    body: "Server components, incremental static regeneration and a fully typed API layer keep things fast at scale.",
  },
  {
    title: "Full customization",
    body: "Own the whole stack. Extend collections, tweak the UI, and ship your own commerce experience.",
  },
];

const AboutPage = () => {
  return (
    <MarketingShell>
      <Hero
        eyebrow="About Zantora"
        title={
          <>
            The multitenant commerce platform for{" "}
            <span className="text-zantora-blue">modern sellers</span>.
          </>
        }
        subtitle="Zantora is a modern, open-source multitenant e-commerce platform built with the latest web technologies. Each shop runs on its own subdomain — perfect for SaaS e-commerce or marketplace platforms."
        primary={{ label: "Explore products", href: "/" }}
        secondary={{ label: "View features", href: "/features" }}
      />

      <section>
        <SectionTitle
          eyebrow="Our approach"
          title="Built for speed, scalability and full customization"
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {values.map((value) => (
            <Card key={value.title} interactive>
              <h3 className="text-xl font-semibold">{value.title}</h3>
              <p className="text-muted-foreground">{value.body}</p>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Tech stack"
          title="A carefully chosen, modern foundation"
          subtitle="Every layer of Zantora is picked for developer experience, type safety and performance."
        />
        <div className="border rounded-lg overflow-hidden bg-white dark:bg-zantora-dark">
          {techStack.map((row, index) => (
            <div
              key={row.tech}
              className={`grid grid-cols-1 sm:grid-cols-[220px_1fr] gap-1 sm:gap-6 px-6 py-4 ${
                index !== techStack.length - 1 ? "border-b" : ""
              }`}
            >
              <span className="font-semibold">{row.tech}</span>
              <span className="text-muted-foreground">{row.description}</span>
            </div>
          ))}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Design philosophy"
          title="Neobrutalism, done tastefully"
          subtitle="Bold borders, strong colors and a minimalist layout. Every UI element is built for reusability and speed — powered by shadcn/ui and TailwindCSS."
        />
      </section>

      <CTA
        title="Ready to open your store?"
        subtitle="Start selling in minutes on your own branded subdomain."
        primary={{ label: "Start selling", href: "/sign-up" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

      <p className="text-center text-sm text-muted-foreground">
        Made with care by the Zantora team. Open-source under the MIT License.
      </p>
    </MarketingShell>
  );
};

export default AboutPage;
