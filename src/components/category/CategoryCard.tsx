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
      className="group flex flex-col items-center rounded-3xl border border-zinc-200 p-8 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      <Icon
        size={36}
        className="text-zinc-700 transition group-hover:scale-110"
      />

      <h3 className="mt-6 text-lg font-medium">{title}</h3>
    </Link>
  );
};

export default CategoryCard;
