interface SectionTitleProps {
  overline: string;
  title: string;
}

const SectionTitle = ({ overline, title }: SectionTitleProps) => {
  return (
    <div className="text-center">
      <p className="text-sm uppercase tracking-[0.35em] text-zinc-500">
        {overline}
      </p>

      <h2 className="mt-4 text-4xl font-light text-zinc-900">{title}</h2>
    </div>
  );
};

export default SectionTitle;
