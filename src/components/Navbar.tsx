import { useEffect, useState } from "react";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
        scrolled ? "bg-white shadow-md" : "bg-transparent"
      }`}
      style={{
        backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none",
      }}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <h1
          className={`text-3xl font-extrabold cursor-pointer transition-colors duration-500 ${
            scrolled ? "text-red-700" : "text-white"
          }`}
        >
          Café Cereza
        </h1>
        <ul
          className={`flex space-x-8 font-semibold transition-colors duration-500 ${
            scrolled ? "text-gray-700" : "text-white"
          }`}
        >
          <li>
            <a href="#menu" className="hover:text-red-600">
              Menú
            </a>
          </li>
          <li>
            <a href="#contacto" className="hover:text-red-600">
              Contacto
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}
