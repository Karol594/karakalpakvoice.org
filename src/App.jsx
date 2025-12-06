import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import Home from "./pages/Home";
import News from "./pages/News";
import Sport from "./pages/Sport";
import Tradition from "./pages/Tradition";
import Religion from "./pages/Religion";
import History from "./pages/History";
import Geography from "./pages/Geography";
import People from "./pages/People";
import Contact from "./pages/Contact";

function App() {
  return (
    <Router>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/sport" element={<Sport />} />
        <Route path="/tradition" element={<Tradition />} />
        <Route path="/religion" element={<Religion />} />
        <Route path="/history" element={<History />} />
        <Route path="/geography" element={<Geography />} />
        <Route path="/people" element={<People />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
