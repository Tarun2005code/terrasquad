import jsPDF from "jspdf";
import QRCode from "qrcode";

type TicketData = {
  bookingReference: string;
  customerName: string;
  expedition: string;
  date: string;
  participants: number;
  amount: number;
};

export async function generateTicket(data: TicketData) {
  const pdf = new jsPDF();

  // Border
  pdf.setDrawColor(0);
  pdf.rect(10, 10, 190, 277);

  // Header
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(24);
  pdf.text("TerraSquad", 20, 22);

  pdf.setFontSize(16);
  pdf.text("EXPEDITION TICKET", 20, 34);

  pdf.setDrawColor(150);
  pdf.line(20, 40, 190, 40);

  // Booking Details
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(12);

  pdf.text(`Booking Reference : ${data.bookingReference}`, 20, 55);
  pdf.text(`Customer          : ${data.customerName}`, 20, 67);
  pdf.text(`Expedition        : ${data.expedition}`, 20, 79);
  pdf.text(`Departure Date    : ${data.date}`, 20, 91);
  pdf.text(`Participants      : ${data.participants}`, 20, 103);
  pdf.text(`Amount Paid       : ₹${data.amount}`, 20, 115);

  // QR Code
  const qrPayload = JSON.stringify({
    bookingReference: data.bookingReference,
    expedition: data.expedition,
    customer: data.customerName,
  });

  const qrImage = await QRCode.toDataURL(qrPayload);

  pdf.addImage(qrImage, "PNG", 145, 48, 45, 45);

  pdf.setFontSize(10);
  pdf.text("Scan for Check-In", 145, 98);

  // Reporting Instructions
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Reporting Instructions", 20, 140);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  pdf.text(
    "• Please report at least 30 minutes before departure.",
    25,
    152
  );

  pdf.text(
    "• Carry a valid Government ID proof.",
    25,
    162
  );

  pdf.text(
    "• Show this QR code during check-in.",
    25,
    172
  );

  pdf.text(
    "• Follow all safety instructions issued by TerraSquad staff.",
    25,
    182
  );

  // Emergency
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(14);
  pdf.text("Emergency Contact", 20, 205);

  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);

  pdf.text(
    "Phone: +91-XXXXXXXXXX",
    25,
    217
  );

  pdf.text(
    "Email: support@terrasquad.in",
    25,
    227
  );

  // Footer
  pdf.setDrawColor(180);
  pdf.line(20, 255, 190, 255);

  pdf.setFontSize(10);

  pdf.text(
    "Thank you for choosing TerraSquad.",
    20,
    265
  );

  pdf.text(
    "Explore Beyond • Travel Safe • Adventure Awaits",
    20,
    273
  );

  pdf.save(`${data.bookingReference}.pdf`);
}