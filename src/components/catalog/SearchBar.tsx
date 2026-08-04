import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({ value, onChange }: SearchBarProps) => {
  return (
    <div className="relative mb-8">
      <Search
        size={18}
        className="absolute top-1/2 left-4 -translate-y-1/2 text-zinc-400"
      />

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Пошук прикрас..."
        className="w-full rounded-full border border-zinc-300 py-3 pr-4 pl-12 transition outline-none focus:border-zinc-900"
      />
    </div>
  );
};

export default SearchBar;
