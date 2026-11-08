import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "THE INTERNET'S MOST USELESS WEBSITE — An Experiment in Absolutely Nothing",
  description:
    "We spent countless hours creating something that serves absolutely no purpose. Enter at your own productivity risk.",
  keywords: [
    "useless website",
    "the internet's most useless website",
    "funny web experiments",
    "creative frontend",
    "pointless buttons",
    "web brutalism",
    "time waster",
  ],
  authors: [{ name: "The Ministry of Pointless Tasks" }],
  openGraph: {
    title: "THE INTERNET'S MOST USELESS WEBSITE",
    description: "Congratulations. You made it here. Nothing changes.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "THE INTERNET'S MOST USELESS WEBSITE",
    description: "We spent countless hours creating something that serves absolutely no purpose.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🥔</text></svg>"
        />
      </head>
      <body className="font-sans antialiased bg-paper text-carbon min-h-screen selection:bg-secondary selection:text-carbon">
        {children}
      </body>
    </html>
  );
}
