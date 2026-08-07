const AnnouncementBar = () => {
  return (
    <div className="border-y border-zinc-200 bg-white">
      <div className="mx-auto flex min-h-11 items-center justify-center px-4">
        <p className="text-center text-xs font-medium tracking-wide text-zinc-600 sm:text-sm">
          ✨ Знижка <span className="font-semibold text-black">-15%</span> на
          честь відкриття • Безкоштовна доставка від{" "}
          <span className="font-semibold text-black">2000 ₴</span>
        </p>
      </div>
    </div>
  );
};

export default AnnouncementBar;
