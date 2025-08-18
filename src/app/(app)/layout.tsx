import type { Metadata } from "next";
import { DM_Sans } from "next/font/google"
import { NuqsAdapter } from "nuqs/adapters/next/app";

import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { TRPCReactProvider } from "@/trpc/client";
import { DarkModeProvider } from "@/contexts/darkModeContext";
import { TransitionProvider } from "@/modules/home/ui/components/transition-provider";
const dmSans = DM_Sans({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Zantora",
  description: "Start selling your products",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${dmSans.className} antialiased`}
      >
        <DarkModeProvider>
          <TransitionProvider>
            <NuqsAdapter>
              <TRPCReactProvider>
                {children}
                <Toaster />
              </TRPCReactProvider>
            </NuqsAdapter>
          </TransitionProvider>
        </DarkModeProvider>
      </body>
    </html>
  );
}