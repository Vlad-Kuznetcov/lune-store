import { CircleHelp, CreditCard, ShieldCheck, Wallet } from "lucide-react";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";

const PaymentPage = () => {
  return (
    <Section>
      <Container>
        <SectionTitle
          overline="LUNÉ"
          title="Оплата"
          subtitle="Ми пропонуємо зручні та безпечні способи оплати, щоб оформлення замовлення було максимально комфортним."
        />

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {/* Передоплата */}

          <div className="rounded-3xl border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <CreditCard className="h-7 w-7 text-zinc-700" />
            </div>

            <h2 className="mt-6 text-2xl font-medium">Повна передоплата</h2>

            <p className="mt-4 leading-8 text-stone-600">
              Ви можете оплатити повну вартість замовлення на банківську картку.
              Після підтвердження платежу ми одразу готуємо ваше замовлення до
              відправлення.
            </p>

            <div className="mt-8 rounded-2xl bg-stone-50 p-5">
              <p className="font-medium text-stone-700">
                ✓ Найшвидший спосіб оформлення замовлення.
              </p>
            </div>
          </div>

          {/* Післяплата */}

          <div className="rounded-3xl border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <Wallet className="h-7 w-7 text-zinc-700" />
            </div>

            <h2 className="mt-6 text-2xl font-medium">Післяплата</h2>

            <p className="mt-4 leading-8 text-stone-600">
              Оплата при отриманні доступна лише після внесення часткової
              передоплати. Решту суми ви сплачуєте у відділенні Нової Пошти
              після огляду посилки.
            </p>

            <div className="mt-8 rounded-2xl bg-stone-50 p-5">
              <p className="font-medium text-stone-700">
                ✓ Зручно, якщо бажаєте оплатити основну суму після отримання.
              </p>
            </div>
          </div>
        </div>

        {/* Безпека */}

        <div className="mt-12 rounded-3xl border border-stone-200 bg-white p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-stone-100">
            <ShieldCheck className="h-8 w-8 text-zinc-700" />
          </div>

          <h2 className="mt-6 text-3xl font-light">
            Безпечне оформлення замовлення
          </h2>

          <p className="mx-auto mt-5 max-w-2xl leading-8 text-stone-600">
            Після оформлення ми зв'язуємося з вами для підтвердження замовлення.
            Після відправлення ви отримуєте номер ТТН для відстеження посилки.
          </p>
        </div>

        {/* Допомога */}

        <div className="mt-12 rounded-3xl bg-stone-100 p-10 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-white shadow-sm">
            <CircleHelp className="h-8 w-8 text-zinc-700" />
          </div>

          <h2 className="mt-6 text-2xl font-medium">Потрібна допомога?</h2>

          <p className="mx-auto mt-4 max-w-xl leading-8 text-stone-600">
            Якщо у вас залишилися питання щодо способів оплати, напишіть нам у
            Telegram або Instagram — ми із задоволенням допоможемо.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default PaymentPage;
