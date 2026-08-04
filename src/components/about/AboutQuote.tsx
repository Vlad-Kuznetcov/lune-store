import Container from "../ui/Container";
import Section from "../ui/Section";

const AboutQuote = () => {
  return (
    <Section>
      <Container>
        <div className="rounded-[40px] border border-zinc-200 px-10 py-24 text-center">
          <p
            className="text-5xl leading-tight text-zinc-900 md:text-7xl"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            «Краса починається
            <br />з деталей.»
          </p>

          <div className="mx-auto mt-10 h-px w-24 bg-zinc-300" />

          <p
            className="mt-10 text-3xl tracking-[0.25em]"
            style={{
              fontFamily: "Cormorant Garamond",
            }}
          >
            LUNÉ
          </p>
        </div>
      </Container>
    </Section>
  );
};

export default AboutQuote;
