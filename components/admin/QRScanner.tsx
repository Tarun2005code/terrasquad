"use client";

import { Scanner } from "@yudiel/react-qr-scanner";
import { useRef } from "react";

type Props = {
  onDetected: (reference: string) => void;
};

export default function QRScanner({
  onDetected,
}: Props) {
  const scanned = useRef(false);

  return (
    <div className="rounded-2xl overflow-hidden border bg-white shadow">
      <Scanner
        constraints={{
          facingMode: "environment",
        }}
        onScan={(codes) => {
          if (!codes.length || scanned.current) return;

          scanned.current = true;

          try {
            const raw = codes[0].rawValue;

            const qr = JSON.parse(raw);

            if (qr.bookingReference) {
              onDetected(qr.bookingReference);
            } else {
              onDetected(raw);
            }
          } catch {
            // If QR contains plain booking reference instead of JSON
            onDetected(codes[0].rawValue);
          }

          // Prevent continuous scanning
          setTimeout(() => {
            scanned.current = false;
          }, 2000);
        }}
        onError={(error) => {
          console.error(error);
        }}
      />
    </div>
  );
}