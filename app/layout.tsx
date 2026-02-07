import type { Metadata } from "next";
import { Manrope, Sora } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Paris 2026 - Les programmes jugés par l'IA",
  description: "Analyse non-partisane et objective des programmes des candidats à la mairie de Paris 2026 par intelligence artificielle",
  keywords: ["Paris 2026", "élections municipales", "programmes", "analyse IA", "candidats", "mairie de Paris"],
  authors: [{ name: "Analyse IA" }],
  openGraph: {
    title: "Paris 2026 - Les programmes jugés par l'IA",
    description: "Qui a le meilleur programme pour Paris ? L'IA analyse les 6 candidats.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${manrope.variable} ${sora.variable} bg-white text-gray-900 min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
