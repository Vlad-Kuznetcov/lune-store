import { useState } from "react";
import { Menu, X } from "lucide-react";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";
import CartButton from "./CartButton";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* 
        Використовуємо fixed замість sticky.
        Тепер хедер буде 'намертво' прикріплений до верху екрана.
      */}
      <header className="fixed top-0 right-0 left-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-md">
        <Container>
          {/* Mobile */}
          <div className="grid h-16 grid-cols-3 items-center md:hidden">
            <div className="justify-self-start">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-lg p-2 transition hover:bg-zinc-100"
                aria-label="Меню"
              >
                {isOpen ? <X size={25} /> : <Menu size={25} />}
              </button>
            </div>

            <div className="justify-self-center">
              <Logo />
            </div>

            <div className="justify-self-end">
              <CartButton />
            </div>
          </div>

          {/* Desktop */}
          <div className="hidden h-20 items-center justify-between md:flex">
            <Logo />

            <Navigation />

            <div className="flex items-center gap-5">
              <HeaderActions />
              <CartButton />
            </div>
          </div>
        </Container>

        {/* Выпадающее меню для мобильных */}
        <div
          className={`grid transition-[grid-template-rows] duration-300 ease-out md:hidden ${
            isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
          }`}
        >
          <div className="overflow-hidden bg-white">
            <div className="border-t border-zinc-200 bg-white">
              <Container>
                <div
                  className={`transform transition-all duration-300 ${
                    isOpen
                      ? "translate-y-0 opacity-100"
                      : "-translate-y-3 opacity-0"
                  }`}
                >
                  <Navigation mobile onNavigate={() => setIsOpen(false)} />

                  <div className="border-t border-zinc-100 pt-6 pb-6">
                    <HeaderActions />
                  </div>
                </div>
              </Container>
            </div>
          </div>
        </div>
      </header>

      {/* 
        Обов'язковий розпірник (Spacer).
        Оскільки fixed виймає хедер із загального потоку сторінки,
        цей блок створює необхідне місце зверху, щоб перший контент не заходив під хедер.
      */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default Header;
