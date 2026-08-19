import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";

import type { CategoryFilter as CategoryFilterType } from "../../types/category";
import { useProducts } from "../../hooks/useProducts";

import SearchBar from "../../components/catalog/SearchBar";
import CategoryFilter from "../../components/catalog/CategoryFilter";
import ProductGrid from "../../components/catalog/ProductGrid";
import CatalogHeader from "../../components/catalog/CatalogHeader";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SEO from "../../components/SEO";

const CatalogPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState("");

  const { products, loading, error } = useProducts();

  const selectedCategory =
    (searchParams.get("category") as CategoryFilterType) || "all";

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === "all" || product.category === selectedCategory;

      const searchValue = search.toLowerCase().trim();

      const matchesSearch =
        product.name.toLowerCase().includes(searchValue) ||
        product.article.toLowerCase().includes(searchValue);

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, search]);

  return (
    <>
      <SEO
        title="Каталог срібних прикрас — LUNÉ"
        description="Перегляньте каталог срібних каблучок, сережок, браслетів та інших прикрас LUNÉ."
      />

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

          {loading && (
            <div className="flex justify-center py-24">
              <div className="h-10 w-10 animate-spin rounded-full border-2 border-zinc-200 border-t-zinc-900" />
            </div>
          )}

          {error && !loading && (
            <div className="py-24 text-center">
              <p className="text-zinc-500">{error}</p>
            </div>
          )}

          {!loading && !error && filteredProducts.length === 0 && (
            <div className="py-24 text-center">
              <h2 className="text-2xl font-light">Товари не знайдено</h2>

              <p className="mt-3 text-zinc-500">
                Спробуйте змінити пошук або категорію.
              </p>
            </div>
          )}

          {!loading && !error && filteredProducts.length > 0 && (
            <ProductGrid products={filteredProducts} />
          )}
        </Container>
      </Section>
    </>
  );
};

export default CatalogPage;
