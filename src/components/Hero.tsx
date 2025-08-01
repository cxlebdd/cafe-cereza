export default function Hero() {
  return (
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
  );
}
