import type { Metadata } from "next";
import Link from "next/link";
import { CheckIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { PLATFORM_FEE_PERCENTAGE } from "@/constants";
import { CTA, Hero, MarketingShell, headingFont } from "@/components/marketing";

export const metadata: Metadata = {
  title: "Pricing — Zantora",
  description:
    "Simple, transparent pricing. Start for free and only pay as you grow.",
};

export const dynamic = "force-dynamic";

interface Plan {
  name: string;
  price: string;
  cadence?: string;
  description: string;
  cta: { label: string; href: string };
  features: string[];
  highlighted?: boolean;
}

const plans: Plan[] = [
  {
    name: "Starter",
    price: "$0",
    cadence: "/ month",
    description: "Everything you need to open your first store.",
    cta: { label: "Start for free", href: "/sign-up" },
    features: [
      "Your own subdomain storefront",
      "Unlimited product listings",
      `${PLATFORM_FEE_PERCENTAGE}% transaction fee`,
      "Secure Stripe checkout",
      "Basic sales analytics",
      "Community support",
    ],
  },
  {
    name: "Pro",
    price: "$19",
    cadence: "/ month",
    description: "For growing sellers who want more control.",
    cta: { label: "Upgrade to Pro", href: "/sign-up" },
    highlighted: true,
    features: [
      "Everything in Starter",
      "Reduced 5% transaction fee",
      "Custom domain support",
      "Advanced analytics & reports",
      "Discount codes & promotions",
      "Priority email support",
    ],
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For marketplaces and larger teams.",
    cta: { label: "Contact sales", href: "/contact" },
    features: [
      "Everything in Pro",
      "Volume-based custom fees",
      "SSO & team members",
      "Dedicated success manager",
      "99.9% uptime SLA",
      "Onboarding & migration help",
    ],
  },
];

const PricingPage = () => {
  return (
    <MarketingShell>
      <Hero
        eyebrow="Pricing"
        title={
          <>
            Simple pricing that{" "}
            <span className="text-zantora-blue">scales with you</span>.
          </>
        }
        subtitle="Start for free and only pay as you grow. No hidden fees — just a transparent transaction fee on what you sell."
      />

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={cn(
              "border rounded-2xl p-8 flex flex-col gap-6 bg-white dark:bg-zantora-dark",
              plan.highlighted &&
                "border-zantora-blue shadow-[6px_6px_0px_0px_var(--color-zantora-blue)] lg:-translate-y-2"
            )}
          >
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">{plan.name}</h3>
                {plan.highlighted && (
                  <span className="rounded-full bg-zantora-blue px-3 py-1 text-xs font-semibold text-black">
                    Most popular
                  </span>
                )}
              </div>
              <div className="flex items-end gap-1">
                <span className={cn("text-4xl font-bold", headingFont)}>
                  {plan.price}
                </span>
                {plan.cadence && (
                  <span className="text-muted-foreground pb-1">{plan.cadence}</span>
                )}
              </div>
              <p className="text-muted-foreground">{plan.description}</p>
            </div>

            <Button
              asChild
              className={cn(
                "rounded-full w-full",
                plan.highlighted
                  ? "bg-zantora-blue text-black hover:bg-zantora-blue/90"
                  : "bg-black text-white hover:bg-zantora-blue hover:text-black dark:bg-white dark:text-black dark:hover:bg-zantora-blue dark:hover:text-white transition-colors"
              )}
            >
              <Link href={plan.cta.href}>{plan.cta.label}</Link>
            </Button>

            <ul className="flex flex-col gap-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <CheckIcon className="size-5 text-zantora-blue shrink-0 mt-0.5" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <CTA
        title="Still have questions?"
        subtitle="We're happy to help you find the right plan for your business."
        primary={{ label: "Contact us", href: "/contact" }}
        secondary={{ label: "Browse the marketplace", href: "/" }}
      />
    </MarketingShell>
  );
};

export default PricingPage;
