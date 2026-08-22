import Container from "../ui/Container";
import ProductCard from "../product/ProductCard";
import SectionTitle from "../ui/SectionTitle";
import { useProducts } from "../../hooks/useProducts";

const FeaturedProductsSection = () => {
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="flex items-center justify-center py-12">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
          </div>
        </Container>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 sm:py-20 lg:py-24">
        <Container>
          <div className="py-12 text-center">
            <p className="text-zinc-500">{error}</p>
          </div>
        </Container>
      </section>
    );
  }

  const featuredProducts = products
    .filter((product) => product.isPopular)
    .slice(0, 4);

  if (featuredProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle overline="Колекція" title="Популярні прикраси" />

        <div className="mt-10 grid grid-cols-1 gap-6 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:mt-16 lg:grid-cols-4 lg:gap-8">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FeaturedProductsSection;
