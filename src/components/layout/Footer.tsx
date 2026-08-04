import { Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SiInstagram, SiTelegram } from "react-icons/si";

import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-zinc-200">
      <Container>
        {/* Logo */}

        <div className="py-20 text-center">
          <h2
            className="text-7xl tracking-[0.25em]"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            LUNÉ
          </h2>

          <p className="mx-auto mt-6 max-w-md leading-7 text-zinc-500">
            Срібні прикраси, що підкреслюють індивідуальність та стиль.
          </p>
        </div>

        {/* Columns */}

        <div className="grid gap-12 border-y border-zinc-200 py-16 md:grid-cols-3">
          <FooterColumn title="Навігація">
            <FooterLink to="/">Головна</FooterLink>
            <FooterLink to="/catalog">Каталог</FooterLink>
            <FooterLink to="/about">Про нас</FooterLink>
          </FooterColumn>

          <FooterColumn title="Покупцям">
            <FooterLink to="/delivery">Доставка</FooterLink>
            <FooterLink to="/payment">Оплата</FooterLink>
            <FooterLink to="/contacts">Контакти</FooterLink>
          </FooterColumn>

          <FooterColumn title="Зв'язок">
            <SocialLink href="#" icon={<SiInstagram size={18} />}>
              Instagram
            </SocialLink>

            <SocialLink href="#" icon={<SiTelegram size={18} />}>
              Telegram
            </SocialLink>

            <SocialLink
              href="mailto:example@gmail.com"
              icon={<Mail size={18} />}
            >
              Email
            </SocialLink>
          </FooterColumn>
        </div>

        {/* Bottom */}

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-sm text-zinc-500 md:flex-row">
          <p>© {new Date().getFullYear()} LUNÉ. Всі права захищені.</p>

          <p>Designed with ♡</p>
        </div>
      </Container>
    </footer>
  );
};

interface FooterColumnProps {
  title: string;
  children: React.ReactNode;
}

function FooterColumn({ title, children }: FooterColumnProps) {
  return (
    <div className="text-center">
      <h3 className="mb-8 text-lg font-medium">{title}</h3>

      <div className="flex flex-col items-center gap-5">{children}</div>
    </div>
  );
}

interface FooterLinkProps {
  to: string;
  children: React.ReactNode;
}

function FooterLink({ to, children }: FooterLinkProps) {
  return (
    <Link
      to={to}
      className="group inline-flex items-center gap-2 text-zinc-600 transition-colors duration-300 hover:text-black"
    >
      <span>{children}</span>

      <ArrowUpRight
        size={15}
        className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
      />
    </Link>
  );
}

interface SocialLinkProps {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

function SocialLink({ href, icon, children }: SocialLinkProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-3 text-zinc-600 transition-colors duration-300 hover:text-black"
    >
      {icon}

      <span>{children}</span>
    </a>
  );
}

export default Footer;
