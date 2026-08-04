import type { ProductDetail } from "../../types/product";

interface ProductDetailsProps {
  details?: ProductDetail[];
}

const ProductDetails = ({ details }: ProductDetailsProps) => {
  if (!details || details.length === 0) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-12">
      <h2 className="text-2xl font-light">Детальна інформація</h2>

      <div className="mt-8 space-y-4">
        {details.map((detail) => (
          <div
            key={detail.label}
            className="flex justify-between border-b border-zinc-100 pb-4"
          >
            <span className="text-zinc-500">{detail.label}</span>

            <span className="font-medium text-zinc-900">{detail.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProductDetails;
