import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-5">
      <a
        href="#"
        className="transition hover:text-zinc-500"
        aria-label="Instagram"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href="#"
        className="transition hover:text-zinc-500"
        aria-label="Telegram"
      >
        <FaTelegramPlane size={20} />
      </a>
    </div>
  );
};

export default HeaderActions;
