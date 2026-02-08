import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Home } from 'lucide-react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-black text-black dark:text-white transition-colors duration-300">
      <Navbar />
      
      <main className="flex-grow flex flex-col items-center justify-center text-center px-6 relative z-10 pt-32 pb-20">
        {/* Фондық эффектілер */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.4] dark:opacity-[0.2]">
           <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-8">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 animate-pulse">
            404
          </h1>
          
          <div className="space-y-4">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 dark:text-white">
              Page Not Found / Бет табылмады
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Sorry, we couldn't find the page you're looking for. <br/>
              Кешириң, сиз излеген бет табылмады ямаса өширилген. <br/>
              Извините, страница не найдена или была удалена.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link 
              to="/" 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full font-bold shadow-xl transition-transform hover:scale-105"
            >
              <Home size={20} />
              Home / Бас бет
            </Link>
            <button 
              onClick={() => window.history.back()} 
              className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-100 dark:bg-white/10 hover:bg-gray-200 dark:hover:bg-white/20 text-gray-900 dark:text-white rounded-full font-bold transition-all border border-gray-200 dark:border-white/10"
            >
              <ArrowLeft size={20} />
              Back / Артқа
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default NotFound;