export default function Footer () {
    return (
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

    )
}