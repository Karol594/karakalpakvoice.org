import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Компонентлер
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import ScrollToTop from './components/ScrollToTop';

<<<<<<< HEAD
// Бетлер (Тийкарғы)
import Home from './pages/Home';
import Qaraqalpaqstan from './pages/Qaraqalpaqstan';
import History from './pages/History';
import Geography from './pages/Geography';
import Tradition from './pages/Tradition';
import CultureArt from './pages/CultureArt';
import AralSea from './pages/AralSea';
import Religion from './pages/Religion';
import Sport from './pages/Sport';
import News from './pages/News';
import NewsPost from './pages/NewsPost';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound'; // ✅ 404 БЕТІ ҚОСЫЛДЫ
=======
// Беттерді импортлау
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
import Flag from "./pages/Flag";
import Anthem from "./pages/Anthem";
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d

// "Биз ҳаққында" бөлими
import About from './pages/About'; 
import Team from './pages/Team'; 
import Mission from './pages/Mission'; 
import Policy from './pages/Policy'; 

// "Жойбарлар" (Проекты) бөлими
import Ecology from './pages/Ecology';
import Education from './pages/Education';
import Tourism from './pages/Tourism';
import FreeMedia from './pages/FreeMedia';
import DigitalHeritage from './pages/DigitalHeritage';

// Басқа бөлимлер
import Manifesto from './pages/Manifesto';
import Museums from './pages/Museums';
import ElPerzentleri from './pages/ElPerzentleri';

// Рәмийзлер (Символика)
import Sovereignty from './pages/Sovereignty';
import Declaration from './pages/Declaration';
import Constitution from './pages/Constitution';
import Flag from './pages/Flag';
import Emblem from './pages/Emblem';
import Anthem from './pages/Anthem';

import './App.css';

function App() {
  return (
<<<<<<< HEAD
    <div className="App flex flex-col min-h-screen"> 
        <ScrollToTop /> 
        
        <Navbar />
        
        {/* Негізгі контент */}
        <div className="flex-grow">
          <Routes>
            {/* --- БАС МЕНЮ --- */}
            <Route path="/" element={<Home />} />
            
            {/* ✅ QARAQALPAQSTAN ПОРТАЛЫ */}
            <Route path="/qaraqalpaqstan" element={<Qaraqalpaqstan />} />
            <Route path="/karakalpakstan" element={<Qaraqalpaqstan />} />
            
            <Route path="/history" element={<History />} />
            <Route path="/geography" element={<Geography />} />
            <Route path="/traditions" element={<Tradition />} /> 
            <Route path="/culture-art" element={<CultureArt />} />
            <Route path="/aral-sea" element={<AralSea />} />
            
            {/* Басқа бөлимлер */}
            <Route path="/religion" element={<Religion />} />
            <Route path="/sports" element={<Sport />} />
            <Route path="/news" element={<News />} />
            <Route path="/contacts" element={<Contact />} />
            
            {/* "Биз ҳаққында" менюси */}
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/mission" element={<Mission />} />
            <Route path="/policy" element={<Policy />} />

            {/* "ЖОЙБАРЛАР" (ПРОЕКТЫ) */}
            <Route path="/ecology" element={<Ecology />} />
            <Route path="/education" element={<Education />} />
            <Route path="/tourism" element={<Tourism />} />
            <Route path="/free-media" element={<FreeMedia />} />
            <Route path="/digital-heritage" element={<DigitalHeritage />} />

            {/* Қосымша бетлер */}
            <Route path="/manifesto" element={<Manifesto />} />
            <Route path="/museums" element={<Museums />} />
            <Route path="/famous-people" element={<ElPerzentleri />} />
            
            {/* Жаңалықлар иши */}
            <Route path="/news/:year/:slug" element={<NewsPost />} />

            {/* Рәмийзлер (Символика) */}
            <Route path="/sovereignty" element={<Sovereignty />} />
            <Route path="/declaration" element={<Declaration />} />
            <Route path="/constitution" element={<Constitution />} />
            <Route path="/flag" element={<Flag />} />
            <Route path="/emblem" element={<Emblem />} />
            <Route path="/anthem" element={<Anthem />} />

            {/* ✅ 404 ҚАТЕ (Ең соңында тұруы керек) */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>

        <Footer />
    </div>
=======
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
          <Route path="/flag" element={<Flag />} />
          <Route path="/anthem" element={<Anthem />} />
        </Routes>
      </div>
    </Router>
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
  );
}

export default App;