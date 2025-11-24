export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] flex items-center justify-center text-center hero-gradient overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-photo.jpg"
          alt="Karakalpak heritage"
          className="object-cover w-full h-full opacity-60"
        />
      </div>

      <div className="relative z-10 max-w-3xl px-4 flex flex-col gap-4 items-center">
        <span className="accent-pill">KarakalpakVoice</span>
        <h1 className="text-4xl md:text-6xl font-bold">
          Қарақалпақ Империя
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300">
          Ғәрезсиз мәлимлеме платформасы — сөз еркинлиги, ҳақиқат һәм технология бир орында.
        </p>
        <button className="btn px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Бастаў
        </button>
      </div>
    </section>
  );
}
