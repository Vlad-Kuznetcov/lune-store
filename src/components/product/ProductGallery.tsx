interface ProductGalleryProps {
  image: string;
  name: string;
}

const ProductGallery = ({ image, name }: ProductGalleryProps) => {
  return (
    <div className="group overflow-hidden rounded-3xl border border-zinc-200 bg-white p-5 sm:p-6 lg:p-8">
      <img
        src={image}
        alt={name}
        className="mx-auto aspect-square w-full max-w-md object-contain transition-transform duration-500 group-hover:scale-105"
      />
    </div>
  );
};

export default ProductGallery;
