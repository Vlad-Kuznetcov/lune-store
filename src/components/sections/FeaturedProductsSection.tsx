import Container from "../ui/Container";
import ProductCard from "../product/ProductCard";

import { products } from "../../data/products";
import SectionTitle from "../ui/SectionTitle";

const FeaturedProductsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle overline="Колекція" title="Популярні прикраси" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductsSection;
