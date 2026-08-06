import type { Product } from "../../types/product";
import { Link } from "react-router-dom";
import { STORE_DISCOUNT } from "../../constants/store";
interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const discount = 15;

  const oldPrice = Math.round(product.price / (1 - discount / 100));
  return (
    <Link
      to={`/catalog/${product.id}`}
      className="group block overflow-hidden rounded-3xl border border-zinc-200 bg-white transition-all duration-500 hover:-translate-y-2 hover:border-zinc-300 hover:shadow-xl"
    >
      <div className="relative overflow-hidden bg-stone-50">
        <div className="absolute top-4 left-4 z-10 rounded-full bg-zinc-900 px-3 py-1 text-xs font-medium text-white shadow-md">
          -{STORE_DISCOUNT}%
        </div>

        <img
          src={product.image}
          alt={product.name}
          className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
      </div>

      <div className="space-y-3 p-6">
        <h3 className="line-clamp-2 min-h-[56px] text-lg font-medium">
          {product.name}
        </h3>

        <div className="space-y-1">
          {product.oldPrice && (
            <p className="text-sm text-zinc-400 line-through">
              {product.oldPrice.toLocaleString("uk-UA")} ₴
            </p>
          )}

          <div className="space-y-1">
            <p className="text-sm text-zinc-400 line-through">
              {oldPrice.toLocaleString("uk-UA")} ₴
            </p>

            <p className="text-2xl font-semibold tracking-wide text-zinc-900">
              {product.price.toLocaleString("uk-UA")} ₴
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
