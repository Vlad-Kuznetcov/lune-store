const Loader = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center bg-white">
      <div className="flex flex-col items-center">
        <div className="relative flex h-20 w-20 items-center justify-center">
          <div className="absolute inset-0 rounded-full border border-stone-200" />

          <div className="absolute inset-0 animate-spin rounded-full border border-transparent border-t-zinc-900" />

          <span
            className="text-xl tracking-[0.2em] text-zinc-900"
            style={{ fontFamily: "Cormorant Garamond" }}
          >
            LUNÉ
          </span>
        </div>

        <p className="mt-5 text-[10px] tracking-[0.3em] text-zinc-400 uppercase">
          Завантаження
        </p>
      </div>
    </div>
  );
};

export default Loader;
