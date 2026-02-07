import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={`${inter.className} bg-white text-gray-900 min-h-screen antialiased`}>
        {children}
      </body>
    </html>
  );
}
