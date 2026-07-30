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
    <div className="overflow-hidden rounded-2xl border bg-white shadow">

      <div className="h-[350px] md:h-[500px]">
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
              onDetected(codes[0].rawValue);
            }

            setTimeout(() => {
              scanned.current = false;
            }, 2000);
          }}
          onError={(error) => {
            console.error(error);
          }}
        />
      </div>

      <div className="border-t bg-gray-50 p-4 text-center text-sm text-gray-600">
        Point camera at ticket QR code
      </div>

    </div>
  );
}