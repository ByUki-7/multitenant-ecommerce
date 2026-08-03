import type { Metadata } from "next";
import Link from "next/link";
import { GithubIcon, GlobeIcon, MailIcon } from "lucide-react";

import { Card, Hero, MarketingShell, SectionTitle } from "@/components/marketing";
import { ContactForm } from "@/modules/home/ui/components/contact-form";

export const metadata: Metadata = {
  title: "Contact — Zantora",
  description: "Get in touch with the Zantora team.",
};

export const dynamic = "force-dynamic";

const channels = [
  {
    icon: MailIcon,
    title: "Email us",
    body: "hello@zantora.shop",
    href: "mailto:hello@zantora.shop",
    cta: "Send an email",
  },
  {
    icon: GithubIcon,
    title: "Open source",
    body: "Star the repo, report issues or contribute.",
    href: "https://github.com/ByUki-7/multitenant-ecommerce",
    cta: "View on GitHub",
  },
  {
    icon: GlobeIcon,
    title: "Live demo",
    body: "See Zantora running in production.",
    href: "https://multitenant-ecommerce-amber.vercel.app",
    cta: "Open the demo",
  },
];

const ContactPage = () => {
  return (
    <MarketingShell>
      <Hero
        eyebrow="Contact"
        title={
          <>
            Let&apos;s build something{" "}
            <span className="text-zantora-blue">together</span>.
          </>
        }
        subtitle="Questions about Zantora, partnerships or just want to say hi? We'd love to hear from you."
      />

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channels.map((channel) => {
          const Icon = channel.icon;
          return (
            <Card key={channel.title} interactive>
              <div className="flex size-12 items-center justify-center rounded-lg border bg-zantora-blue/15">
                <Icon className="size-6" />
              </div>
              <h3 className="text-xl font-semibold">{channel.title}</h3>
              <p className="text-muted-foreground flex-1">{channel.body}</p>
              <Link
                href={channel.href}
                target={channel.href.startsWith("http") ? "_blank" : undefined}
                rel="noreferrer"
                className="font-medium underline underline-offset-4 hover:text-zantora-blue w-fit"
              >
                {channel.cta}
              </Link>
            </Card>
          );
        })}
      </section>

      <section>
        <SectionTitle
          eyebrow="Send a message"
          title="We usually reply within a day"
          subtitle="Fill out the form and our team will get back to you."
        />
        <ContactForm />
      </section>
    </MarketingShell>
  );
};

export default ContactPage;
