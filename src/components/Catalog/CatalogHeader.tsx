import Section from "../ui/Section";
import Container from "../ui/Container";

const CatalogHeader = () => {
  return (
    <Section>
      <Container>
        <div className="text-center">
          <h1 className="mt-4 text-5xl font-light">Каталог</h1>

          <p className="mx-auto mt-6 max-w-xl text-zinc-500">
            Оберіть прикрасу, яка стане частиною вашого стилю.
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default CatalogHeader;
