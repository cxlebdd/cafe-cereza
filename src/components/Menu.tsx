import Card from "./Card";
import { client } from "../sanityClient";
import { useEffect, useState } from "react";

type Product = {
  _id: string;
  title: string;
  price: string;
  imgUrl: string;
};

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const query = `*[_type == "product"]{
      _id,
      title,
      price,
      "imgUrl": image.asset->url
    }`;

    client.fetch(query).then((data) => {
      setProducts(data);
    });
  }, []);

  return (
    <section id="menu" className="w-full py-16 relative">
      <div className="max-w-6xl mx-auto px-6">
        <h3 className="text-4xl font-bold mb-12 text-red-700 border-b-4 border-red-700 inline-block">
          Menú
        </h3>
      </div>

      <div className="relative overflow-hidden">
        <div
          className="flex gap-6 animate-scroll whitespace-nowrap px-6"
          style={{ animationDuration: "50s" }}
        >
          {[...products, ...products].map((product, index) => (
            <div
              key={product._id + index}
              className="flex-shrink-0 w-[300px]"
            >
              <Card
                img={product.imgUrl}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
