import type { LucideIcon } from "lucide-react";

interface Props {
  title: string;
  Icon: LucideIcon;
}

const CategoryCard = ({ title, Icon }: Props) => {
  return (
    <button
      className="
        group
        flex
        flex-col
        items-center
        justify-center
        gap-5
        rounded-3xl
        border
        border-zinc-200
        bg-white
        p-10
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-zinc-900
        hover:shadow-lg
      "
    >
      <Icon
        size={42}
        className="text-zinc-800 transition-transform duration-300 group-hover:scale-110"
      />

      <span className="text-sm font-medium uppercase tracking-wider">
        {title}
      </span>
    </button>
  );
};

export default CategoryCard;
