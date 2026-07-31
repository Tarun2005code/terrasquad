// app/(main)/layout.tsx

import Navbar from "@/components/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "sonner";
import Script from "next/script";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />

      <main>{children}</main>

      <Footer />

      <Toaster richColors position="top-right" />

      <Script src="https://checkout.razorpay.com/v1/checkout.js" />
    </>
  );
}