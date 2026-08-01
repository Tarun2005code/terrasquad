import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrasquad.in"),

  title: {
    default: "TerraSquad | Adventure Expeditions & Trekking in India",
    template: "%s | TerraSquad",
  },

  description:
    "TerraSquad is India's adventure travel community offering trekking expeditions, mountain adventures, camping experiences, and curated outdoor journeys across India.",

  keywords: [
    "TerraSquad",
    "Adventure Travel India",
    "Trekking India",
    "Mountain Expeditions",
    "Camping Trips",
    "Himalayan Treks",
    "Adventure Community",
    "Travel Expeditions",
    "Outdoor Adventures",
  ],

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },

  openGraph: {
    title: "TerraSquad | Adventure Expeditions & Trekking in India",
    description:
      "Join TerraSquad for unforgettable trekking, camping and adventure expeditions across India.",
    url: "https://terrasquad.in",
    siteName: "TerraSquad",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TerraSquad",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "TerraSquad",
    description:
      "Adventure expeditions, trekking and outdoor experiences across India.",
    images: ["/og-image.jpg"],
  },

  alternates: {
    canonical: "https://terrasquad.in",
  },
};