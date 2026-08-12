interface ProductDescriptionProps {
  description?: string;
}

const ProductDescription = ({ description }: ProductDescriptionProps) => {
  if (!description) return null;

  return (
    <section className="mt-16 border-t border-zinc-200 pt-10 sm:mt-20 sm:pt-12 lg:mt-24">
      <p className="text-xs tracking-[0.3em] text-zinc-500 uppercase">
        Про прикрасу
      </p>

      <p className="mt-5 max-w-3xl text-sm leading-7 text-zinc-600 sm:text-base sm:leading-8">
        {description}
      </p>
    </section>
  );
};

export default ProductDescription;
