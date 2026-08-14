import { FaInstagram } from "react-icons/fa6";
import { FaTelegramPlane } from "react-icons/fa";

const HeaderActions = () => {
  return (
    <div className="flex items-center gap-4">
      <a
        href="https://instagram.com/lune_silver_ua"
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:text-zinc-500"
        aria-label="Instagram"
      >
        <FaInstagram size={20} />
      </a>

      <a
        href="https://t.me/lune_manager_ua"
        target="_blank"
        rel="noopener noreferrer"
        className="transition hover:text-zinc-500"
        aria-label="Telegram"
      >
        <FaTelegramPlane size={20} />
      </a>
    </div>
  );
};

export default HeaderActions;
