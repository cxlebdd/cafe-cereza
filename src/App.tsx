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
      {/* Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-500 ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        }`}
        style={{ backdropFilter: scrolled ? "saturate(180%) blur(20px)" : "none" }}
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
              <a href="#location" className="hover:text-red-600">
                Ubicación
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

      {/* Hero Section */}
      <section
        className="relative flex flex-col items-center justify-center text-center py-40 px-6 bg-cover bg-center min-h-screen"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1470&q=80')",
        }}
      >
        {/* Overlay oscuro */}
        <div className="absolute inset-0 bg-black opacity-40 z-10"></div>

        {/* Texto encima */}
        <h2 className="relative text-5xl font-extrabold text-white z-20 select-none">
          Café Cereza
        </h2>
      </section>

      {/* Menú Destacado */}
      <section id="menu" className="max-w-6xl mx-auto px-6 py-16">
        <h3 className="text-4xl font-bold mb-12 text-red-700 border-b-4 border-red-700 inline-block max-w-max">
          Menú
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
          <Card
            img="https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=800&q=80"
            title="Café Espresso"
            price="$35 MXN"
          />
          <Card
            img="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?auto=format&fit=crop&w=800&q=80"
            title="Cappuccino"
            price="$45 MXN"
          />
          <Card
            img="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80"
            title="Pastel de Zanahoria"
            price="$55 MXN"
          />
        </div>
      </section>

      {/* Ubicación */}
      <section
        id="location"
        className="max-w-6xl mx-auto mb-20 px-6 sm:px-12"
        style={{ width: "100%", maxWidth: "960px" }}
      >
        <h3 className="text-3xl font-bold mb-6 text-red-700 border-b-2 border-red-700 inline-block max-w-max">
          Ubicación
        </h3>
        <div
          style={{ width: "100%", height: "500px", boxShadow: "0 4px 10px rgba(0,0,0,0.1)", borderRadius: "12px", overflow: "hidden" }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.501108774897!2d-99.0322485!3d19.3474431!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fd49c6d9bde5%3A0xd26bc52f887c09cf!2sCaf%C3%A9%20Cereza!5e0!3m2!1ses-419!2smx!4v1754017668309!5m2!1ses-419!2smx"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Ubicación Café Cereza"
          ></iframe>
        </div>
      </section>


      <footer id="contacto" className="bg-[#2b0f0a] text-gray-200 py-12 px-6 sm:px-12 mt-20">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-red-700 mb-6">Contacto</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="mb-4">¿Tienes alguna duda o sugerencia? Escríbenos:</p>
              <div className="flex items-center space-x-6 text-2xl">
                <a
                  href="https://www.facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <i className="fab fa-facebook"></i>
                </a>
                <a
                  href="https://wa.me/5215512345678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors duration-200"
                >
                  <i className="fab fa-whatsapp"></i>
                </a>
              </div>
            </div>
            <div>
              <p className="mb-2 font-semibold">Horarios:</p>
              <p className="mb-4">
                Abrimos todos los días de <span className="font-bold">5:00 PM a 10:00 PM</span>, <br /> excepto los miercoles.
              </p>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}
