import "../globals.css";

export const metadata = {
  title: "Camino de Santiago Editor",
  description: "Camino de Santiago Editor"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
