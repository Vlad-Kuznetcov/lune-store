interface ProductDescriptionProps {
  description?: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <section className="mt-20 border-t border-zinc-200 pt-12">
      <h2 className="text-2xl font-light">Опис</h2>

      <p className="mt-6 max-w-3xl leading-8 text-zinc-600">{description}</p>
    </section>
  );
};

export default ProductDescription;
