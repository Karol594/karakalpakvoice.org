export default function Hero() {
  return (
    <section
      className="h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=1920&auto=format&fit=crop')" }}
    >
      <div className="text-center bg-black/40 p-6 rounded-xl backdrop-blur-sm text-white">
        <h1 className="text-5xl font-bold mb-4">
          Қарақалпақ Даўысы
        </h1>
        <p className="text-xl opacity-90">
          Қарақалпақстан халқының даўысын дүнья жүзине жеткизиўге арналған медиа платформа
        </p>
        <button className="mt-6 px-6 py-3 text-lg bg-blue-600 hover:bg-blue-700 rounded-lg">
          Жаңалықтар
        </button>
      </div>
    </section>
  );
}
