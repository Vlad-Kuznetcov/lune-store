import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../context/CartContext";

interface HeaderActionsProps {
  mobile?: boolean;
  onNavigate?: () => void;
}

const HeaderActions = ({ mobile = false, onNavigate }: HeaderActionsProps) => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div
      className={
        mobile ? "flex items-center justify-between" : "flex items-center gap-4"
      }
    >
      <div className="flex items-center gap-5">
        <a
          href="#"
          className="transition hover:text-zinc-500"
          aria-label="Instagram"
        >
          <FaInstagram size={20} />
        </a>

        <a
          href="#"
          className="transition hover:text-zinc-500"
          aria-label="Telegram"
        >
          <FaTelegramPlane size={20} />
        </a>
      </div>

      <Link
        to="/cart"
        onClick={onNavigate}
        aria-label="Кошик"
        className="group relative flex h-11 w-11 items-center justify-center rounded-full border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-0.5 hover:border-stone-300 hover:shadow-md"
      >
        <ShoppingBag
          size={20}
          className="text-zinc-700 transition-transform duration-300 group-hover:scale-110"
        />

        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-[11px] font-medium text-white">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
};

export default HeaderActions;
