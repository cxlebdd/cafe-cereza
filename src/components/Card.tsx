 type CardProps = {
  img: string;
  title: string;
  price: string;
};

export default function Card({ img, title, price }: CardProps) {
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
