import { Resend } from "resend";

const resend = new Resend(
  process.env.RESEND_API_KEY
);

export async function sendOtpEmail(
  email: string,
  otp: string
) {
  try {
    const result =
      await resend.emails.send({
        from:
          "TerraSquad <noreply@terrasquad.in>",
        to: email,
        subject:
          "Your TerraSquad Verification OTP",
        html: `
          <div style="font-family:Arial,sans-serif">
            <h2>Email Verification</h2>

            <p>
              Your verification OTP is:
            </p>

            <h1
              style="
                letter-spacing:4px;
                color:#16a34a;
              "
            >
              ${otp}
            </h1>

            <p>
              This OTP expires in
              10 minutes.
            </p>
          </div>
        `,
      });

    console.log(
      "OTP EMAIL SENT:",
      result
    );

    return result;
  } catch (error) {
    console.error(
      "OTP EMAIL ERROR:",
      error
    );

    throw error;
  }
}