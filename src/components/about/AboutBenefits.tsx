import { Check } from "lucide-react";

import Container from "../ui/Container";
import Section from "../ui/Section";

const benefits = [
  "Срібло 925 проби",
  "Ретельно відібраний асортимент",
  "Швидка доставка по Україні",
  "Надійне пакування",
  "Постійне оновлення колекції",
  "Турбота про кожного клієнта",
];

const AboutBenefits = () => {
  return (
    <Section className="pt-0">
      <Container>
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-4xl font-light">
            Чому обирають LUNÉ
          </h2>

          <div className="mt-14 space-y-6">
            {benefits.map((benefit) => (
              <div
                key={benefit}
                className="flex items-center gap-5 rounded-2xl border border-zinc-200 px-6 py-5 transition duration-300 hover:border-zinc-300 hover:shadow-sm"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-zinc-200">
                  <Check size={18} />
                </div>

                <span className="text-lg text-zinc-700">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default AboutBenefits;
