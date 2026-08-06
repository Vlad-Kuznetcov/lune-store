import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { useCart } from "../../components/context/CartContext";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-stone-100">
          <ShoppingBag size={34} className="text-zinc-700" />
        </div>

        <h2 className="mt-8 text-3xl font-medium">Ваш кошик порожній</h2>

        <p className="mt-4 max-w-md leading-7 text-zinc-500">
          Перейдіть до каталогу, щоб знайти прикраси, які ідеально доповнять ваш
          образ.
        </p>

        <Link
          to="/catalog"
          className="mt-10 rounded-full bg-zinc-900 px-8 py-4 text-white transition hover:bg-zinc-800 hover:shadow-lg"
        >
          До каталогу
        </Link>
      </div>
    );
  }

  return (
    <Section>
      <Container>
        <SectionTitle overline="LUNÉ" title="Кошик" />

        <div className="mt-16 space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-6 rounded-3xl border border-stone-200 bg-white p-6"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-28 w-28 rounded-2xl bg-stone-100 object-cover"
              />

              <div className="flex-1">
                <h2 className="text-xl font-medium">{item.name}</h2>

                <p className="mt-2 text-sm text-stone-500">
                  Артикул: {item.article}
                </p>

                <p className="mt-4 text-xl font-semibold">{item.price} грн</p>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => decreaseQuantity(item.id)}
                  className="rounded-full border p-2 hover:bg-stone-100"
                >
                  <Minus size={16} />
                </button>

                <span className="w-8 text-center">{item.quantity}</span>

                <button
                  onClick={() => increaseQuantity(item.id)}
                  className="rounded-full border p-2 hover:bg-stone-100"
                >
                  <Plus size={16} />
                </button>
              </div>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-stone-400 transition hover:text-red-500"
              >
                <Trash2 size={22} />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-stone-200 bg-white p-8">
          <div className="flex items-center justify-between text-2xl">
            <span>Разом</span>

            <span className="font-semibold">{total} грн</span>
          </div>

          <button className="mt-8 w-full rounded-full bg-zinc-900 py-4 text-lg font-medium text-white transition hover:bg-zinc-800">
            Оформити через Telegram
          </button>
        </div>
      </Container>
    </Section>
  );
};

export default CartPage;
