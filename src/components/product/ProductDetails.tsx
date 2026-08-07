import type { ProductDetail } from "../../types/product";

interface ProductDetailsProps {
  details?: ProductDetail[];
}

const ProductDetails = ({ details }: ProductDetailsProps) => {
  if (!details || details.length === 0) return null;

  return (
    <section className="mt-14 border-t border-zinc-200 pt-8 sm:mt-16 sm:pt-12">
      <h2 className="text-xl font-light sm:text-2xl">Детальна інформація</h2>

      <div className="mt-8 space-y-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex flex-col gap-1 border-b border-zinc-100 pb-4 sm:flex-row sm:items-center sm:justify-between"
          >
            <span className="text-sm text-zinc-500 sm:text-base">
              {detail.label}
            </span>

            <span className="text-sm font-medium text-zinc-900 sm:text-base">
              {detail.value}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
