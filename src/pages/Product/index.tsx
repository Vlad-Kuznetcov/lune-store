import { useParams } from "react-router-dom";

import { useProducts } from "../../hooks/useProducts";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import BackToCatalog from "../../components/product/BackToCatalog";
import ProductDescription from "../../components/product/ProductDescription";
import ProductDetails from "../../components/product/ProductDetails";

import ProductGrid from "../../components/catalog/ProductGrid";
import SectionTitle from "../../components/ui/SectionTitle";
import SEO from "../../components/SEO";

const ProductPage = () => {
  const { id } = useParams();
  const { products, loading, error } = useProducts();

  if (loading) {
    return (
      <Section>
        <Container>
          <div className="flex min-h-[50vh] items-center justify-center">
            <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
          </div>
        </Container>
      </Section>
    );
  }

  if (error) {
    return (
      <Section>
        <Container>
          <div className="py-24 text-center">
            <p className="text-zinc-500">{error}</p>
          </div>
        </Container>
      </Section>
    );
  }

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <Section>
        <Container>
          <div className="py-20 text-center sm:py-24">
            <h1 className="text-2xl font-light sm:text-3xl">
              Товар не знайдено
            </h1>
          </div>
        </Container>
      </Section>
    );
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .filter((item) => item.category === product.category)
    .slice(0, 4);

  return (
    <>
      <SEO
        title={`${product.name} — LUNÉ`}
        description={`${product.name}. Срібна прикраса LUNÉ. Артикул: ${product.article}. Замовляйте онлайн.`}
      />

      <Section>
        <Container>
          <BackToCatalog />

          <div className="mt-6 grid gap-10 sm:gap-12 lg:mt-8 lg:grid-cols-2 lg:gap-16">
            <ProductGallery image={product.image} name={product.name} />

            <ProductInfo product={product} />
          </div>

          <ProductDescription description={product.description} />

          <ProductDetails details={product.details} />

          {relatedProducts.length > 0 && (
            <section className="mt-16 border-t border-zinc-200 pt-12 sm:mt-20 sm:pt-16 lg:mt-24">
              <SectionTitle overline="МОЖЕ СПОДОБАТИСЯ" title="" />

              <div className="mt-8 sm:mt-10">
                <ProductGrid products={relatedProducts} />
              </div>
            </section>
          )}
        </Container>
      </Section>
    </>
  );
};

export default ProductPage;
