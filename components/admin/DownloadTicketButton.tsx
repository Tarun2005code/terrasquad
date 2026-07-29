"use client";

import { generateTicket } from "@/lib/pdf/generateTicket";

type Props = {
  booking: {
bookingReference: string | null;
    user: { name: string };
    expedition: { title: string };
    expeditionDate: string;
    participants: number;
    finalAmount: number;
  };
};

export default function DownloadTicketButton({ booking }: Props) {
  return (
    <button
      onClick={() =>
       generateTicket({
    bookingReference:
        booking.bookingReference ?? "N/A",
          customerName: booking.user.name,
          expedition: booking.expedition.title,
          date: booking.expeditionDate,
          participants: booking.participants,
          amount: booking.finalAmount,
        })
      }
      className="rounded-lg bg-green-600 px-5 py-2 text-white hover:bg-green-700"
    >
      Download Ticket
    </button>
  );
}