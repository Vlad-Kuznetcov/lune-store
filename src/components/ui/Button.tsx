import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

interface ButtonProps {
  children: React.ReactNode;
  to?: string;
  className?: string;
}

const Button = ({ children, to, className = "" }: ButtonProps) => {
  const classes = `
    group
    inline-flex
    items-center
    gap-3
    rounded-full
    bg-zinc-900
    px-7
    py-3.5
    text-sm
    font-medium
    text-white
    transition-all
    duration-300
    hover:bg-zinc-800
    ${className}
  `;

  const content = (
    <>
      {children}

      <ArrowRight
        size={18}
        className="
          transition-transform
          duration-300
          group-hover:translate-x-1
        "
      />
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  return <button className={classes}>{content}</button>;
};

export default Button;
