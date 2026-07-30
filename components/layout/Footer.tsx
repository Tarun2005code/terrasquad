import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-3xl font-black">
              <span className="text-white">Terra</span>
              <span className="text-[#718F44]">Squad</span>
            </h3>

            <p className="text-gray-400 mt-4">
              Explore Earth Together.
            </p>

            <p className="text-gray-500 mt-4 text-sm leading-6">
              Adventure expeditions, trekking experiences, hidden
              destinations, and unforgettable memories across India.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-4">
              Quick Links
            </h4>

            <div className="space-y-2">
              <Link
                href="#home"
                className="block text-gray-400 hover:text-white transition"
              >
                Home
              </Link>

              <Link
                href="/expeditions"
                className="block text-gray-400 hover:text-white transition"
              >
                Expeditions
              </Link>

              <Link
                href="#gallery"
                className="block text-gray-400 hover:text-white transition"
              >
                Gallery
              </Link>

              <Link
                href="/contact"
                className="block text-gray-400 hover:text-white transition"
              >
                Contact
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-bold mb-4">
              Legal
            </h4>

            <div className="space-y-2">
              <Link
                href="/privacy-policy"
                className="block text-gray-400 hover:text-white transition"
              >
                Privacy Policy
              </Link>

              <Link
                href="/terms"
                className="block text-gray-400 hover:text-white transition"
              >
                Terms & Conditions
              </Link>

              <Link
                href="/refund-policy"
                className="block text-gray-400 hover:text-white transition"
              >
                Refund Policy
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-white font-bold mb-4">
              Connect
            </h4>

            <div className="space-y-2 text-gray-400">
              <a
                href="mailto:terrasquad.in@gmail.com"
                className="block hover:text-white transition"
              >
                terrasquad.in@gmail.com
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

              <span className="block text-gray-500">
                +91 9713024303
              </span>

              <span className="block text-gray-500">
                India
              </span>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 mt-12 pt-6 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>
            © 2026 TerraSquad. All Rights Reserved.
          </p>

          <p>
            Designed for explorers • Built with ❤️ in India
          </p>
        </div>
      </div>
    </footer>
  );
}