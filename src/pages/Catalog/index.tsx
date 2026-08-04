import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { CategoryFilter as CategoryFilterType } from "../../types/category";
import SearchBar from "../../components/catalog/SearchBar";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import CatalogHeader from "../../components/catalog/CatalogHeader";
import CategoryFilter from "../../components/catalog/CategoryFilter";
import ProductGrid from "../../components/catalog/ProductGrid";

import { products } from "../../data/products";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategory =
    (searchParams.get("category") as CategoryFilterType) || "all";

  const [search, setSearch] = useState("");

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const matchesSearch =
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.article.toLowerCase().includes(search.toLowerCase());

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, search]);

  return (
    <>
      <CatalogHeader />

      <Section className="pt-0">
        <Container>
          <div className="flex justify-center">
            <div className="w-full max-w-md">
              <SearchBar value={search} onChange={setSearch} />
            </div>
          </div>

          <CategoryFilter
            selectedCategory={selectedCategory}
            onSelectCategory={(category: CategoryFilterType) => {
              if (category === "all") {
                setSearchParams({});
                return;
              }

              setSearchParams({
                category,
              });
            }}
          />

          <ProductGrid products={filteredProducts} />
        </Container>
      </Section>
    </>
  );
};

export default CatalogPage;
