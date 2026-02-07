import type { Metadata } from "next";
import { Manrope, Instrument_Serif } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-display",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://paris2026.fr"),
  title: "Paris 2026 \u2014 Les programmes jug\u00e9s par l'IA",
  description: "Analyse non-partisane des programmes des candidats \u00e0 la mairie de Paris 2026. 6 candidats, 5 crit\u00e8res, une grille identique.",
  keywords: ["Paris 2026", "\u00e9lections municipales", "programmes", "analyse IA", "candidats", "mairie de Paris"],
  authors: [{ name: "Pierre-Baptiste Borges" }],
  openGraph: {
    title: "Paris 2026 \u2014 Les programmes jug\u00e9s par l'IA",
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
        className={`${manrope.variable} ${instrumentSerif.variable} min-h-screen antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
