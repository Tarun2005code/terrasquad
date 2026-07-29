import nodemailer from "nodemailer";

export async function sendContactEmail({
  name,
  email,
  phone,
  subject,
  message,
}: {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}) {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: "terrasquad.in@gmail.com",
    subject: `New Contact Form: ${subject || "No Subject"}`,
    html: `
      <div style="font-family: Arial, sans-serif;">
        <h2>📩 New TerraSquad Contact Message</h2>

        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
        <p><strong>Subject:</strong> ${subject || "No Subject"}</p>

        <hr />

        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
    `,
  });
}