import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import About from './pages/About';
import Bots from './pages/Bots';
import Constitution from './pages/Constitution';
import Contact from './pages/Contact';
import Declaration from './pages/Declaration';
import Geography from './pages/Geography';
import History from './pages/History';
import JoinUs from './pages/JoinUs';
import News from './pages/News';
import People from './pages/People';
import QaraAI from './pages/QaraAI';
import Religion from './pages/Religion';
import Sovereignty from './pages/Sovereignty';
import Sport from './pages/Sport';
import Tradition from './pages/Tradition';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sovereignty" element={<Sovereignty />} />
          <Route path="/declaration" element={<Declaration />} />
          <Route path="/constitution" element={<Constitution />} />
          <Route path="/qara-ai" element={<QaraAI />} />
          <Route path="/news" element={<News />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/bots" element={<Bots />} />
          <Route path="/geography" element={<Geography />} />
          <Route path="/history" element={<History />} />
          <Route path="/join" element={<JoinUs />} />
          <Route path="/people" element={<People />} />
          <Route path="/religion" element={<Religion />} />
          <Route path="/sport" element={<Sport />} />
          <Route path="/tradition" element={<Tradition />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
