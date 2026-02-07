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
  title: {
    default: "Paris 2026 — Les programmes passés au crible de l'IA",
    template: "%s | Paris 2026 IA",
  },
  description:
    "Analyse non-partisane des programmes des candidats à la mairie de Paris 2026. 6 candidats, 5 critères, une grille identique. Rapports PDF téléchargeables.",
  keywords: [
    "Paris 2026",
    "élections municipales Paris",
    "programmes électoraux",
    "analyse IA",
    "candidats mairie de Paris",
    "municipales 2026",
    "Bournazel",
    "Chikirou",
    "Grégoire",
    "Dati",
    "Knafo",
    "Mariani",
    "comparaison programmes",
  ],
  authors: [{ name: "Pierre-Baptiste Borges", url: "https://x.com/pierbapt" }],
  creator: "Pierre-Baptiste Borges",
  publisher: "Paris 2026 — Labo IA",
  openGraph: {
    title: "Paris 2026 — Les programmes passés au crible de l'IA",
    description:
      "6 candidats. 5 critères. Une grille identique. Analyse non-partisane des programmes pour les municipales de Paris 2026.",
    url: "https://paris2026.fr",
    siteName: "Paris 2026 — Labo IA",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1456,
        height: 816,
        alt: "Paris 2026 — Les programmes passés au crible de l'IA. 6 candidats, 5 critères, une grille identique.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paris 2026 — Les programmes passés au crible de l'IA",
    description:
      "6 candidats. 5 critères. Une grille identique. Analyse non-partisane des programmes pour les municipales de Paris 2026.",
    creator: "@pierbapt",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://paris2026.fr",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Paris 2026 — Labo IA",
    url: "https://paris2026.fr",
    description:
      "Analyse non-partisane des programmes des candidats à la mairie de Paris 2026. 6 candidats, 5 critères, une grille identique.",
    author: {
      "@type": "Person",
      name: "Pierre-Baptiste Borges",
      url: "https://x.com/pierbapt",
    },
    publisher: {
      "@type": "Organization",
      name: "Paris 2026 — Labo IA",
      url: "https://paris2026.fr",
    },
  };

  return (
    <html lang="fr">
      <body
        className={`${manrope.variable} ${instrumentSerif.variable} min-h-screen antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  );
}
