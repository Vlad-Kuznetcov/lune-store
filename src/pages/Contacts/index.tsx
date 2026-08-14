import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

import { Mail, Clock3 } from "lucide-react";

import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

import SEO from "../../components/SEO";

const ContactsPage = () => {
  return (
    <>
      <SEO
        title="Контакти — LUNÉ"
        description="Зв'яжіться з LUNÉ через Instagram, Telegram або Email."
      />

      <Section>
        <Container>
          <div className="text-center">
            <p className="text-sm tracking-[0.3em] text-zinc-400 uppercase">
              LUNÉ
            </p>

            <h1 className="mt-3 text-4xl font-light tracking-tight sm:text-5xl">
              Контакти
            </h1>

            <p className="mx-auto mt-5 max-w-xl leading-7 text-zinc-500">
              Маєте питання щодо прикрас, розміру або оформлення замовлення? Ми
              завжди раді допомогти.
            </p>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            <ContactCard
              icon={<FaInstagram size={24} />}
              title="Instagram"
              value="@lune_silver_ua"
              href="https://instagram.com/lune_silver_ua"
            />

            <ContactCard
              icon={<FaTelegramPlane size={24} />}
              title="Telegram"
              value="@lune_manager_ua"
              href="https://t.me/lune_manager_ua"
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

          <div className="mt-16 rounded-3xl border border-stone-200 bg-white px-6 py-12 text-center sm:px-10 sm:py-14">
            <h2 className="text-3xl font-light">Маєте питання?</h2>

            <p className="mx-auto mt-5 max-w-xl leading-8 text-stone-500">
              Напишіть нам у Telegram або Instagram. Ми допоможемо підібрати
              прикрасу, уточнимо розмір та відповімо на всі питання.
            </p>

            <a
              href="https://t.me/lune_manager_ua"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-flex items-center rounded-full bg-zinc-900 px-10 py-4 text-lg font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg"
            >
              Написати нам
            </a>
          </div>
        </Container>
      </Section>
    </>
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
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
      className="group rounded-3xl border border-stone-200 bg-white p-8 transition duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg"
    >
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-stone-100 text-zinc-700 transition group-hover:bg-zinc-900 group-hover:text-white">
        {icon}
      </div>

      <h3 className="mt-6 text-2xl font-medium">{title}</h3>

      <p className="mt-3 text-stone-600 transition group-hover:text-zinc-900">
        {value}
      </p>
    </a>
  );
}

export default ContactsPage;
