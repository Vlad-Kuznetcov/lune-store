import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

import { Mail, Clock3 } from "lucide-react";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";
import SectionTitle from "../../components/ui/SectionTitle";

const ContactsPage = () => {
  return (
    <Section>
      <Container>
        <SectionTitle
          overline="LUNÉ"
          title="Контакти"
          subtitle="Ми завжди раді допомогти з вибором прикрас та відповісти на ваші запитання."
        />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          <ContactCard
            icon={<FaInstagram size={24} />}
            title="Instagram"
            value="@lune.silver"
            href="#"
          />

          <ContactCard
            icon={<FaTelegramPlane size={24} />}
            title="Telegram"
            value="@lune_silver"
            href="#"
          />

          <ContactCard
            icon={<Mail size={24} />}
            title="Email"
            value="info@lune.ua"
            href="mailto:info@lune.ua"
          />

          <div className="rounded-3xl border border-stone-200 bg-white p-8">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100">
              <Clock3 className="text-zinc-700" />
            </div>

            <h2 className="mt-6 text-2xl font-medium">Графік роботи</h2>

            <p className="mt-4 leading-8 text-stone-600">
              Щодня
              <br />
              09:00 — 21:00
            </p>
          </div>
        </div>

        <div className="mt-16 rounded-3xl border border-stone-200 bg-white px-10 py-14 text-center">
          <h2 className="text-3xl font-light">Маєте питання?</h2>

          <p className="mx-auto mt-5 max-w-xl leading-8 text-stone-500">
            Напишіть нам у Telegram або Instagram. Ми допоможемо підібрати
            прикрасу, уточнимо розмір та відповімо на всі питання.
          </p>

          <a
            href="#"
            className="mt-10 inline-flex items-center rounded-full bg-zinc-900 px-10 py-4 text-lg font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg"
          >
            Написати нам
          </a>
        </div>
      </Container>
    </Section>
  );
};

interface ContactCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  href: string;
}

function ContactCard({ icon, title, value, href }: ContactCardProps) {
  return (
    <a
      href={href}
      className="group rounded-3xl border border-stone-200 bg-white p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 transition group-hover:bg-stone-200">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-medium">{title}</h3>

      <p className="mt-3 text-stone-600">{value}</p>
    </a>
  );
}

export default ContactsPage;
