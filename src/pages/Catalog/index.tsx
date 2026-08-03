import { useMemo, useState } from "react";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import CatalogHeader from "../../components/Catalog/CatalogHeader";
import CategoryFilter from "../../components/Catalog/CategoryFilter";
import ProductGrid from "../../components/Catalog/ProductGrid";

import { products } from "../../components/data/products";

const CatalogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredProducts = useMemo(() => {
    if (selectedCategory === "all") {
      return products;
    }

    return products.filter((product) => product.category === selectedCategory);
  }, [selectedCategory]);

  return (
    <>
      <CatalogHeader />

      <Section className="pt-0">
        <Container>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
          />

          <ProductGrid products={filteredProducts} />
        </Container>
      </Section>
    </>
  );
};

export default CatalogPage;
