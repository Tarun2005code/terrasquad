import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendVerificationEmail(
  email: string,
  token: string
) {
  const verifyUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;

  await resend.emails.send({
    from: "TerraSquad <onboarding@resend.dev>",
    to: email,
    subject: "Verify your TerraSquad account",
    html: `
      <h2>Welcome to TerraSquad</h2>

      <p>
        Please verify your email address.
      </p>

      <a href="${verifyUrl}">
        Verify Email
      </a>

      <p>
        This link expires in 24 hours.
      </p>
    `,
  });
}