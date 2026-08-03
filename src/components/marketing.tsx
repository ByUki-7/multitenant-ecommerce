import Link from "next/link";
import { Poppins } from "next/font/google";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const poppins = Poppins({ subsets: ["latin"], weight: ["600", "700"] });

export const headingFont = poppins.className;

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="px-4 lg:px-12 py-14 lg:py-20 max-w-6xl mx-auto flex flex-col gap-16 lg:gap-24">
      {children}
    </div>
  );
}

export function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex w-fit items-center gap-2 rounded-full border bg-zantora-blue/15 px-3 py-1 text-sm font-medium">
      <span className="size-2 rounded-full bg-zantora-blue" />
      {children}
    </span>
  );
}

interface HeroProps {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}

export function Hero({ eyebrow, title, subtitle, primary, secondary }: HeroProps) {
  return (
    <section className="flex flex-col items-start gap-6">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h1
        className={cn(
          "text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight max-w-3xl",
          headingFont
        )}
      >
        {title}
      </h1>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
      {(primary || secondary) && (
        <div className="flex flex-wrap gap-3 pt-2">
          {primary && (
            <Button
              asChild
              className="rounded-full px-8 bg-black text-white hover:bg-zantora-blue hover:text-black dark:bg-white dark:text-black dark:hover:bg-zantora-blue dark:hover:text-white transition-colors"
            >
              <Link href={primary.href}>{primary.label}</Link>
            </Button>
          )}
          {secondary && (
            <Button
              asChild
              variant="outline"
              className="rounded-full px-8"
            >
              <Link href={secondary.href}>{secondary.label}</Link>
            </Button>
          )}
        </div>
      )}
    </section>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 mb-10">
      {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
      <h2 className={cn("text-3xl sm:text-4xl font-bold tracking-tight", headingFont)}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl">{subtitle}</p>
      )}
    </div>
  );
}

export function Card({
  children,
  className,
  interactive,
}: {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
}) {
  return (
    <div
      className={cn(
        "border rounded-lg bg-white dark:bg-zantora-dark p-6 flex flex-col gap-3 h-full",
        interactive &&
          "transition-all hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0px_rgb(200,200,200)]",
        className
      )}
    >
      {children}
    </div>
  );
}

export function CTA({
  title,
  subtitle,
  primary,
  secondary,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  primary: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="border rounded-2xl bg-zantora-blue/10 p-8 lg:p-14 flex flex-col items-center text-center gap-5">
      <h2 className={cn("text-3xl sm:text-4xl font-bold tracking-tight", headingFont)}>
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-xl">{subtitle}</p>
      )}
      <div className="flex flex-wrap justify-center gap-3 pt-2">
        <Button
          asChild
          className="rounded-full px-8 bg-black text-white hover:bg-zantora-blue hover:text-black dark:bg-white dark:text-black dark:hover:bg-zantora-blue dark:hover:text-white transition-colors"
        >
          <Link href={primary.href}>{primary.label}</Link>
        </Button>
        {secondary && (
          <Button asChild variant="outline" className="rounded-full px-8">
            <Link href={secondary.href}>{secondary.label}</Link>
          </Button>
        )}
      </div>
    </section>
  );
}
