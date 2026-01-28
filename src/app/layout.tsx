import type { Metadata } from "next";
import { Inter, Playfair_Display, Caveat } from "next/font/google"; // Emotional font selection
import SmoothScroll from "@/components/core/SmoothScroll";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Forever Us | Our Story",
  description: "A digital love story told through motion, sound, and memory.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable} ${caveat.variable}`}>
      <body className="antialiased bg-background text-foreground selection:bg-rose-200 selection:text-rose-900">
        <div className="grain-overlay pointer-events-none fixed inset-0 z-50 opacity-20 mix-blend-overlay"></div>
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
