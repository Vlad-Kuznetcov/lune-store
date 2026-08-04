import Container from "../ui/Container";
import CategoryCard from "../category/CategoryCard";

import { categories } from "../../constants/categories";
import SectionTitle from "../ui/SectionTitle";

const CategoriesSection = () => {
  return (
    <section className="py-24">
      <Container>
        <SectionTitle overline="Категорії" title="Оберіть категорію" />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map(({ id, title, icon: Icon }) => (
            <CategoryCard key={id} title={title} category={id} Icon={Icon} />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default CategoriesSection;
