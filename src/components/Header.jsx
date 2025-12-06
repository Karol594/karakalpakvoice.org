import { useTranslation } from "react-i18next";
import { useState } from "react";

export default function Header() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);

  const languages = [
    { code: "kk", label: "Qaraqalpaq" },
    { code: "ru", label: "Русский" },
    { code: "en", label: "English" },
    { code: "pl", label: "Polski" }
  ];

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <header className="w-full bg-white shadow-md">
      <div className="flex justify-between items-center px-6 py-4 max-w-7xl mx-auto">

        <div className="text-2xl font-bold">
          KarakalpakVoice
        </div>

        {/* Language Dropdown */}
        <div className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="px-4 py-2 bg-gray-200 rounded-md text-sm"
          >
            {i18n.language.toUpperCase()}
          </button>

          {open && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md border w-40">
              {languages.map((lng) => (
                <button
                  key={lng.code}
                  onClick={() => changeLanguage(lng.code)}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {lng.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
