import { Link } from "react-router-dom";
import Container from "../../components/ui/Container";
import Section from "../../components/ui/Section";

const NotFoundPage = () => {
  return (
    <Section>
      <Container>
        <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
          <p
            className="text-sm tracking-[0.3em] text-zinc-400 uppercase"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            LUNÉ
          </p>

          <h1 className="mt-4 text-7xl font-light tracking-tight sm:text-8xl">
            404
          </h1>

          <h2 className="mt-4 text-2xl font-light sm:text-3xl">
            Сторінку не знайдено
          </h2>

          <p className="mt-4 max-w-md leading-7 text-zinc-500">
            Схоже, ця сторінка більше не існує або ви перейшли за неправильним
            посиланням.
          </p>

          <Link
            to="/"
            className="mt-8 rounded-full bg-zinc-900 px-8 py-4 font-medium text-white transition hover:bg-zinc-800 hover:shadow-lg"
          >
            На головну
          </Link>
        </div>
      </Container>
    </Section>
  );
};

export default NotFoundPage;
