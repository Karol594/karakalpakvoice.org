import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navigation from "./components/Navigation";

// Бетлерди импортлаў
import Home from "./pages/Home";
import About from "./pages/About";
import News from "./pages/News";
import Sovereignty from "./pages/Sovereignty";
import History from "./pages/History";
import Geography from "./pages/Geography";
import People from "./pages/People";
import Religion from "./pages/Religion";
import Tradition from "./pages/Tradition";
import Sport from "./pages/Sport";
import Contact from "./pages/Contact";

export default function App() {
  return (
    <Router>
      <Navigation />

      <div className="pt-[90px]">  
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/sovereignty" element={<Sovereignty />} />
          <Route path="/history" element={<History />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/people" element={<People />} />
          <Route path="/religion" element={<Religion />} />
          <Route path="/tradition" element={<Tradition />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
    </Router>
  );
}
