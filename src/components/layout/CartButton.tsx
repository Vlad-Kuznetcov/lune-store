import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

interface CartButtonProps {
  onNavigate?: () => void;
}

const CartButton = ({ onNavigate }: CartButtonProps) => {
  const { cart } = useCart();

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
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
  );
};

export default CartButton;
