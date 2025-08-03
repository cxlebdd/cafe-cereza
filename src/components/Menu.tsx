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
            console.log('listo', data);
            setProducts(data);
        });
    }, []);

  return (
    <section id="menu" className="max-w-6xl mx-auto px-6 py-16">
      <h3 className="text-4xl font-bold mb-12 text-red-700 border-b-4 border-red-700 inline-block max-w-max">
        Menú
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
        {products.map((product) => (
            <Card 
                key={product._id}
                img={product.imgUrl}
                title={product.title}
                price={product.price}
            />
        ))}
      </div>
    </section>
  );
}
