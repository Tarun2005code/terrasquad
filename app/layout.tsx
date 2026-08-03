import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";
import DisableRightClick from "@/components/DisableRightClick";
import AuthProvider from "@/components/providers/AuthProvider";

export const metadata: Metadata = {
  metadataBase: new URL("https://terrasquad.in"),

  icons: {
  icon: "/favicon.ico",
  shortcut: "/favicon.ico",
  apple: "/apple-icon.png",
},

  title: {
    default:
      "TerraSquad | Adventure Expeditions & Trekking in India",
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
    "max-image-preview": "none",
  },
},

  openGraph: {
    title:
      "TerraSquad | Adventure Expeditions & Trekking in India",
    description:
      "Join TerraSquad for unforgettable trekking, camping and adventure expeditions across India.",
    url: "https://terrasquad.in",
    siteName: "TerraSquad",
    locale: "en_IN",
    type: "website",
  },

  alternates: {
    canonical: "https://terrasquad.in",
  },
};

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black">
        <AuthProvider>
          <DisableRightClick />

          {children}

          <Toaster
            richColors
            position="top-right"
          />
        </AuthProvider>

        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}