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

  console.log(
    "RESEND KEY EXISTS:",
    !!process.env.RESEND_API_KEY
  );

  console.log(
    "Sending verification email to:",
    email
  );

  console.log(
    "Verification URL:",
    verifyUrl
  );

  try {
    const result =
      await resend.emails.send({
        from: "TerraSquad <noreply@terrasquad.in>",
        to: email,
        subject:
          "Verify your TerraSquad account",
        html: `
          <h2>Welcome to TerraSquad</h2>

          <p>
            Please verify your email address.
          </p>

          <p>
            Click the button below:
          </p>

          <a href="${verifyUrl}">
            Verify Email
          </a>

          <p>
            This link expires in 24 hours.
          </p>
        `,
      });

    console.log(
      "RESEND RESPONSE:",
      JSON.stringify(result, null, 2)
    );

    return result;
  } catch (error) {
    console.error(
      "RESEND EMAIL ERROR:",
      error
    );

    throw error;
  }
}