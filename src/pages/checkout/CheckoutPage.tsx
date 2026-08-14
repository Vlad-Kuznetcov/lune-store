import { useState } from "react";
import { Link } from "react-router-dom";

import { useCart } from "../../components/context/CartContext";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";
import SEO from "../../components/SEO";

const CheckoutPage = () => {
  const { cart } = useCart();

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [city, setCity] = useState("");
  const [novaPoshta, setNovaPoshta] = useState("");
  const [payment, setPayment] = useState("Повна оплата на картку");
  const [comment, setComment] = useState("");

  const [orderSent, setOrderSent] = useState(false);
  const [orderMethod, setOrderMethod] = useState<
    "telegram" | "instagram" | null
  >(null);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const createOrderMessage = () => {
    const items = cart
      .map((item) => {
        const size = item.size ? ` • розмір ${item.size}` : "";

        return `• ${item.name}${size}
Артикул: ${item.article}
${item.price.toLocaleString("uk-UA")} грн × ${item.quantity}`;
      })
      .join("\n\n");

    return `🛍 НОВЕ ЗАМОВЛЕННЯ LUNÉ

👤 Ім'я: ${name}
📞 Телефон: ${phone}
📍 Місто: ${city}
📦 Нова Пошта: ${novaPoshta}
💳 Оплата: ${payment}

Товари:

${items}

💰 Разом: ${total.toLocaleString("uk-UA")} грн${
      comment
        ? `

💬 Коментар:
${comment}`
        : ""
    }`;
  };

  const isFormValid = () => {
    return Boolean(
      name.trim() && phone.trim() && city.trim() && novaPoshta.trim(),
    );
  };

  const handleTelegramOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isFormValid()) {
      return;
    }

    const message = createOrderMessage();

    const telegramUsername = "lune_manager_ua";

    const url = `https://t.me/${telegramUsername}?text=${encodeURIComponent(
      message,
    )}`;

    window.open(url, "_blank");

    setOrderMethod("telegram");
    setOrderSent(true);
  };

  const handleInstagramOrder = async () => {
    if (!isFormValid()) {
      return;
    }

    const message = createOrderMessage();

    const instagramUrl = "https://instagram.com/lune_silver_ua";

    try {
      await navigator.clipboard.writeText(message);
    } catch {
      // Якщо браузер не дозволив копіювання,
      // все одно відкриваємо Instagram.
    }

    window.open(instagramUrl, "_blank");

    setOrderMethod("instagram");
    setOrderSent(true);
  };

  /*
   * Якщо кошик порожній
   */
  if (cart.length === 0) {
    return (
      <Section>
        <Container>
          <SEO
            title="Оформлення замовлення — LUNÉ"
            description="Оформіть замовлення на срібні прикраси LUNÉ."
          />
          <div className="mx-auto flex max-w-xl flex-col items-center py-20 text-center sm:py-28">
            <p className="text-5xl tracking-[0.2em]">LUNÉ</p>

            <h2 className="mt-8 text-3xl font-light">Ваш кошик порожній</h2>

            <p className="mx-auto mt-4 max-w-md leading-7 text-zinc-500">
              Додайте прикраси до кошика, щоб оформити замовлення.
            </p>

            <Link
              to="/catalog"
              className="mt-8 inline-block rounded-full bg-zinc-900 px-8 py-4 font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg"
            >
              До каталогу
            </Link>
          </div>
        </Container>
      </Section>
    );
  }

  /*
   * Підтвердження після оформлення
   */
  if (orderSent) {
    return (
      <Section>
        <Container>
          <div className="mx-auto flex max-w-xl flex-col items-center py-20 text-center sm:py-28">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-2xl text-emerald-700">
              ✓
            </div>

            <p className="mt-8 text-sm tracking-[0.25em] text-zinc-400 uppercase">
              LUNÉ
            </p>

            <h1 className="mt-4 text-3xl font-light sm:text-4xl">
              Дякуємо за замовлення 🤍
            </h1>

            <p className="mt-5 leading-7 text-zinc-500">
              {orderMethod === "instagram"
                ? "Замовлення скопійовано. Вставте його у Direct Instagram, щоб завершити оформлення."
                : "Замовлення сформовано. Перевірте Telegram та надішліть повідомлення менеджеру."}
            </p>

            {orderMethod === "instagram" && (
              <div className="mt-6 rounded-2xl bg-stone-50 px-5 py-4 text-sm leading-6 text-zinc-500">
                Повідомлення вже скопійовано у буфер обміну.
                <br />
                Просто вставте його у Direct.
              </div>
            )}

            <div className="mt-10 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
              <Link
                to="/catalog"
                className="rounded-full bg-zinc-900 px-8 py-4 font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg"
              >
                До каталогу
              </Link>

              <Link
                to="/"
                className="rounded-full border border-zinc-200 px-8 py-4 font-medium text-zinc-900 transition hover:bg-zinc-50"
              >
                На головну
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section>
      <Container>
        <SectionTitle overline="ОФОРМЛЕННЯ" title="Ваше замовлення" />

        <div className="mx-auto mt-12 grid max-w-5xl gap-8 lg:grid-cols-[1fr_380px]">
          {/* Форма */}
          <div className="rounded-3xl border border-stone-200 bg-white p-5 sm:p-8">
            <h2 className="text-2xl font-light">Ваші дані</h2>

            <form onSubmit={handleTelegramOrder} className="mt-8 space-y-5">
              {/* Ім'я */}
              <div>
                <label className="text-sm font-medium">Ім'я та прізвище</label>

                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Ваше ім'я"
                  required
                  className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3.5 transition outline-none focus:border-zinc-900"
                />
              </div>

              {/* Телефон */}
              <div>
                <label className="text-sm font-medium">Номер телефону</label>

                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+380 XX XXX XX XX"
                  required
                  className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3.5 transition outline-none focus:border-zinc-900"
                />
              </div>

              {/* Місто */}
              <div>
                <label className="text-sm font-medium">Місто</label>

                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="Ваше місто"
                  required
                  className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3.5 transition outline-none focus:border-zinc-900"
                />
              </div>

              {/* Нова Пошта */}
              <div>
                <label className="text-sm font-medium">
                  Відділення Нової Пошти
                </label>

                <input
                  type="text"
                  value={novaPoshta}
                  onChange={(e) => setNovaPoshta(e.target.value)}
                  placeholder="Наприклад: №12"
                  required
                  className="mt-2 w-full rounded-2xl border border-stone-200 px-4 py-3.5 transition outline-none focus:border-zinc-900"
                />
              </div>

              {/* Оплата */}
              <div>
                <label className="text-sm font-medium">Спосіб оплати</label>

                <select
                  value={payment}
                  onChange={(e) => setPayment(e.target.value)}
                  className="mt-2 w-full rounded-2xl border border-stone-200 bg-white px-4 py-3.5 transition outline-none focus:border-zinc-900"
                >
                  <option>Повна оплата на картку</option>
                  <option>Накладений платіж</option>
                </select>
              </div>

              {/* Коментар */}
              <div>
                <label className="text-sm font-medium">Коментар</label>

                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Додаткові побажання..."
                  className="mt-2 w-full resize-none rounded-2xl border border-stone-200 px-4 py-3.5 transition outline-none focus:border-zinc-900"
                />
              </div>

              {/* Кнопки */}
              <div className="mt-8">
                <p className="mb-4 text-center text-sm text-zinc-500">
                  Оберіть зручний спосіб оформлення
                </p>

                <button
                  type="submit"
                  className="w-full rounded-full bg-zinc-900 py-4 text-base font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg sm:text-lg"
                >
                  Оформити через Telegram
                </button>

                <button
                  type="button"
                  onClick={handleInstagramOrder}
                  className="mt-3 w-full rounded-full border border-zinc-200 bg-white py-4 text-base font-medium text-zinc-900 transition hover:border-zinc-400 hover:bg-zinc-50 sm:text-lg"
                >
                  Оформити через Instagram
                </button>

                <p className="mt-4 text-center text-xs leading-5 text-zinc-400">
                  Для Instagram замовлення буде скопійовано автоматично.
                  <br />
                  Просто вставте його у Direct.
                </p>
              </div>
            </form>
          </div>

          {/* Замовлення */}
          <div className="h-fit rounded-3xl border border-stone-200 bg-white p-5 sm:p-8 lg:sticky lg:top-28">
            <h2 className="text-2xl font-light">Ваше замовлення</h2>

            <div className="mt-6 space-y-5">
              {cart.map((item) => (
                <div
                  key={`${item.id}-${item.size ?? "no-size"}`}
                  className="flex gap-4"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-20 w-20 shrink-0 rounded-2xl object-contain"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="font-medium">{item.name}</p>

                    <p className="mt-1 text-sm text-zinc-500">
                      Артикул: {item.article}
                    </p>

                    {item.size && (
                      <p className="mt-1 text-sm text-zinc-500">
                        Розмір: {item.size}
                      </p>
                    )}

                    <p className="mt-2 text-sm">
                      {item.price.toLocaleString("uk-UA")} ₴ × {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t border-stone-200 pt-6">
              <div className="flex items-center justify-between text-xl">
                <span>Разом</span>

                <span className="font-semibold">
                  {total.toLocaleString("uk-UA")} ₴
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default CheckoutPage;
