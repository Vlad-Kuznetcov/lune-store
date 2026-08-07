import { useParams } from "react-router-dom";

import { products } from "../../data/products";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import ProductGallery from "../../components/product/ProductGallery";
import ProductInfo from "../../components/product/ProductInfo";
import BackToCatalog from "../../components/product/BackToCatalog";
import ProductDescription from "../../components/product/ProductDescription";
import ProductDetails from "../../components/product/ProductDetails";

import ProductGrid from "../../components/catalog/ProductGrid";
import SectionTitle from "../../components/ui/SectionTitle";

const ProductPage = () => {
  const { id } = useParams();

  const product = products.find((item) => item.id === Number(id));

  if (!product) {
    return (
      <Section>
        <Container>
          <div className="py-24 text-center">
            <h1 className="text-3xl font-light">Товар не знайдено</h1>
          </div>
        </Container>
      </Section>
    );
  }

  const relatedProducts = products
    .filter((item) => item.id !== product.id)
    .slice(0, 4);

  return (
    <Section>
      <Container>
        <BackToCatalog />

        <div className="grid gap-16 lg:grid-cols-2">
          <ProductGallery image={product.image} name={product.name} />

          <ProductInfo product={product} />
        </div>

        <ProductDescription description={product.description} />

        <ProductDetails details={product.details} />

        {relatedProducts.length > 0 && (
          <div className="mt-24">
            <SectionTitle
              overline="СХОЖІ ПРИКРАСИ"
              title="Доповніть свій образ"
            />

            <div className="mt-10">
              <ProductGrid products={relatedProducts} />
            </div>
          </div>
        )}
      </Container>
    </Section>
  );
};

export default ProductPage;
