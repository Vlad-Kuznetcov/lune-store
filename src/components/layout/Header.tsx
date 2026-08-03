import Container from "../ui/Container";
import Logo from "../ui/Logo";
import Navigation from "./Navigation";
import HeaderActions from "./HeaderActions";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur-md">
      <Container>
        <div className="grid h-20 grid-cols-3 items-center">
          <div className="justify-self-start">
            <Logo />
          </div>

          <div className="justify-self-center">
            <Navigation />
          </div>

          <div className="justify-self-end">
            <HeaderActions />
          </div>
        </div>
      </Container>
    </header>
  );
};

export default Header;
