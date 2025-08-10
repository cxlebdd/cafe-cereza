import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Variants } from "framer-motion";
import { GiCherry } from "react-icons/gi";
import { FiMenu, FiX } from "react-icons/fi";
import { client } from "./sanityClient";

type Product = {
  _id: string;
  title: string;
  price: string;
  imgUrl: string;
  tags?: string[];
};

const navItems = ["Inicio", "Menú", "Ubicación"];

const navItemVariants: Variants = {
  hidden: { opacity: 0, y: -10 },
  visible: (custom: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: custom * 0.1, ease: "easeOut" },
  }),
};

const rotatingWords = [
  "pasión.",
  "aroma.",
  "esencia.",
  "sabor.",
  "energía.",
  "calidez.",
  "tradición.",
  "momento.",
  "placer.",
  "magia.",
];

const CoffeeParticles = () => {
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const particles: {
    x: number;
    y: number;
    radius: number;
    alpha: number;
    speed: number;
  }[] = [];

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const width = (canvas.width = window.innerWidth);
    const height = (canvas.height = 400);

    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * width,
        y: height + Math.random() * 100,
        radius: 3 + Math.random() * 5,
        alpha: 0.15 + Math.random() * 0.35,
        speed: 0.4 + Math.random() * 0.6,
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.fillStyle = `rgba(210, 180, 140, ${p.alpha})`;
        ctx.shadowColor = `rgba(210, 180, 140, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();

        p.y -= p.speed;
        p.alpha -= 0.003;
        if (p.alpha <= 0) {
          p.x = Math.random() * width;
          p.y = height + 20;
          p.radius = 3 + Math.random() * 5;
          p.alpha = 0.15 + Math.random() * 0.35;
          p.speed = 0.4 + Math.random() * 0.6;
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute bottom-0 left-0 w-full h-[400px] pointer-events-none select-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [wordIndex, setWordIndex] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState("inicio");

  useEffect(() => {
    const query = `*[_type == "product"]{
      _id,
      title,
      price,
      tags,
      "imgUrl": image.asset->url
    }`;
    client
      .fetch(query)
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      const sections = navItems.map((item) =>
        document.getElementById(item.toLowerCase())
      );

      const scrollPos = window.scrollY + window.innerHeight / 3;

      for (let i = sections.length - 1; i >= 0; i--) {
        const sec = sections[i];
        if (sec && sec.offsetTop <= scrollPos) {
          setActiveNav(navItems[i].toLowerCase());
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen font-sans text-gray-100 selection:bg-red-600 selection:text-white overflow-x-hidden"
      style={{
        background:
          "linear-gradient(135deg, #1a1a1a 0%, #2b0a0a 40%, #420000 75%, #220000 100%)",
      }}
    >
      {/* NAVBAR */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 shadow-lg backdrop-blur-sm transition-colors duration-500 ${
          scrolled ? "bg-black bg-opacity-90" : "bg-black bg-opacity-80"
        }`}
      >
        <div className="max-w-7xl mx-auto flex justify-between items-center py-5 px-6 md:px-12">
          <h1 className="flex items-center gap-2 text-3xl font-extrabold select-none cursor-default">
            <span className="text-[#d8a47f] drop-shadow-md">Café</span>
            <GiCherry className="text-red-500 w-8 h-8 drop-shadow-lg" />
            <span className="text-red-500 drop-shadow-lg">Cereza</span>
          </h1>

          <nav className="hidden md:flex space-x-10 uppercase text-sm md:text-base font-semibold tracking-widest text-gray-300">
            {navItems.map((item, i) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                className={`relative cursor-pointer group ${
                  activeNav === item.toLowerCase()
                    ? "text-[#d8a47f]"
                    : "text-gray-300"
                }`}
                initial="hidden"
                animate="visible"
                custom={i}
                variants={navItemVariants}
                onClick={() => setMenuOpen(false)}
                onFocus={() => setActiveNav(item.toLowerCase())}
              >
                {item}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full ${
                    activeNav === item.toLowerCase() ? "w-full" : "w-0"
                  }`}
                />
              </motion.a>
            ))}
          </nav>

          <button
            className="md:hidden text-gray-300 hover:text-red-500 transition-colors duration-300"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
          </button>

          
        </div>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="md:hidden bg-black bg-opacity-90 text-gray-300 uppercase font-semibold tracking-wide"
            >
              <ul className="flex flex-col space-y-6 py-6 px-6">
                {navItems.map((item, i) => (
                  <motion.li
                    key={item}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                    variants={navItemVariants}
                    className="cursor-pointer border-b border-gray-700 pb-2"
                    onClick={() => {
                      setMenuOpen(false);
                      setActiveNav(item.toLowerCase());
                    }}
                  >
                    <a href={`#${item.toLowerCase()}`} className="block">
                      {item}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.nav>
          )}
        </AnimatePresence>
      </header>

      {/* HERO */}
      <section
        id="inicio"
        className="relative flex flex-col md:flex-row items-center justify-between max-w-7xl mx-auto min-h-screen px-6 md:px-12 pt-28 md:pt-36 overflow-hidden"
      >
        <motion.div
          className="md:w-1/2 max-w-lg text-center md:text-left z-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          <h1 className="text-6xl md:text-7xl font-extrabold leading-tight mb-6 tracking-wide text-red-500 drop-shadow-lg select-none">
            El café que despierta tu{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={rotatingWords[wordIndex]}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="inline-block border-b-4 border-[#d8a47f]"
                aria-live="polite"
              >
                {rotatingWords[wordIndex]}
              </motion.span>
            </AnimatePresence>
          </h1>
          <p className="text-[#d8a47f] text-lg md:text-xl mb-10 max-w-md leading-relaxed select-text drop-shadow-md">
            Sabor artesanal, ambiente único. Vive la experiencia Café Cereza en
            cada sorbo.
          </p>
        </motion.div>

        <motion.div
          className="relative md:w-1/2 w-full max-w-lg mx-auto md:mx-0 mb-12 md:mb-0 rounded-3xl overflow-hidden shadow-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          style={{ maxHeight: "400px" }}
        >
          <div className="w-full h-[350px] relative">
            <img
              src="/pared.jpg"
              className="object-cover w-full h-full"
              loading="lazy"
              draggable={false}
            />
          </div>

          <div className="absolute inset-0 bg-black/60 pointer-events-none" />
          <motion.div
            className="absolute top-24 left-24 w-24 h-44 bg-gradient-to-t from-white/40 to-transparent rounded-full blur-3xl opacity-40"
            animate={{ y: [0, -15, 0] }}
            transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute top-40 left-36 w-20 h-36 bg-gradient-to-t from-white/30 to-transparent rounded-full blur-2xl opacity-25"
            animate={{ y: [0, -10, 0] }}
            transition={{
              repeat: Infinity,
              duration: 5,
              ease: "easeInOut",
              delay: 1,
            }}
          />
        </motion.div>
      </section>

      {/* MENÚ */}
      <section
        id="menú"
        className="max-w-6xl mx-auto px-6 md:px-10 py-20"
        aria-label="Menú de productos"
      >
        <h2 className="text-center text-[#d8a47f] text-4xl font-extrabold mb-6 tracking-wide drop-shadow-md select-none">
          Menú
        </h2>
        <span className="block h-1 w-24 bg-red-500 mx-auto mb-10 rounded-full shadow-lg" />

        {loading ? (
          <p className="text-center text-gray-400 text-lg italic">
            Cargando productos...
          </p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-400 text-lg italic">
            No hay productos disponibles.
          </p>
        ) : (
          <motion.ul
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12"
            initial="hidden"
            animate="visible"
            variants={{
              visible: {
                transition: { staggerChildren: 0.12, delayChildren: 0.1 },
              },
            }}
          >
            {products.map(({ _id, title, price, imgUrl }) => (
              <motion.li
                key={_id}
                className="relative cursor-pointer rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300"
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                role="button"
                tabIndex={0}
                aria-label={`${title}, precio ${price} pesos`}
              >
                <img
                  src={imgUrl}
                  alt={title}
                  className="w-full h-64 object-cover object-center transition-transform duration-500 scale-[1.1] hover:scale-100"
                  loading="lazy"
                  draggable={false}
                />

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-6 py-4 flex justify-between items-center">
                  <h3 className="text-white font-semibold text-lg truncate max-w-[70%] drop-shadow-md">
                    {title}
                  </h3>
                  <span className="text-red-500 font-bold text-lg select-none drop-shadow-lg">
                    ${price}
                  </span>
                </div>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </section>

      {/* TESTIMONIOS */}
      <section
        id="nosotros"
        aria-label="Testimonios de clientes"
        className="max-w-6xl mx-auto px-6 md:px-10 py-20"
      >
        <h2 className="text-center text-[#d8a47f] text-4xl font-extrabold mb-6 tracking-wide drop-shadow-md select-none">
          Opiniones
        </h2>
        <span className="block h-1 w-24 bg-red-500 mx-auto mb-12 rounded-full shadow-lg" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              id: 1,
              text:
                "El mejor café que he probado, el ambiente es increíble y el aroma te envuelve.",
              name: "Ana Gómez",
              location: "Ciudad de México",
            },
            {
              id: 2,
              text:
                "Servicio excepcional y cada taza se siente hecha con pasión y dedicación.",
              name: "Luis Fernández",
              location: "Guadalajara",
            },
            {
              id: 3,
              text:
                "Un lugar acogedor para disfrutar con amigos y desconectar del día a día.",
              name: "María Pérez",
              location: "Monterrey",
            },
          ].map(({ id, text, name, location }) => (
            <motion.blockquote
              key={id}
              className="bg-black p-6 shadow-inner flex flex-col justify-between"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: id * 0.2, ease: "easeOut" }}
            >
              <p className="mb-4 italic leading-relaxed text-gray-200">"{text}"</p>
              <footer className="text-sm font-semibold text-red-400">
                — {name}, <span className="text-gray-400">{location}</span>
              </footer>
            </motion.blockquote>
          ))}
        </div>
      </section>

      {/* MAPA GOOGLE */}
      <section
        id="ubicación"
        className="max-w-7xl mx-auto px-6 md:px-12 mt-24 mb-16 rounded-lg overflow-hidden shadow-lg"
        aria-label="Ubicación de la cafetería"
      >
        <h2 className="text-center text-[#d8a47f] text-4xl font-extrabold mb-6 tracking-wide drop-shadow-md select-none">
          Ubicación
        </h2>
        <span className="block h-1 w-24 bg-red-500 mx-auto mb-12 rounded-full shadow-lg" />
        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg">
          <iframe
            title="Ubicación Café Cereza"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3764.501109193884!2d-99.03482879008547!3d19.347443081838403!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1fd49c6d9bde5%3A0xd26bc52f887c09cf!2sCaf%C3%A9%20Cereza!5e0!3m2!1ses-419!2smx!4v1754721759851!5m2!1ses-419!2smx"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={false}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-black bg-opacity-90 text-gray-400 py-8 mt-16 select-none">
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 text-lg font-semibold">
            <GiCherry className="text-red-500 w-8 h-8" />
            <span className="text-[#d8a47f]">Café Cereza</span>
          </div>
          <p className="text-sm text-center md:text-left">
            © {new Date().getFullYear()} Café Cereza. Todos los derechos
            reservados.
          </p>
          <nav aria-label="Redes sociales" className="flex gap-4">
            <a
              href="#"
              className="hover:text-red-500 transition-colors"
              aria-label="Facebook"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.876v-6.987h-2.54v-2.89h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="#"
              className="hover:text-red-500 transition-colors"
              aria-label="Instagram"
            >
              <svg
                className="w-6 h-6 fill-current"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                aria-hidden="true"
                focusable="false"
              >
                <path d="M7.75 2A5.75 5.75 0 002 7.75v8.5A5.75 5.75 0 007.75 22h8.5A5.75 5.75 0 0022 16.25v-8.5A5.75 5.75 0 0016.25 2h-8.5zm8.5 2a3.75 3.75 0 013.75 3.75v8.5a3.75 3.75 0 01-3.75 3.75h-8.5a3.75 3.75 0 01-3.75-3.75v-8.5A3.75 3.75 0 017.75 4h8.5zm-4.25 2.75a4.5 4.5 0 100 9 4.5 4.5 0 000-9zm0 2.5a2 2 0 110 4 2 2 0 010-4zm4.75-.75a1 1 0 100 2 1 1 0 000-2z" />
              </svg>
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}