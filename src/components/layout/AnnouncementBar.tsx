const AnnouncementBar = () => {
  const text =
    "✨ Святкуємо відкриття LUNÉ • -15% на весь асортимент • Срібло 925 проби • Швидка доставка по Україні •";

  return (
    <div className="overflow-hidden border-y border-white/10 bg-zinc-900 py-2.5">
      <div className="flex whitespace-nowrap">
        <div className="animate-marquee flex">
          <span className="mx-8 text-sm font-normal tracking-wide text-white/90">
            {text.repeat(3)}
          </span>
        </div>

        <div className="animate-marquee flex" aria-hidden="true">
          <span className="mx-8 text-sm font-normal tracking-wide text-white/90">
            {text.repeat(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementBar;
