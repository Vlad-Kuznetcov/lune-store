import Container from "../ui/Container";
import ProductCard from "../product/ProductCard";

import { products } from "../../data/products";
import SectionTitle from "../ui/SectionTitle";

const FeaturedProductsSection = () => {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle overline="Колекція" title="Популярні прикраси" />

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductsSection;
