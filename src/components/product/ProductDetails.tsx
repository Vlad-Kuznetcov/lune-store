import type { ProductDetail } from "../../types/product";

interface ProductDetailsProps {
  details?: ProductDetail[];
}

const ProductDetails = ({ details }: ProductDetailsProps) => {
  if (!details || details.length === 0) return null;

  return (
    <section className="mt-12 border-t border-zinc-200 pt-10 sm:mt-16 sm:pt-12">
      <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
        Характеристики
      </p>

      <div className="mt-7 divide-y divide-zinc-100">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex items-center justify-between gap-6 py-4"
          >
            <span className="text-sm text-zinc-500">{detail.label}</span>

            <span className="text-right text-sm font-medium text-zinc-900">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
