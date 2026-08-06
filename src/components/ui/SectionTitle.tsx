interface SectionTitleProps {
  overline: string;
  title: string;
  subtitle?: string;
}

const SectionTitle = ({ overline, title, subtitle }: SectionTitleProps) => {
  return (
    <div className="text-center">
      <p className="text-sm tracking-[0.3em] text-stone-500 uppercase">
        {overline}
      </p>

      <h2 className="mt-4 text-4xl font-light">{title}</h2>

      {subtitle && (
        <p className="mx-auto mt-6 max-w-2xl leading-8 text-stone-500">
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionTitle;
