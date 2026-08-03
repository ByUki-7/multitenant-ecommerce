import type { Metadata } from "next";
import {
  BoxIcon,
  CreditCardIcon,
  DatabaseIcon,
  GlobeIcon,
  LayoutTemplateIcon,
  ShoppingCartIcon,
  SparklesIcon,
  StoreIcon,
  ZapIcon,
} from "lucide-react";

import { Card, CTA, Hero, MarketingShell, SectionTitle } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Features — Zantora",
  description:
    "Multitenancy, PayloadCMS, tRPC, TailwindCSS and Next.js 15 — everything you need to run a scalable commerce platform.",
};

export const dynamic = "force-dynamic";

const features = [
  {
    icon: GlobeIcon,
    title: "Multitenancy",
    body: "Subdomain-based routing gives every seller their own branded storefront and isolated catalog.",
  },
  {
    icon: DatabaseIcon,
    title: "PayloadCMS + MongoDB",
    body: "A powerful headless CMS with a flexible NoSQL data layer, ready to model any catalog.",
  },
  {
    icon: ZapIcon,
    title: "tRPC + TypeScript",
    body: "Full-stack type safety from the database to the UI, with autocompletion the whole way.",
  },
  {
    icon: LayoutTemplateIcon,
    title: "TailwindCSS + shadcn/ui",
    body: "Beautiful, customizable, accessible components with a consistent neobrutalist look.",
  },
  {
    icon: SparklesIcon,
    title: "Next.js 15 App Router",
    body: "Server Components, ISR and SSR for a fast, SEO-friendly experience out of the box.",
  },
  {
    icon: BoxIcon,
    title: "Fully typed API layer",
    body: "A scalable, strongly typed API surface designed to grow with your business.",
  },
];

const platformCapabilities = [
  {
    icon: ShoppingCartIcon,
    title: "Product catalog & filtering",
    body: "Category navigation, search, tags, price filters and sorting across the marketplace.",
  },
  {
    icon: StoreIcon,
    title: "Tenant storefronts",
    body: "Dedicated seller pages with branded logos, product grids and individual product detail views.",
  },
  {
    icon: CreditCardIcon,
    title: "Stripe Connect checkout",
    body: "Connected accounts, platform fees and a full checkout flow ready for real payments.",
  },
  {
    icon: BoxIcon,
    title: "Customer library",
    body: "Purchased products, protected content and post-purchase access for buyers.",
  },
];

const FeaturesPage = () => {
  return (
    <MarketingShell>
      <Hero
        eyebrow="Features"
        title={
          <>
            Everything you need to run a{" "}
            <span className="text-zantora-blue">commerce platform</span>.
          </>
        }
        subtitle="Zantora ships with the building blocks of a modern marketplace — fast, typed and fully customizable."
        primary={{ label: "Start selling", href: "/sign-up" }}
        secondary={{ label: "See pricing", href: "/pricing" }}
      />

      <section>
        <SectionTitle eyebrow="Core" title="Built on a modern stack" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <Card key={feature.title} interactive>
                <div className="flex size-12 items-center justify-center rounded-lg border bg-zantora-blue/15">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <section>
        <SectionTitle
          eyebrow="Platform"
          title="Ready for production"
          subtitle="Everything below is already built into this demo — browse the marketplace, open a tenant store, and try checkout."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {platformCapabilities.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.title} interactive>
                <div className="flex size-12 items-center justify-center rounded-lg border bg-zantora-blue/15">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-muted-foreground">{item.body}</p>
              </Card>
            );
          })}
        </div>
      </section>

      <CTA
        title="Launch your storefront today"
        subtitle="Everything is ready — bring your products and start selling."
        primary={{ label: "Get started", href: "/sign-up" }}
        secondary={{ label: "Talk to us", href: "/contact" }}
      />
    </MarketingShell>
  );
};

export default FeaturesPage;
