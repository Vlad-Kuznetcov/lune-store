import Container from "../ui/Container";
import Section from "../ui/Section";

const AboutHero = () => {
  return (
    <Section>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span
            className="text-5xl tracking-[0.25em]"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            LUNÉ
          </span>

          <h1 className="mt-8 text-5xl font-light">Про нас</h1>

          <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-zinc-600">
            Ми віримо, що прикраси — це більше, ніж аксесуари. Вони підкреслюють
            індивідуальність, стиль і настрій, залишаючись частиною особливих
            моментів життя.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default AboutHero;
