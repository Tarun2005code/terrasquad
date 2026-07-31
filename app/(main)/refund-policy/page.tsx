export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center uppercase tracking-[8px] text-[#C89B3C] font-semibold">
          Legal
        </p>

        <h1 className="mt-4 text-center text-5xl font-black text-[#2F5D50]">
          Refund & Cancellation Policy
        </h1>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-lg space-y-8 text-gray-700 leading-8">
          <p>
            We understand that plans can change. This policy outlines how
            cancellations and refunds are handled.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Participant Cancellation
            </h2>

            <ul className="mt-4 space-y-3 list-disc pl-6">
              <li>
                More than 7 days before departure: 90% refund.
              </li>

              <li>
                Between 3 and 7 days before departure: 50% refund.
              </li>

              <li>
                Less than 72 hours before departure: No refund.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Expedition Cancellation by TerraSquad
            </h2>

            <p className="mt-3">
              If TerraSquad cancels an expedition due to weather, safety,
              insufficient participation, or unforeseen circumstances,
              participants will receive a full refund or an option to transfer
              the booking to another expedition.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Refund Processing
            </h2>

            <p className="mt-3">
              Approved refunds are processed within 7–10 business days to the
              original payment method used during booking.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Contact
            </h2>

            <p className="mt-3">
              For cancellation or refund-related questions, contact us at
              terrasquad.in@gmail.com.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}