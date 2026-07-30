"use client";

import { generateTicket } from "@/lib/pdf/generateTicket";

type Props = {
  booking: {
    bookingReference: string;
    user: {
      name: string;
    };
    expedition: {
      title: string;
    };
    expeditionDate: string;
    participants: number;
    finalAmount: number;
  };
};

export default function SuccessDownloadTicketButton({
  booking,
}: Props) {
  return (
    <button
      onClick={() =>
        generateTicket({
          bookingReference: booking.bookingReference,
          customerName: booking.user.name,
          expedition: booking.expedition.title,
          date: booking.expeditionDate,
          participants: booking.participants,
          amount: booking.finalAmount,
        })
      }
      className="rounded-xl bg-[#2F5D50] px-6 py-3 font-semibold text-white transition hover:opacity-90"
    >
      Download Ticket
    </button>
  );
}