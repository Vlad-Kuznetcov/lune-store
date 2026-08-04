import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const BackToCatalog = () => {
  return (
    <Link
      to="/catalog"
      className="mb-10 inline-flex items-center gap-2 text-sm text-zinc-500 transition hover:text-zinc-900"
    >
      <ArrowLeft size={18} />
      Назад до каталогу
    </Link>
  );
};

export default BackToCatalog;
