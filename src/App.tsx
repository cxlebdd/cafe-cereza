import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Location from "./components/Location";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

export default function App() {
  const [scrolled, setScrolled] = useState(false); // <-- aquí

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 20);
    }
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="font-sans text-gray-800 bg-[#FAF5E4] min-h-screen flex flex-col">
      {/* Hero */}
      <Hero />

      {/* Navbar */}
      <Navbar scrolled={scrolled} /> {/* Le pasas scrolled como prop */}

      {/* Menú Destacado */}
      <Menu />

      {/* Ubicación */}
      <Location />

      {/* Footer */}
      <Footer />
    </div>
  );
}
