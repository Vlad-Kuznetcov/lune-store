import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";

import { useCart } from "../../components/context/CartContext";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import SEO from "../../components/SEO";

const CartPage = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } =
    useCart();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <>
        <SEO
          title="Кошик — LUNÉ"
          description="Ваш кошик у магазині срібних прикрас LUNÉ."
        />
        <Section>
          <Container>
            <div className="flex min-h-[50vh] flex-col items-center justify-center py-16 text-center">
              <ShoppingBag size={40} className="text-zinc-400" />

              <h2 className="mt-8 text-2xl font-medium sm:text-3xl">
                Ваш кошик порожній
              </h2>

              <p className="mt-4 max-w-md px-4 leading-7 text-zinc-500">
                Перейдіть до каталогу, щоб знайти прикраси, які ідеально
                доповнять ваш образ.
              </p>

              <Link
                to="/catalog"
                className="mt-10 rounded-full bg-zinc-900 px-8 py-4 text-white transition hover:bg-zinc-800 hover:shadow-lg"
              >
                До каталогу
              </Link>
            </div>
          </Container>
        </Section>
      </>
    );
  }

  return (
    <Section>
      <Container>
        <SectionTitle overline="Кошик" title="Ваші прикраси" />

        <div className="mx-auto mt-10 max-w-5xl space-y-4 sm:mt-12 sm:space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-stone-200 bg-white p-5 sm:flex sm:items-center sm:gap-6 sm:p-6"
            >
              {/* Фото */}
              <div className="flex h-32 w-full shrink-0 items-center justify-center rounded-2xl sm:h-28 sm:w-28">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-full w-full object-contain"
                />
              </div>

              {/* Інформація */}
              <div className="mt-5 min-w-0 flex-1 sm:mt-0">
                <h2 className="text-xl leading-7 font-medium">{item.name}</h2>

                <p className="mt-1.5 text-sm text-stone-500">
                  Артикул: {item.article}
                </p>

                {item.size && (
                  <p className="mt-1 text-sm text-stone-500">
                    Розмір: {item.size}
                  </p>
                )}

                <p className="mt-3 text-xl font-semibold">
                  {item.price.toLocaleString("uk-UA")} грн
                </p>
              </div>

              {/* Кількість + видалення */}
              <div className="mt-6 flex items-center justify-between sm:mt-0 sm:justify-start">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => decreaseQuantity(item.id, item.size)}
                    aria-label="Зменшити кількість"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 transition hover:bg-stone-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="w-6 text-center font-medium">
                    {item.quantity}
                  </span>

                  <button
                    onClick={() => increaseQuantity(item.id, item.size)}
                    aria-label="Збільшити кількість"
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-stone-200 transition hover:bg-stone-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={() => removeFromCart(item.id, item.size)}
                  aria-label={`Видалити ${item.name}`}
                  className="rounded-full p-2 text-stone-400 transition hover:bg-stone-100 hover:text-red-500 sm:ml-6"
                >
                  <Trash2 size={21} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Підсумок */}
        <div className="mx-auto mt-8 max-w-5xl rounded-3xl border border-stone-200 bg-white p-5 sm:mt-10 sm:p-8">
          <div className="flex items-center justify-between gap-4 text-xl sm:text-2xl">
            <span>Разом</span>

            <span className="text-right font-semibold">
              {total.toLocaleString("uk-UA")} грн
            </span>
          </div>

          <Link
            to="/checkout"
            className="mt-6 block w-full rounded-full bg-zinc-900 py-4 text-center text-base font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg sm:mt-8 sm:text-lg"
          >
            Оформити замовлення
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default CartPage;
