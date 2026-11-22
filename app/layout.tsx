import type { Metadata } from "next";
import Script from "next/script";
import { Manrope, Instrument_Serif } from "next/font/google";
import FeedbackWidget from "@/components/FeedbackWidget";
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
  metadataBase: new URL("https://labo-paris.com"),
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
    url: "https://labo-paris.com",
    siteName: "Paris 2026 — Labo IA",
    locale: "fr_FR",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1376,
        height: 768,
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
    canonical: "https://labo-paris.com",
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
    url: "https://labo-paris.com",
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
      url: "https://labo-paris.com",
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
        <Script id="pb-audience-preference" strategy="beforeInteractive">{"(function(){\n    const key=\"pb-audience-optout\";\n    const urlOff=new URLSearchParams(location.search).get(\"audience\")===\"off\";\n    try {\n      if(urlOff) localStorage.setItem(key,\"1\");\n      if(localStorage.getItem(key)===\"1\") globalThis.pbAudienceDisabled=true;\n    } catch (_) { globalThis.pbAudienceDisabled=true; }\n    if(urlOff) globalThis.pbAudienceDisabled=true;\n    function bind(){\n      const link=document.getElementById(\"audience-opt-out\"), status=document.getElementById(\"audience-status\");\n      if(!link||!status)return;\n      function render(){if(globalThis.pbAudienceDisabled||navigator.globalPrivacyControl||navigator.doNotTrack===\"1\"||window.doNotTrack===\"1\")status.textContent=\"Measurement disabled / Mesure d\u00e9sactiv\u00e9e.\";}\n      render();\n      link.addEventListener(\"click\",event=>{\n        globalThis.pbAudienceDisabled=true;\n        try {\n          localStorage.setItem(key,\"1\");\n          if(localStorage.getItem(key)===\"1\"){event.preventDefault();render();}\n        } catch (_) {\n          // Follow the link to a document that never sends a measurement.\n        }\n      });\n    }\n    if(document.readyState===\"loading\")document.addEventListener(\"DOMContentLoaded\",bind,{once:true});\n    else bind();\n  })();"}</Script>
        <Script id="pb-first-party-audience" strategy="afterInteractive">{"(function(){if(![\"labo-paris.com\"].includes(location.hostname)||location.pathname!==\"/\"||window!==window.top||new URLSearchParams(location.search).has(\"embed\"))return;const s=document.createElement(\"script\");s.defer=true;s.src=\"/audience-v1.js\";Object.assign(s.dataset,{\"site\":\"labo-paris\",\"page\":\"home\",\"path\":\"/\",\"endpoint\":\"https://pb-audience.vercel.app/api/collect\"});document.head.appendChild(s)})();"}</Script>
        {children}
        <FeedbackWidget />
            <details id="mesure-audience" aria-label="Audience privacy">
        <summary>Audience privacy / Confidentialité de la mesure</summary>
        <p lang="en">This site counts views on selected public pages, not individual visitors. The script sends only a site key and a predefined page category to a private counter. The script does not send your submissions, exact URL, cookies or browsing identifiers. Vercel receives the IP address to handle the counter request; the audience counter does not store it in its statistics, which contain only daily totals for this site. If you opt out, only that choice is saved in this browser.</p>
        <p lang="fr">Ce site compte les vues de certaines pages publiques, pas les visiteurs individuels. Le script transmet seulement le nom du site et une catégorie de page prédéfinie à un compteur privé. Le script ne transmet ni vos saisies, ni l’URL exacte, ni cookie, ni identifiant de navigation. Vercel reçoit l’adresse IP pour traiter la requête du compteur ; celui-ci ne la conserve pas dans ses statistiques, limitées à des totaux quotidiens pour ce site. En cas de refus, seul ce choix est mémorisé dans ce navigateur.</p>
        <p><a id="audience-opt-out" href="?audience=off#mesure-audience">Opt out / Refuser la mesure</a> <span id="audience-status" role="status" aria-live="polite"></span></p>
        <p>Contact / Contact : <a href="https://pierrebaptiste.me/about/">Pierre-Baptiste Borges</a>.</p>
      </details>
</body>
    </html>
  );
}
