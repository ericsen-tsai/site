import { auth } from "@erichandsen/auth";
import { Toaster, TooltipProvider } from "@erichandsen/ui";
import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Link from "next/link";
import { redirect } from "next/navigation";

import "../globals.css";
// Import uploadthing CSS
import "@uploadthing/react/styles.css";
import { DiaryDrawer } from "@/components/diary-drawer";
import { TRPCReactProvider } from "@/trpc/react";
import { api } from "@/trpc/server";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

export const metadata: Metadata = {
  title: "Camino de Santiago Editor",
  description: "Camino de Santiago Editor",
  manifest: "/favicon/site.webmanifest",
  icons: {
    icon: "/favicon/favicon.ico",
    shortcut: "/favicon/favicon.ico",
    apple: [
      {
        url: "/favicon/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png"
      }
    ],
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "16x16",
        url: "/favicon/favicon-16x16.png"
      },
      {
        rel: "icon",
        type: "image/png",
        sizes: "32x32",
        url: "/favicon/favicon-32x32.png"
      }
    ]
  }
};

export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }
  const diaries = await api.diaries.getAll();
  return (
    <html lang="en">
      <body className={`${montserrat.variable} relative antialiased`}>
        <TRPCReactProvider>
          <TooltipProvider delayDuration={200}>
            <main className="relative z-10 py-8">
              <div className="flex justify-between px-6">
                <h1 className="mb-6 text-nowrap text-xl font-bold md:text-2xl">
                  <Link href="/">Camino de Santiago</Link>
                </h1>
                <DiaryDrawer diaries={diaries} />
              </div>
              {children}
            </main>
          </TooltipProvider>
          <Toaster />
        </TRPCReactProvider>
      </body>
    </html>
  );
}
