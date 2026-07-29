import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendResetEmail(
  email: string,
  token: string
) {
  const resetUrl =
    `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "TerraSquad <onboarding@resend.dev>",
    to: email,
    subject: "Reset your password",
    html: `
      <h2>Reset Password</h2>

      <p>
        Click below to reset your password.
      </p>

      <a href="${resetUrl}">
        Reset Password
      </a>

      <p>
        This link expires in 1 hour.
      </p>
    `,
  });
}