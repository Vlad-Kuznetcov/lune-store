import HeroSection from "../../components/sections/HeroSection";
import CategoriesSection from "../../components/sections/CategoriesSection";
import FeaturedProductsSection from "../../components/sections/FeaturedProductsSection";
import SEO from "../../components/SEO";

const HomePage = () => {
  return (
    <>
      <SEO
        title="LUNÉ — Срібні прикраси"
        description="LUNÉ — срібні прикраси для тих, хто цінує мінімалізм, елегантність та стиль."
      />
      <HeroSection />
      <CategoriesSection />
      <FeaturedProductsSection />
    </>
  );
};

export default HomePage;
