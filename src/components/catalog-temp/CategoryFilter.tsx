import { categories } from "../../constants/categories";
import type { CategoryFilter as CategoryFilterType } from "../../types/category";

interface CategoryFilterProps {
  selectedCategory: CategoryFilterType;
  onSelectCategory: (category: CategoryFilterType) => void;
}

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-3">
      <button
        onClick={() => onSelectCategory("all")}
        className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
          selectedCategory === "all"
            ? "bg-zinc-900 text-white"
            : "border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
        } `}
      >
        Всі
      </button>

      {categories.map((category) => {
        const Icon = category.icon;

        return (
          <button
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm transition-all duration-300 ${
              selectedCategory === category.id
                ? "bg-zinc-900 text-white"
                : "border border-zinc-300 hover:border-zinc-900 hover:bg-zinc-900 hover:text-white"
            } `}
          >
            <Icon size={18} />
            {category.title}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
