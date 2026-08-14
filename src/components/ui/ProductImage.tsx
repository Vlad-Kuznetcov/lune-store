import { useState } from "react";

interface ProductImageProps {
  src: string;
  alt: string;
  className?: string;
}

const ProductImage = ({ src, alt, className = "" }: ProductImageProps) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div className={`overflow-hidden bg-stone-100 ${className}`}>
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          className="h-full w-full object-contain"
          onError={() => setHasError(true)}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center">
          <span
            className="text-3xl font-light tracking-[0.2em] text-zinc-300"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            LUNÉ
          </span>
        </div>
      )}
    </div>
  );
};

export default ProductImage;
