```jsx
import React from "react";

export default function Hero() {
  return (
    <section className="relative overflow-hidden hero-gradient">
      <div className="container mx-auto px-4 py-16 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div>
            <div className="inline-block accent-pill mb-4">Қарақалпақ Дауысы</div>
            <h2 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
              Karakalpakvoice — <span className="text-qara-500">ақиқат</span> пен тарихтың айнасы
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-prose mb-6">
              Біз — Қарақалпақ халқының тарихын, мәдениетін және құқықтарын әлемге жеткізетін тәуелсіз платформа.
            </p>

            <div className="flex gap-3">
              <a
                href="/news"
                className="btn px-5 py-3 rounded-md bg-qara-500 text-white shadow-md hover:translate-y-[-3px]"
              >
                Жаңалықтар
              </a>
              <a
                href="/about"
                className="btn px-5 py-3 rounded-md border border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-200"
              >
                Біздің туралы
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="card-glass p-4">
              <img
                src="/images/hero-photo.jpg"
                alt="Karakalpak land"
                className="rounded-md object-cover w-full h-64 md:h-80"
                onError={(e) => {
                  e.target.style.display = "none";
                }}
              />
            </div>

            <div className="mt-3 flex gap-3">
              <div className="card-glass p-3 flex-1">
                <h4 className="text-sm font-semibold">Суверенитет</h4>
                <p className="text-xs text-gray-500">
                  Тарихи құжаттар, зерттеулер және сараптамалар.
                </p>
              </div>
              <div className="card-glass p-3 flex-1">
                <h4 className="text-sm font-semibold">Мәдениет</h4>
                <p className="text-xs text-gray-500">
                  Фольклор, өнер және дәстүрлер.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
```
