import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-16">

        <div className="grid md:grid-cols-3 gap-12">

          <div>
            <h3 className="text-3xl font-black">
              <span className="text-white">Terra</span>
              <span className="text-[#718F44]">Squad</span>
            </h3>

            <p className="text-gray-400 mt-4">
              Explore Earth Together.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">
              Quick Links
            </h4>

            <div className="space-y-2">
              <Link href="#home" className="block text-gray-400 hover:text-white">
                Home
              </Link>

              <Link href="/expeditions" className="block text-gray-400 hover:text-white">
                Expeditions
              </Link>

              <Link href="#gallery" className="block text-gray-400 hover:text-white">
                Gallery
              </Link>

              <Link href="/contact" className="block text-gray-400 hover:text-white">
                Contact
              </Link>
            </div>
          </div>

          <div>
  <h4 className="text-white font-bold mb-4">
    Connect
  </h4>

  <div className="text-gray-400">

    <a
      href="mailto:terrasquad.in@gmail.com"
      className="block hover:text-white transition"
    >
      Email
    </a>

    <a
      href="https://instagram.com/terrasquad.in"
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:text-white transition"
    >
      Instagram
    </a>

    <a
      href="https://wa.me/919713024303"
      target="_blank"
      rel="noopener noreferrer"
      className="block hover:text-white transition"
    >
      WhatsApp
    </a>

    <span className="block text-gray-400 cursor-not-allowed">
      YouTube (Coming Soon)
    </span>

  </div>
</div>

        </div>

        <div className="border-t border-white/10 mt-12 pt-6 text-center text-gray-500">
          © 2026 TerraSquad. All Rights Reserved.
        </div>

      </div>

    </footer>
  );
}