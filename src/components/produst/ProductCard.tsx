import { ArrowRight } from "lucide-react";
import type { Product } from "../../types/product";
import { Link } from "react-router-dom";

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <Link
      to="#"
      className="
    group
    block
    overflow-hidden
    rounded-3xl
    border
    border-zinc-200
    bg-white
    transition-all
    duration-300
    hover:-translate-y-1
    hover:border-zinc-300
  "
    >
      <div className="relative overflow-hidden bg-zinc-50">
        <img
          src={product.image}
          alt={product.name}
          className="
            aspect-square
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      </div>

      <div className="space-y-4 p-6">
        <h3 className="text-lg font-medium">{product.name}</h3>

        <p className="text-xl font-medium tracking-wide">
          {product.price.toLocaleString("uk-UA")} ₴
        </p>

        <div
          className="
    flex
    items-center
    gap-2
    text-sm
    font-medium
    text-zinc-700
  "
        >
          <span>Переглянути</span>

          <ArrowRight
            size={18}
            className="
      transition-transform
      duration-300
      group-hover:translate-x-1
    "
          />
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
