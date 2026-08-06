import { NavLink } from "react-router-dom";

const links = [
  {
    title: "Каталог",
    href: "/catalog",
  },
  {
    title: "Про нас",
    href: "/about",
  },
  {
    title: "Контакти",
    href: "/contacts",
  },
];

const Navigation = () => {
  return (
    <nav>
      <ul className="flex items-center gap-10">
        {links.map((link) => (
          <li key={link.href}>
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                `relative text-sm font-medium tracking-wide transition-colors duration-300 after:absolute after:-bottom-1 after:left-1/2 after:h-[1px] after:w-3/4 after:origin-center after:-translate-x-1/2 after:scale-x-0 after:bg-black after:transition-transform after:duration-300 hover:after:scale-x-100 ${
                  isActive
                    ? "text-black after:scale-x-100"
                    : "text-zinc-600 hover:text-black"
                } `
              }
            >
              {link.title}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
