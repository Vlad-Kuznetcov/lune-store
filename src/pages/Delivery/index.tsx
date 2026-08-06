import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";

const DeliveryPage = () => {
  return (
    <Section>
      <Container>
        <SectionTitle
          overline="LUNÉ"
          title="Доставка"
          subtitle="Ми дбаємо про те, щоб ваші прикраси прибули швидко, безпечно та у бездоганному стані."
        />

        <div className="mt-16 grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border border-stone-200 bg-white p-8">
            <h2 className="text-2xl font-medium">🚚 Нова Пошта</h2>

            <p className="mt-4 leading-8 text-stone-600">
              Відправляємо замовлення по всій Україні через Нову Пошту.
            </p>

            <ul className="mt-6 space-y-3 text-stone-700">
              <li>• Відправка щодня</li>
              <li>• Доставка 1–3 робочі дні</li>
              <li>• Відстеження за ТТН</li>
            </ul>
          </div>

          <div className="rounded-3xl border border-stone-200 bg-white p-8">
            <h2 className="text-2xl font-medium">📦 Вартість</h2>

            <p className="mt-4 leading-8 text-stone-600">
              Вартість доставки визначається тарифами Нової Пошти.
            </p>

            <div className="mt-6 rounded-2xl bg-stone-50 p-6">
              <p className="font-medium">
                Безкоштовна доставка при замовленні від 2000 грн.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default DeliveryPage;
