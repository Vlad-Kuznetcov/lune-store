import { Gem, Heart, Truck } from "lucide-react";

import Container from "../ui/Container";
import Section from "../ui/Section";

const values = [
  {
    icon: Gem,
    title: "Якість",
    description:
      "Ми обираємо прикраси, які поєднують витонченість, довговічність і бездоганний зовнішній вигляд.",
  },
  {
    icon: Heart,
    title: "Стиль",
    description:
      "Мінімалістичний дизайн, який легко доповнює будь-який образ та залишається актуальним незалежно від трендів.",
  },
  {
    icon: Truck,
    title: "Сервіс",
    description:
      "Швидке оформлення замовлень, уважне пакування та підтримка на кожному етапі покупки.",
  },
];

const AboutValues = () => {
  return (
    <Section className="pt-0">
      <Container>
        <div className="text-center">
          <h2 className="text-4xl font-light">Наші цінності</h2>

          <p className="mt-4 text-zinc-500">Те, на чому будується LUNÉ</p>
        </div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {values.map((value) => {
            const Icon = value.icon;

            return (
              <article
                key={value.title}
                className="rounded-3xl border border-zinc-200 bg-white p-10 transition duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="inline-flex rounded-2xl border border-zinc-200 p-4">
                  <Icon size={28} />
                </div>

                <h3 className="mt-8 text-2xl font-light">{value.title}</h3>

                <p className="mt-4 leading-8 text-zinc-600">
                  {value.description}
                </p>
              </article>
            );
          })}
        </div>
      </Container>
    </Section>
  );
};

export default AboutValues;
