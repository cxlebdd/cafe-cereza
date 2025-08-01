import Card from "./Card";

export default function Menu() {
  return (
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
  );
}
