import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Programmes Paris 2026 jugés par l'IA",
  description: "Analyse non-partisane et objective des programmes des candidats à la mairie de Paris 2026 par une intelligence artificielle",
  keywords: ["Paris 2026", "élections municipales", "programmes", "analyse IA", "candidats"],
  authors: [{ name: "Analyse IA" }],
  openGraph: {
    title: "Programmes Paris 2026 jugés par l'IA",
    description: "Analyse objective des candidats par intelligence artificielle",
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
      <body className={`${inter.className} bg-gray-50 text-gray-dark min-h-screen`}>
        {children}
      </body>
    </html>
  );
}