import { Mail, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { SiInstagram, SiTelegram } from "react-icons/si";

import Container from "../ui/Container";

const Footer = () => {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <Container>
        {/* Logo */}
        <div className="py-14 text-center sm:py-16 md:py-20">
          <h2
            className="text-5xl tracking-[0.25em] sm:text-6xl md:text-7xl"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            LUNÉ
          </h2>

          <p className="mx-auto mt-5 max-w-md px-4 text-sm leading-6 text-zinc-500 sm:text-base sm:leading-7">
            Срібні прикраси, що підкреслюють індивідуальність та стиль.
          </p>
        </div>

        {/* Columns */}
        <div className="grid gap-10 border-y border-zinc-200 py-12 sm:gap-12 sm:py-14 md:grid-cols-3 md:py-16">
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
        <div className="flex flex-col items-center gap-3 py-6 text-center text-xs text-zinc-500 sm:py-8 sm:text-sm md:flex-row md:justify-between">
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
    <div className="flex flex-col items-center">
      <h3 className="text-sm font-medium tracking-wide text-zinc-900">
        {title}
      </h3>

      <div className="mt-5 flex flex-col items-center gap-4">{children}</div>
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
      className="group flex items-center gap-1.5 py-1 text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-900 sm:text-base"
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
      className="flex items-center gap-3 py-1 text-sm text-zinc-500 transition-colors duration-300 hover:text-zinc-900 sm:text-base"
    >
      {icon}

      <span>{children}</span>
    </a>
  );
}

export default Footer;
