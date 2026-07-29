import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import * as XLSX from "xlsx";

export async function GET() {
  const bookings = await prisma.booking.findMany({
    include: {
      user: true,
      expedition: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const rows = bookings.map((booking) => ({
    Reference: booking.bookingReference,
    Customer: booking.user.name,
    Email: booking.user.email,
    Phone: booking.user.phone,
    Expedition: booking.expedition.title,
    Date: booking.expeditionDate.toLocaleDateString("en-GB"),
    Participants: booking.participants,
    Amount: booking.finalAmount,
    Payment: booking.paymentStatus,
    CheckedIn: booking.checkedIn ? "Yes" : "No",
  }));

  const workbook = XLSX.utils.book_new();
  const worksheet = XLSX.utils.json_to_sheet(rows);

  XLSX.utils.book_append_sheet(
    workbook,
    worksheet,
    "Bookings"
  );

  const buffer = XLSX.write(workbook, {
    type: "buffer",
    bookType: "xlsx",
  });

  return new NextResponse(buffer, {
    headers: {
      "Content-Type":
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "Content-Disposition":
        'attachment; filename="bookings.xlsx"',
    },
  });
}