import type { ReactNode } from "react";

interface SectionProps {
  children: ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => {
  return <section className={` pt-6 pb-12 ${className}`}>{children}</section>;
};

export default Section;
