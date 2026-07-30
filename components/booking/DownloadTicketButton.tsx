"use client";

type Props = {
  bookingReference: string;
};

export default function DownloadTicketButton({
  bookingReference,
}: Props) {
  return (
    <a
      href={`/api/bookings/reference/${bookingReference}/ticket`}
      className="rounded-xl bg-[#2F5D50] px-6 py-3 text-white"
    >
      Download Ticket
    </a>
  );
}