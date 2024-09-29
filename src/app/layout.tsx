import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";

import ParticleBackground from "@/components/layout/particle-background";
import Header from "@/components/layout/header";
import { SectionRefsProvider } from "@/contexts/useSectionRefsContext";
import Footer from "@/components/footer";
import { TRPCReactProvider } from "@/trpc/react";
import { TooltipProvider } from "@/components/ui/tooltip";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  title: "Ericsen - A Frontend Developer",
  description: "Ericsen • Frontend Developer • Gardener • Freediver",
  keywords: ["Ericsen", "Frontend Developer", "Typescript", "Nextjs"],
  creator: "ericsen-tsai",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png",
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} relative antialiased`}>
        <TRPCReactProvider>
          <TooltipProvider delayDuration={200}>
            <SectionRefsProvider>
              <Header />
              <ParticleBackground />
              <div className="relative z-10">{children}</div>
            </SectionRefsProvider>
            <Footer />
          </TooltipProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
