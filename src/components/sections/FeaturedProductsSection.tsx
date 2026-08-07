import Container from "../ui/Container";
import ProductCard from "../product/ProductCard";

import { products } from "../../data/products";
import SectionTitle from "../ui/SectionTitle";

const FeaturedProductsSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle overline="Колекція" title="Популярні прикраси" />

        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-12 sm:gap-5 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductsSection;
