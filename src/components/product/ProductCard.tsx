import { Link } from "react-router-dom";

import type { Product } from "../../types/product";
import { STORE_DISCOUNT } from "../../constants/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const oldPrice = Math.round(product.price / (1 - STORE_DISCOUNT / 100));

  return (
    <Link
      to={`/catalog/${product.id}`}
      className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-xl"
    >
      {/* Фото */}
      <div className="relative overflow-hidden bg-stone-50">
        {/* Скидка */}
        <div className="absolute top-3 left-3 z-10 rounded-xl bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white shadow-md sm:top-4 sm:left-4">
          -{STORE_DISCOUNT}%
        </div>

        {/* Новинка / Популярне */}
        {(product.isNew || product.isPopular) && (
          <div className="absolute top-3 right-3 z-10 rounded-xl bg-white px-2.5 py-1 text-xs font-medium text-zinc-900 shadow-md sm:top-4 sm:right-4">
            {product.isNew ? "Новинка" : "Популярне"}
          </div>
        )}

        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      {/* Информация */}
      <div className="flex h-full flex-col p-5 sm:p-5 lg:p-6">
        <h3 className="text-lg leading-7 font-medium sm:text-lg lg:text-lg">
          {product.name}
        </h3>

        <div className="mt-2 space-y-1">
          {/* Старая цена */}
          <p className="text-base text-zinc-400 line-through">
            {oldPrice.toLocaleString("uk-UA")} ₴
          </p>

          {/* Цена из БД */}
          <p className="text-2xl font-semibold tracking-wide text-zinc-900 sm:text-2xl">
            {product.price.toLocaleString("uk-UA")} ₴
          </p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
