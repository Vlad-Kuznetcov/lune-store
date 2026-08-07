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
      <div className="relative overflow-hidden bg-stone-50">
        <div className="absolute top-3 left-3 z-10 rounded-xl bg-zinc-900 px-2.5 py-1 text-xs font-medium text-white shadow-md sm:top-4 sm:left-4">
          -{STORE_DISCOUNT}%
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="flex h-full flex-col p-4 sm:p-5 lg:p-6">
        <h3 className="min-h-[84px] text-base leading-7 font-medium sm:min-h-[64px] sm:text-lg">
          {product.name}
        </h3>

        <div className="space-y-1">
          <p className="text-sm text-zinc-400 line-through">
            {oldPrice.toLocaleString("uk-UA")} ₴
          </p>

          <p className="text-xl font-semibold tracking-wide text-zinc-900 sm:text-2xl">
            {product.price.toLocaleString("uk-UA")} ₴
          </p>
        </div>

        <div className="pt-2"></div>
      </div>
    </Link>
  );
};

export default ProductCard;
