import React from 'react';
import { ArrowLeft, X, ArrowUp } from 'lucide-react';

const PageControls = ({ 
  onBack,       // Артқа қайту функциясы
  onClose,      // Жабу функциясы (X)
  textBack,     // "Артқа қайту" сөзі (аударма)
  showScrollBtn,// Скролл батырмасын көрсету керек пе? (true/false)
  onScrollTop   // Жоғарыға көтерілу функциясы
}) => {
  return (
    <>
      {/* 1. Close Button (X) - Оң жақ жоғары */}
      {onClose && (
        <button 
          onClick={onClose} 
          className="fixed top-24 md:top-32 right-6 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-red-500 rounded-full backdrop-blur-md transition-colors text-gray-900 dark:text-white no-print"
        >
          <X size={28} />
        </button>
      )}

      {/* 2. Back Button (<-) - Сол жақ жоғары */}
      {onBack && (
        <button 
          onClick={onBack} 
          className="fixed top-24 md:top-32 left-6 z-50 p-3 bg-black/10 dark:bg-white/10 hover:bg-blue-500 rounded-full backdrop-blur-md transition-colors text-gray-900 dark:text-white flex items-center gap-2 px-4 font-bold shadow-lg no-print"
        >
          <ArrowLeft size={24} /> 
          {textBack && <span className="hidden md:inline">{textBack}</span>}
        </button>
      )}

      {/* 3. Scroll To Top Button (^) - Оң жақ төмен */}
      {showScrollBtn && onScrollTop && (
        <button 
          onClick={onScrollTop} 
          className="fixed bottom-8 right-8 z-[150] p-4 bg-blue-600 hover:bg-blue-500 text-white rounded-full shadow-2xl transition-all duration-300 animate-bounce no-print"
        >
          <ArrowUp size={24} />
        </button>
      )}
    </>
  );
};

export default PageControls;