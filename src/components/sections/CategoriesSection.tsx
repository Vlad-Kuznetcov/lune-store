import Container from "../ui/Container";
import CategoryCard from "../category/CategoryCard";

import { categories } from "../../constants/categories";
import SectionTitle from "../ui/SectionTitle";

const CategoriesSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <SectionTitle overline="Категорії" title="Оберіть категорію" />

        <div className="mt-10 grid grid-cols-2 gap-4 sm:mt-12 sm:gap-5 lg:mt-16 lg:grid-cols-5 lg:gap-6">
          {categories.map(({ id, title, icon: Icon }) => (
            <CategoryCard key={id} title={title} category={id} Icon={Icon} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
