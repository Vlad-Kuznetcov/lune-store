import { Link } from "react-router-dom";
import type { LucideIcon } from "lucide-react";
import type { ProductCategory } from "../../types/category";

interface Props {
  title: string;
  category: ProductCategory;
  Icon: LucideIcon;
}

const CategoryCard = ({ title, category, Icon }: Props) => {
  return (
    <Link
      to={`/catalog?category=${category}`}
      className="group flex flex-col items-center rounded-3xl border border-zinc-200 bg-white p-4 transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg sm:p-6 lg:p-8"
    >
      <Icon
        size={32}
        className="text-zinc-700 transition-transform duration-300 group-hover:scale-110 lg:size-9"
      />

      <h3 className="mt-4 text-center text-sm font-medium sm:text-base lg:text-lg">
        {title}
      </h3>
    </Link>
  );
};

export default CategoryCard;
