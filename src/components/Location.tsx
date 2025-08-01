export default function Location() {
  return (
    <section
      id="location"
      className="max-w-6xl mx-auto mb-20 px-6 sm:px-12"
      style={{ width: "100%", maxWidth: "960px" }}
    >
      <h3 className="text-3xl font-bold mb-6 text-red-700 border-b-2 border-red-700 inline-block max-w-max">
        Ubicación
      </h3>
      <div
        style={{
          width: "100%",
          height: "500px",
          boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          borderRadius: "12px",
          overflow: "hidden",
        }}
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
  );
}
