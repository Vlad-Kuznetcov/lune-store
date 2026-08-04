import Container from "../ui/Container";
import Section from "../ui/Section";

const AboutStory = () => {
  return (
    <Section className="pt-0">
      <Container>
        <div className="mx-auto max-w-4xl rounded-3xl border border-zinc-200 p-12">
          <h2 className="text-3xl font-light">Наша історія</h2>

          <p className="mt-8 leading-8 text-zinc-600">
            LUNÉ — сучасний онлайн-магазин срібних прикрас, створений для тих,
            хто цінує мінімалізм, елегантність та якість.
            <br />
            <br />
            Ми ретельно відбираємо прикраси, які легко поєднуються як із
            повсякденними образами, так і з особливими подіями.
            <br />
            <br />
            Для нас важливо, щоб кожен виріб приносив радість та залишався
            улюбленою деталлю вашого стилю.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default AboutStory;
