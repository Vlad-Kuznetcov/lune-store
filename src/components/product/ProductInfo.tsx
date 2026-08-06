import type { Product } from "../../types/product";
import { Check, ShoppingBag } from "lucide-react";
import { useCart } from "../context/CartContext";
import { toast } from "sonner";
import { useState } from "react";
import { STORE_DISCOUNT } from "../../constants/store";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart } = useCart();
  const [added, setAdded] = useState(false);

  const oldPrice = Math.round(product.price / (1 - STORE_DISCOUNT / 100));

  return (
    <div className="flex flex-col">
      <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">LUNÉ</p>
      <h1 className="mt-4 text-4xl leading-tight font-light">{product.name}</h1>
      <p className="mt-3 text-zinc-500">Артикул: {product.article}</p>
      <div className="mt-8 flex items-end gap-4">
        <div className="space-y-1">
          <p className="text-lg text-zinc-400 line-through">
            {oldPrice.toLocaleString("uk-UA")} ₴
          </p>

          <p className="text-4xl font-semibold tracking-wide">
            {product.price.toLocaleString("uk-UA")} ₴
          </p>

          <p className="text-sm font-medium text-emerald-600">
            ✨ -{STORE_DISCOUNT}% на честь відкриття
          </p>
        </div>

        {product.oldPrice && (
          <span className="text-lg text-zinc-400 line-through">
            {product.oldPrice} грн
          </span>
        )}
      </div>
      <div className="mt-8">
        {product.available ? (
          <span className="inline-flex rounded-full bg-emerald-100 px-4 py-2 text-sm font-medium text-emerald-700">
            ✓ В наявності
          </span>
        ) : (
          <span className="inline-flex rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-700">
            ✕ Немає в наявності
          </span>
        )}
      </div>

      <button
        onClick={() => {
          addToCart(product);

          setAdded(true);

          toast.success("Додано до кошика", {
            description: `${product.name} • ${product.price} грн`,
          });

          setTimeout(() => {
            setAdded(false);
          }, 1200);
        }}
        className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-zinc-900 py-4 text-lg font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98]"
      >
        <>
          {added ? (
            <>
              <Check size={20} />
              Додано
            </>
          ) : (
            <>
              <ShoppingBag size={20} />
              Додати до кошика
            </>
          )}
        </>
      </button>
    </div>
  );
};

export default ProductInfo;
