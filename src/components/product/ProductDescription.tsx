interface ProductDescriptionProps {
  description?: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <section className="mt-14 border-t border-zinc-200 pt-8 sm:mt-20 sm:pt-12">
      <h2 className="text-xl font-light sm:text-2xl">Опис</h2>

      <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-600 sm:mt-6 sm:leading-8">
        {description}
      </p>
    </section>
  );
};

export default ProductDescription;
