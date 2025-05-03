import { Montserrat } from "next/font/google";

import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat"
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} relative antialiased`}>{children}</body>
    </html>
  );
}

export default RootLayout;
