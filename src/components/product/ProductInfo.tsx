import { useState } from "react";
import { Check, ShoppingBag } from "lucide-react";
import { toast } from "sonner";

import type { Product } from "../../types/product";
import { useCart } from "../context/CartContext";
import { STORE_DISCOUNT } from "../../constants/store";

interface ProductInfoProps {
  product: Product;
}

const sizeDiameters: Record<string, string> = {
  "48": "15.3",
  "50": "16",
  "52": "16.5",
  "54": "17.2",
  "56": "17.8",
  "58": "18.5",
  "60": "19",
};

const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addToCart } = useCart();

  const [added, setAdded] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);

  const oldPrice = Math.round(product.price / (1 - STORE_DISCOUNT / 100));

  const hasSizes = Boolean(product.sizes && product.sizes.length > 0);

  const selectedDiameter = selectedSize ? sizeDiameters[selectedSize] : null;

  const handleAddToCart = () => {
    if (hasSizes && !selectedSize) {
      toast.error("Оберіть розмір каблучки");
      return;
    }

    addToCart(product, selectedSize);

    setAdded(true);

    toast.success("Додано до кошика", {
      description: `${product.name}${
        selectedSize ? ` • Розмір ${selectedSize}` : ""
      } • ${product.price} грн`,
    });

    setTimeout(() => {
      setAdded(false);
    }, 1200);
  };

  return (
    <div className="flex flex-col">
      <p className="text-sm tracking-[0.3em] text-zinc-500 uppercase">LUNÉ</p>

      <h1 className="mt-3 text-3xl leading-tight font-light sm:text-4xl">
        {product.name}
      </h1>

      <p className="mt-3 text-sm text-zinc-500">Артикул: {product.article}</p>

      <div className="mt-8 space-y-2">
        <p className="text-base text-zinc-400 line-through sm:text-lg">
          {oldPrice.toLocaleString("uk-UA")} ₴
        </p>

        <p className="text-3xl font-semibold tracking-wide sm:text-4xl">
          {product.price.toLocaleString("uk-UA")} ₴
        </p>

        <p className="text-sm font-medium text-emerald-600">
          ✨ -{STORE_DISCOUNT}% на честь відкриття
        </p>
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

      {/* Розміри */}
      {hasSizes && (
        <div className="mt-8">
          <p className="text-sm font-medium text-zinc-900">Розмір</p>

          <div className="mt-3 flex flex-wrap gap-2">
            {product.sizes?.map((size) => {
              const isSelected = selectedSize === size;

              return (
                <button
                  key={size}
                  type="button"
                  onClick={() => setSelectedSize(size)}
                  className={`flex h-11 min-w-11 items-center justify-center rounded-full border px-4 text-sm transition ${
                    isSelected
                      ? "border-zinc-900 bg-zinc-900 text-white"
                      : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-900"
                  }`}
                >
                  {size}
                </button>
              );
            })}
          </div>

          {/* Внутрішній діаметр */}
          {selectedDiameter && (
            <div className="mt-5">
              <p className="text-sm font-medium text-zinc-900">
                Внутрішній діаметр
              </p>

              <div className="mt-3">
                <div className="inline-flex h-11 items-center justify-center rounded-full border border-zinc-900 bg-zinc-900 px-5 text-sm text-white">
                  {selectedDiameter} мм
                </div>
              </div>
            </div>
          )}

          <p className="mt-4 text-sm text-zinc-500">
            Не знаєте свій розмір?{" "}
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(true)}
              className="font-medium text-zinc-900 underline underline-offset-4 transition hover:text-zinc-500"
            >
              Дізнатися →
            </button>
          </p>
        </div>
      )}

      {/* Кнопка */}
      <button
        onClick={handleAddToCart}
        disabled={!product.available || (hasSizes && !selectedSize)}
        className="mt-10 flex w-full items-center justify-center gap-3 rounded-full bg-zinc-900 py-3.5 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg active:scale-[0.98] disabled:cursor-not-allowed disabled:bg-zinc-300 disabled:hover:translate-y-0 disabled:hover:shadow-none sm:py-4 sm:text-lg"
      >
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
      </button>

      {/* Модалка розміру */}
      {isSizeGuideOpen && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm"
          onClick={() => setIsSizeGuideOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition hover:bg-zinc-100 hover:text-zinc-900"
              aria-label="Закрити"
            >
              ×
            </button>

            <p className="text-sm tracking-[0.25em] text-zinc-400 uppercase">
              LUNÉ
            </p>

            <h2 className="mt-3 text-2xl font-light sm:text-3xl">
              Як визначити розмір?
            </h2>

            <div className="mt-6 space-y-5 text-sm leading-7 text-zinc-600">
              <p>
                Візьміть каблучку, яка вам добре підходить, та виміряйте її{" "}
                <strong className="font-medium text-zinc-900">
                  внутрішній діаметр лінійкою.
                </strong>
              </p>

              <div className="rounded-2xl bg-stone-50 p-4">
                <p className="font-medium text-zinc-900">Наприклад:</p>

                <p className="mt-1">
                  внутрішній діаметр <strong>17,2 мм</strong> ≈ розмір{" "}
                  <strong>54</strong>
                </p>
              </div>

              <p>
                Якщо ви не маєте каблучки для вимірювання — можна обернути
                смужку паперу або нитку навколо пальця, позначити місце стику та
                виміряти довжину в міліметрах.
              </p>

              <p className="text-zinc-500">
                Якщо ви вагаєтесь між двома розмірами, зазвичай краще обрати
                більший.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setIsSizeGuideOpen(false)}
              className="mt-7 w-full rounded-full bg-zinc-900 py-3.5 font-medium text-white transition hover:bg-zinc-800"
            >
              Зрозуміло
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductInfo;
