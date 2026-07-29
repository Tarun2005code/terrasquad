import { NextRequest } from "next/server";
import PDFDocument from "pdfkit";
import QRCode from "qrcode";
import { prisma } from "@/lib/prisma";

type Params = Promise<{
  reference: string;
}>;

export async function GET(
  req: NextRequest,
  { params }: { params: Params }
) {
  const { reference } = await params;

  const booking = await prisma.booking.findUnique({
    where: {
      bookingReference: reference,
    },
    include: {
      user: true,
      expedition: true,
    },
  });

  if (!booking) {
    return new Response("Booking not found", {
      status: 404,
    });
  }

  if (booking.paymentStatus !== "PAID") {
    return new Response("Booking not paid", {
      status: 400,
    });
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXTAUTH_URL ??
    "http://localhost:3000";

  const verifyUrl = `${baseUrl}/verify/${booking.bookingReference}`;

  const qrDataUrl = await QRCode.toDataURL(verifyUrl);

  const qrBuffer = Buffer.from(
    qrDataUrl.replace(/^data:image\/png;base64,/, ""),
    "base64"
  );

  const pdf = new PDFDocument({
    margin: 45,
    size: "A4",
  });

  const chunks: Buffer[] = [];

  pdf.on("data", (chunk: Buffer) => {
    chunks.push(chunk);
  });

  const stream = new Promise<Buffer>((resolve) => {
    pdf.on("end", () => {
      resolve(Buffer.concat(chunks));
    });
  });

  // -------------------------
  // Header
  // -------------------------

  pdf
    .fontSize(28)
    .fillColor("#2F5D50")
    .text("TerraSquad", {
      align: "center",
    });

  pdf
    .fontSize(18)
    .fillColor("black")
    .text("Expedition Ticket", {
      align: "center",
    });

  pdf.moveDown();

  pdf.image(qrBuffer, 420, 40, {
    width: 120,
  });

  pdf.moveDown(2);

  pdf
    .fontSize(16)
    .fillColor("#2F5D50")
    .text("Booking Details");

  pdf.moveDown();

  pdf
    .fontSize(12)
    .fillColor("black");

  pdf.text(
    `Booking Reference : ${booking.bookingReference}`
  );

  pdf.text(
    `Booking Status : ${booking.status}`
  );

  pdf.text(
    `Payment Status : ${booking.paymentStatus}`
  );

  if (booking.razorpayPaymentId) {
    pdf.text(
      `Payment ID : ${booking.razorpayPaymentId}`
    );
  }

  pdf.moveDown();

  pdf
    .fontSize(16)
    .fillColor("#2F5D50")
    .text("Traveller");

  pdf.moveDown();

  pdf
    .fontSize(12)
    .fillColor("black");

  pdf.text(`Name : ${booking.user.name}`);

  pdf.text(`Email : ${booking.user.email}`);

  pdf.text(`Phone : ${booking.user.phone}`);

  pdf.moveDown();

  pdf
    .fontSize(16)
    .fillColor("#2F5D50")
    .text("Expedition");

  pdf.moveDown();

  pdf
    .fontSize(12)
    .fillColor("black");

  pdf.text(
    `Expedition : ${booking.expedition.title}`
  );

  pdf.text(
    `Location : ${booking.expedition.location}`
  );

  pdf.text(
    `Date : ${booking.expeditionDate.toLocaleDateString(
      "en-GB"
    )}`
  );

  pdf.text(
    `Participants : ${booking.participants}`
  );

  pdf.text(
    `Amount Paid : ₹${booking.finalAmount}`
  );

  if (booking.discountAmount > 0) {
    pdf.text(
      `Discount : ₹${booking.discountAmount}`
    );
  }

  if (booking.couponCode) {
    pdf.text(
      `Coupon : ${booking.couponCode}`
    );
  }

  pdf.moveDown(2);

  pdf
    .fontSize(16)
    .fillColor("#2F5D50")
    .text("Important Instructions");

  pdf.moveDown();

  pdf
    .fontSize(11)
    .fillColor("black");

  pdf.text("• Reach pickup point 15 minutes early.");

  pdf.text("• Carry a valid Government ID.");

  pdf.text("• Wear trekking shoes.");

  pdf.text("• Carry a reusable water bottle.");

  pdf.text("• Follow the trip leader's instructions.");

  pdf.text("• Keep this ticket until the expedition ends.");

  pdf.moveDown(2);

  pdf
    .fontSize(10)
    .fillColor("gray")
    .text(
      "Scan the QR code to verify this booking.",
      {
        align: "center",
      }
    );

  pdf.text(
    "Thank you for choosing TerraSquad.",
    {
      align: "center",
    }
  );

  pdf.end();

  const buffer = await stream;

  return new Response(new Uint8Array(buffer), {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="TerraSquad-${booking.bookingReference}.pdf"`,
      "Cache-Control": "no-store",
    },
  });
}