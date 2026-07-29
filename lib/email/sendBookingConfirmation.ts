import { resend } from "./resend";

type BookingEmail = {
  email: string;
  name: string;
  expedition: string;
  date: string;
  participants: number;
  amount: number;
  bookingReference: string | null;
};

export async function sendBookingConfirmation(
  booking: BookingEmail
) {
  await resend.emails.send({
    from: "TerraSquad <onboarding@resend.dev>",
    to: booking.email,
    subject: `✅ Booking Confirmed • ${booking.expedition}`,
    html: `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
</head>

<body style="margin:0;padding:40px;background:#f4f4f4;font-family:Arial,sans-serif;">

<table width="600" align="center" cellpadding="0" cellspacing="0"
style="background:#ffffff;border-radius:12px;overflow:hidden;">

<tr>
<td style="background:#16a34a;color:white;padding:30px;text-align:center;">
<h1 style="margin:0;">TerraSquad</h1>
<p style="margin-top:10px;">
Explore Beyond
</p>
</td>
</tr>

<tr>
<td style="padding:35px;">

<h2>
Booking Confirmed 🎉
</h2>

<p>
Hello <strong>${booking.name}</strong>,
</p>

<p>
Your booking has been successfully confirmed.
We can't wait to take you on your next adventure.
</p>

<hr>

<table width="100%" cellpadding="8">

<tr>
<td><strong>Booking Reference</strong></td>
<td>${booking.bookingReference ?? "-"}</td>
</tr>

<tr>
<td><strong>Expedition</strong></td>
<td>${booking.expedition}</td>
</tr>

<tr>
<td><strong>Date</strong></td>
<td>${booking.date}</td>
</tr>

<tr>
<td><strong>Participants</strong></td>
<td>${booking.participants}</td>
</tr>

<tr>
<td><strong>Amount Paid</strong></td>
<td>₹${booking.amount}</td>
</tr>

</table>

<hr>

<h3>Before You Arrive</h3>

<ul>
<li>Carry a valid Government ID.</li>
<li>Reach 30 minutes before departure.</li>
<li>Keep your ticket ready.</li>
<li>Wear comfortable trekking shoes.</li>
<li>Bring a reusable water bottle.</li>
</ul>

<p>
Our team will contact you before departure with
meeting location and reporting instructions.
</p>

<p>
Thank you for choosing
<strong>TerraSquad</strong>.
</p>

</td>
</tr>

<tr>
<td
style="
background:#111827;
color:#ffffff;
padding:20px;
text-align:center;
">

<p style="margin:0;">
© TerraSquad
</p>

<p style="margin-top:10px;">
Adventure • Exploration • Community
</p>

</td>
</tr>

</table>

</body>
</html>
`,
  });
}