import AboutHero from "../../components/about/AboutHero";
import AboutStory from "../../components/about/AboutStory";
import AboutValues from "../../components/about/AboutValues";
import AboutQuote from "../../components/about/AboutQuote";
import AboutBenefits from "../../components/about/AboutBenefits";
import SEO from "../../components/SEO";

const AboutPage = () => {
  return (
    <>
      <SEO
        title="Про нас — LUNÉ"
        description="Дізнайтеся більше про LUNÉ — магазин срібних прикрас у мінімалістичному та елегантному стилі."
      />
      <AboutHero />
      <AboutStory />
      <AboutValues />
      <AboutBenefits />
      <AboutQuote />
    </>
  );
};

export default AboutPage;
