import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import Script from "next/script";

import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "TerraSquad",
  description: "Explore Beyond",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${poppins.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-black">
        <Navbar />

        <main>{children}</main>

        <Footer />

        <Toaster richColors position="top-right" />

        <Script src="https://checkout.razorpay.com/v1/checkout.js" />
      </body>
    </html>
  );
}