import Button from "../ui/Button";
import Container from "../ui/Container";

const HeroSection = () => {
  return (
    <section className="py-16 sm:py-20 lg:py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="text-4xl tracking-[0.2em] sm:text-5xl"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            LUNÉ
          </span>

          <h1 className="mt-6 text-3xl leading-tight font-light text-zinc-900 sm:text-4xl lg:text-5xl">
            Срібні прикраси,
            <br className="hidden sm:block" />
            <span className="sm:hidden"> </span>
            які хочеться носити щодня.
          </h1>

          <p className="mx-auto mt-6 max-w-xl px-2 text-base leading-7 text-zinc-500 sm:px-0 sm:text-lg sm:leading-8">
            Мінімалізм, елегантність і якість. Обирайте прикраси, які доповнять
            ваш стиль.
          </p>

          <Button to="/catalog" className="mt-8 sm:mt-10">
            Переглянути каталог
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
