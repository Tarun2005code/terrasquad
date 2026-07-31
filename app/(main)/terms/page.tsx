export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#F8F7F3] py-32">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center uppercase tracking-[8px] text-[#C89B3C] font-semibold">
          Legal
        </p>

        <h1 className="mt-4 text-center text-5xl font-black text-[#2F5D50]">
          Terms & Conditions
        </h1>

        <div className="mt-12 rounded-3xl bg-white p-10 shadow-lg space-y-8 text-gray-700 leading-8">
          <p>
            By accessing and using TerraSquad services, you agree to the
            following terms and conditions.
          </p>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Bookings
            </h2>

            <p className="mt-3">
              Users must provide accurate information while making expedition
              bookings. Incorrect details may affect participation.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Expedition Changes
            </h2>

            <p className="mt-3">
              TerraSquad reserves the right to modify itineraries, schedules, or
              destinations due to weather, safety concerns, government
              regulations, or unforeseen circumstances.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Participant Responsibility
            </h2>

            <p className="mt-3">
              Participants are responsible for following expedition guidelines,
              instructions from trip leaders, and maintaining appropriate
              conduct during expeditions.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Risk Acknowledgement
            </h2>

            <p className="mt-3">
              Outdoor adventure activities involve inherent risks. By joining a
              TerraSquad expedition, participants acknowledge and accept these
              risks voluntarily.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-[#2F5D50]">
              Intellectual Property
            </h2>

            <p className="mt-3">
              All content, branding, logos, images, and materials on this
              website remain the property of TerraSquad.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}