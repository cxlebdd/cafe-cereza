import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Location from "./components/Location";
import Footer from "./components/Footer";

import { useState, useEffect } from "react";

function Card({ img, title, price }: { img: string; title: string; price: string }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 cursor-pointer max-w-sm mx-auto">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={img} alt={title} className="w-full h-full object-cover" />
      </div>
      <div className="p-6">
        <h4 className="font-semibold text-2xl mb-2 text-red-700">{title}</h4>
        <p className="font-bold text-xl text-gray-800">{price}</p>
      </div>
    </div>
  );
}

export default function App() {
  const [scrolled, setScrolled] = useState(false);

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
      <Navbar />

      {/* Menú Destacado */}
      <Menu />

      {/* Ubicación */}
      <Location />

      {/* Footer */}
      <Footer />

    </div>
  );
}
