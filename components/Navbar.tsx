import Button from "@/components/ui/Button";

export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto h-20 px-6 flex items-center justify-between">

        {/* Logo */}
        <a href="/" className="text-3xl font-extrabold tracking-tight text-[#2F5D50]">
          Terra<span className="text-[#C89B3C]">Squad</span>
        </a>

        {/* Navigation */}
        <div className="hidden md:flex items-center gap-8 text-[15px] font-medium">
          <a href="#" className="hover:text-[#2F5D50] transition">Home</a>
          <a href="#" className="hover:text-[#2F5D50] transition">Expeditions</a>
          <a href="#" className="hover:text-[#2F5D50] transition">Destinations</a>
          <a href="#" className="hover:text-[#2F5D50] transition">Gallery</a>
          <a href="#" className="hover:text-[#2F5D50] transition">About</a>
          <a href="#" className="hover:text-[#2F5D50] transition">Contact</a>
        </div>

        {/* CTA */}
        <Button>Book Expedition</Button>

      </div>
    </nav>
  );
}