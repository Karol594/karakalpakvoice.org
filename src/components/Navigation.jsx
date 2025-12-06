import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function Navigation() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [lang, setLang] = useState("RU");
  const [dark, setDark] = useState(false);

  // Dark mode body class
  useEffect(() => {
    if (dark) {
      document.body.classList.add("dark");
      document.body.style.background = "#000";
      document.body.style.color = "#fff";
    } else {
      document.body.classList.remove("dark");
      document.body.style.background = "#fff";
      document.body.style.color = "#000";
    }
  }, [dark]);

  // Language switching (RU → KK → EN → PL)
  const toggleLang = () => {
    if (lang === "RU") setLang("KK");
    else if (lang === "KK") setLang("EN");
    else if (lang === "EN") setLang("PL");
    else setLang("RU");
  };

  return (
    <nav
      style={{
        width: "100%",
        background: dark ? "#111" : "#f8f8f8",
        color: dark ? "#fff" : "#000",
        borderBottom: dark ? "1px solid #333" : "1px solid #ddd",
        padding: "5px 0 10px 0",
        position: "sticky",
        top: 0,
        zIndex: 50,
      }}
    >
      {/* Top info panel */}
      <div
        style={{
          display: "flex",
          gap: "15px",
          fontSize: "14px",
          justifyContent: "flex-end",
          padding: "0 16px",
        }}
      >
        <button onClick={toggleLang} style={{ background: "none", border: "none", color: "inherit" }}>
          🌐 Тил: {lang}
        </button>

        <button
          onClick={() => alert("Курс сервиси жуwма даяры болады.")}
          style={{ background: "none", border: "none", color: "inherit" }}
        >
          💲 USD: 11350
        </button>

        <button
          onClick={() => alert("Ҳаўа-райы сервиси жуwма даяры болады.")}
          style={{ background: "none", border: "none", color: "inherit" }}
        >
          ☀ Нукус: +4°C
        </button>

        <button
          onClick={() => setDark(!dark)}
          style={{ background: "none", border: "none", color: "inherit" }}
        >
          {dark ? "🌙 Dark" : "☀ Light"}
        </button>
      </div>

      {/* Main navigation */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: "5px 16px",
          marginTop: "5px",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link to="/">
          <img src="/logo.png" alt="logo" style={{ height: "36px" }} />
        </Link>

        {/* Hamburger button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={{
            display: "block",
            background: "none",
            border: "none",
            fontSize: "26px",
          }}
        >
          ☰
        </button>
      </div>

      {/* Dropdown menu */}
      {menuOpen && (
        <div
          style={{
            background: dark ? "#111" : "#fff",
            borderTop: dark ? "1px solid #333" : "1px solid #ddd",
            padding: "10px 0",
          }}
        >
          <div style={{ display: "flex", flexDirection: "column", gap: "12px", paddingLeft: "16px" }}>
            <Link to="/" onClick={() => setMenuOpen(false)}>Басты бет</Link>
            <Link to="/news" onClick={() => setMenuOpen(false)}>Жаңалықлар</Link>
            <Link to="/sport" onClick={() => setMenuOpen(false)}>Спорт</Link>
            <Link to="/tradition" onClick={() => setMenuOpen(false)}>Дәстүр</Link>
            <Link to="/religion" onClick={() => setMenuOpen(false)}>Дин</Link>
            <Link to="/history" onClick={() => setMenuOpen(false)}>Тарийх</Link>
            <Link to="/geography" onClick={() => setMenuOpen(false)}>География</Link>
            <Link to="/people" onClick={() => setMenuOpen(false)}>Тулғалар</Link>
            <Link to="/contact" onClick={() => setMenuOpen(false)}>Байланыс</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
