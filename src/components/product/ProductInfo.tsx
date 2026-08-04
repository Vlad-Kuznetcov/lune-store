import type { Product } from "../../types/product";

interface ProductInfoProps {
  product: Product;
}

const ProductInfo = ({ product }: ProductInfoProps) => {
  return (
    <div className="flex flex-col">
      <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">LUNÉ</p>

      <h1 className="mt-4 text-4xl leading-tight font-light">{product.name}</h1>

      <p className="mt-3 text-zinc-500">Артикул: {product.article}</p>

      <div className="mt-8 flex items-end gap-4">
        <span className="text-4xl font-semibold">{product.price} грн</span>

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

      <button className="mt-10 w-full rounded-full bg-zinc-900 py-4 text-lg font-medium text-white transition-all duration-300 hover:bg-zinc-800 hover:shadow-lg active:scale-[0.99]">
        Замовити
      </button>
    </div>
  );
};

export default ProductInfo;
