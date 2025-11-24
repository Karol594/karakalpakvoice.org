export default function Hero() {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/images/hero-photo.webp')" }}
    >
      <div className="text-center bg-black/40 p-6 rounded-xl backdrop-blur-sm">
        <h1 className="text-5xl font-bold mb-4">
          Қарақалпақ Империя
        </h1>

        <p className="text-xl opacity-90">
          Ғәрезсиз мәлимлеме — сөз еркинлиги, ҳақиқат, мәденият.
        </p>

        <button className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg">
          Бастаў
        </button>
      </div>
    </section>
  );
}
