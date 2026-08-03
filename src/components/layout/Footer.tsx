import Container from "../ui/Container";
import Logo from "../ui/Logo";

import { FaInstagram, FaTelegramPlane } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="mt-32 border-t border-zinc-200">
      <Container>
        <div className="flex flex-col items-center py-16">
          <Logo />

          <p className="mt-5 text-center text-zinc-500">
            Мінімалістичні срібні прикраси.
          </p>

          <div className="mt-8 flex gap-6">
            <a href="#" className="transition hover:opacity-60">
              <FaInstagram size={22} />
            </a>

            <a href="#" className="transition hover:opacity-60">
              <FaTelegramPlane size={22} />
            </a>
          </div>

          <div className="mt-10 h-px w-full bg-zinc-200" />

          <p className="mt-8 text-sm text-zinc-400">
            © {new Date().getFullYear()} LUNÉ
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
