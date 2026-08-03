import { categories } from "../../components/categories";

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter = ({
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) => {
  return (
    <div className="mb-12 flex flex-wrap justify-center gap-3">
      {/* Все */}

      <button
        onClick={() => onSelectCategory("all")}
        className={`
          rounded-full
          px-5
          py-2.5
          text-sm
          transition-all
          duration-300

          ${
            selectedCategory === "all"
              ? "bg-zinc-900 text-white"
              : "border border-zinc-300 hover:border-zinc-900"
          }
        `}
      >
        Всі
      </button>

      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onSelectCategory(category.id)}
          className={`
            rounded-full
            px-5
            py-2.5
            text-sm
            transition-all
            duration-300

            ${
              selectedCategory === category.id
                ? "bg-zinc-900 text-white"
                : "border border-zinc-300 hover:border-zinc-900"
            }
          `}
        >
          {category.title}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
