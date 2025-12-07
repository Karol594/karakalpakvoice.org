import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "./App.css";
import "./i18n"; // ← Перевод системасын иске қосатугын ШАРТЛИ тиркеу

import Navigation from "./components/Navigation";

// Бас бет компоненттери
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Contact from "./pages/Contact";

// Қосымша бетлер
import Sovereignty from "./pages/Sovereignty";
import Declaration from "./pages/Declaration";
import Constitution from "./pages/Constitution";
import QaraAI from "./pages/QaraAI";
import Bots from "./pages/Bots";
import Geography from "./pages/Geography";
import History from "./pages/History";
import People from "./pages/People";
import Religion from "./pages/Religion";
import Sport from "./pages/Sport";
import Tradition from "./pages/Tradition";
import Join from "./pages/Join";

export default function App() {
  return (
    <Router>
      <Navigation />

      <div className="container">
        <Routes>

          {/* Тийкаргы бетлер */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/contact" element={<Contact />} />

          {/* Қосымша барлық бетлер */}
          <Route path="/sovereignty" element={<Sovereignty />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/qara-ai" element={<QaraAI />} />

          <Route path="/bots" element={<Bots />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/history" element={<History />} />
          <Route path="/people" element={<People />} />
          <Route path="/religion" element={<Religion />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/tradition" element={<Tradition />} />
          <Route path="/join" element={<Join />} />

        </Routes>
      </div>
    </Router>
  );
}
