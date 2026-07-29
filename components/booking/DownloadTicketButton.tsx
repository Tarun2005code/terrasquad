"use client";

export default function DownloadTicketButton() {
  return (
    <button
      onClick={() => window.print()}
      className="rounded-xl bg-[#2F5D50] px-6 py-3 text-white"
    >
      Download Ticket
    </button>
  );
}