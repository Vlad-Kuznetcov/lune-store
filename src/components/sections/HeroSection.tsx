import Button from "../ui/Button";
import Container from "../ui/Container";

const HeroSection = () => {
  return (
    <section className="py-28">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="
        text-5xl
        tracking-[0.25em]
    "
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            LUNÉ
          </span>

          <h1 className="mt-6 text-5xl font-light leading-tight text-zinc-900">
            Срібні прикраси,
            <br />
            які хочеться носити щодня.
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-zinc-500">
            Мінімалізм, елегантність і якість. Обирайте прикраси, які доповнять
            ваш стиль.
          </p>

          <Button to="/catalog" className="mt-10">
            Переглянути каталог
          </Button>
        </div>
      </Container>
    </section>
  );
};

export default HeroSection;
