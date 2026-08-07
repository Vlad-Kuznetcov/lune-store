import { useState } from "react";
import { Menu, X } from "lucide-react";

import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Logo />

          <div className="hidden md:block">
            <Navigation />
          </div>

          <div className="hidden md:block">
            <HeaderActions />
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-lg p-2 transition hover:bg-zinc-100 md:hidden"
            aria-label="Меню"
          >
            {isOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </Container>

      {isOpen && (
        <div className="border-t border-zinc-200 bg-white md:hidden">
          <Container>
            <Navigation mobile onNavigate={() => setIsOpen(false)} />

            <div className="mt-2 border-t border-zinc-100 pt-6 pb-6">
              <HeaderActions mobile onNavigate={() => setIsOpen(false)} />
            </div>
          </Container>
        </div>
      )}
    </header>
  );
};

export default Header;
