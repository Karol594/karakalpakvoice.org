import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Sovereignty from './pages/Sovereignty';
import Declaration from './pages/Declaration';
import Constitution from './pages/Constitution';
import QaraAI from './pages/QaraAI';
import Bots from './pages/Bots';
import About from './pages/About';
import JoinUs from './pages/JoinUs';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/sovereignty" element={<Sovereignty />} />
            <Route path="/declaration" element={<Declaration />} />
            <Route path="/constitution" element={<Constitution />} />
            <Route path="/qara-ai" element={<QaraAI />} />
            <Route path="/bots" element={<Bots />} />
            <Route path="/about" element={<About />} />
            <Route path="/join" element={<JoinUs />} />
          </Routes>
        </main>

        <Footer />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;
