import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";

export default function App() {
  return (
    <BrowserRouter>
      <Header />

      <main className="pt-20 w-full min-h-screen bg-black text-white">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
