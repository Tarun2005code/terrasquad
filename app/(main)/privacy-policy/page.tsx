export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center uppercase tracking-[8px] text-[#C89B3C] font-semibold">
          Legal
        </p>

        <h1 className="mt-4 text-center text-5xl font-black text-[#2F5D50]">
          Privacy Policy
        </h1>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-lg space-y-8 text-gray-700 leading-8">
          <p>
            At TerraSquad, we value your privacy and are committed to protecting
            your personal information.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Information We Collect
            </h2>

            <p className="mt-3">
              We may collect your name, email address, phone number, booking
              details, and payment-related information when you interact with
              our platform.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              How We Use Your Information
            </h2>

            <p className="mt-3">
              Your information is used to process bookings, provide expedition
              updates, improve our services, and offer customer support.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Payment Security
            </h2>

            <p className="mt-3">
              Payments are securely processed through Razorpay. TerraSquad does
              not store your card or banking credentials.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Data Protection
            </h2>

            <p className="mt-3">
              We take reasonable security measures to protect your information
              against unauthorized access, disclosure, or misuse.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Contact Us
            </h2>

            <p className="mt-3">
              If you have questions regarding this Privacy Policy, contact us at
              terrasquad.in@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}