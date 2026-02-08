import React, { useState } from 'react';
import { 
  Facebook, Instagram, Twitter, Youtube, Send, 
  Link as LinkIcon, Check, Printer 
} from 'lucide-react';

// TikTok Icon компоненті
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

const ShareSection = ({ titleText, copyTitle, printTitle, onPrint }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    // ТҮЗЕТУ: 'relative z-10' қосылды (Артқы фонның үстіне шығару үшін)
    <div className="relative z-10 mt-16 border-t border-gray-200 dark:border-gray-700 pt-10 text-center mb-10 no-print">
      <h3 className="text-2xl font-bold mb-8 italic text-black dark:text-white">
        {titleText}
      </h3>
      <div className="flex flex-wrap justify-center gap-6">
        
        {/* Facebook */}
        <a href="https://www.facebook.com/share/1FifdzG23b/" target="_blank" rel="noreferrer" 
           className="p-4 rounded-full bg-[#1877F2] text-white hover:scale-110 transition shadow-lg flex items-center justify-center">
          <Facebook size={24} />
        </a>

        {/* Telegram */}
        <a href="https://t.me/kkvoice_org" target="_blank" rel="noreferrer" 
           className="p-4 rounded-full bg-[#0088cc] text-white hover:scale-110 transition shadow-lg flex items-center justify-center">
          <Send size={24} />
        </a>

        {/* Instagram */}
        <a href="https://www.instagram.com/karakalpakvoice_org/" target="_blank" rel="noreferrer" 
           className="p-4 rounded-full bg-gradient-to-tr from-yellow-400 to-purple-600 text-white hover:scale-110 transition shadow-lg flex items-center justify-center">
          <Instagram size={24} />
        </a>

        {/* YouTube */}
        <a href="https://youtube.com/@karakalpakvoice_org" target="_blank" rel="noreferrer" 
           className="p-4 rounded-full bg-[#FF0000] text-white hover:scale-110 transition shadow-lg flex items-center justify-center">
          <Youtube size={24} />
        </a>

        {/* TikTok - Жарық режимде шекарасы анық көрінуі үшін border-gray-300 қосылды */}
        <a href="https://www.tiktok.com/@karakalpakvoice" target="_blank" rel="noreferrer" 
           className="p-4 rounded-full bg-black text-white border border-gray-300 dark:border-gray-600 hover:scale-110 transition shadow-lg flex items-center justify-center">
          <TikTokIcon size={24} />
        </a>

        {/* Twitter */}
        <a href="https://x.com/Karakalpak45997" target="_blank" rel="noreferrer" 
           className="p-4 rounded-full bg-black text-white border border-gray-300 dark:border-gray-600 hover:scale-110 transition shadow-lg flex items-center justify-center">
          <Twitter size={24} />
        </a>

        {/* Copy Link */}
        <button 
          onClick={copyToClipboard} 
          className={`p-4 rounded-full hover:scale-110 transition shadow-lg flex items-center justify-center gap-2 text-white ${copied ? 'bg-green-600' : 'bg-gray-600'}`}
          title={copyTitle}
        >
          {copied ? <Check size={24} /> : <LinkIcon size={24} />}
        </button>

        {/* Printer Button */}
        {onPrint && (
          <button 
            onClick={onPrint} 
            className="p-4 rounded-full bg-gray-500 hover:bg-gray-400 text-white hover:scale-110 transition shadow-lg flex items-center justify-center"
            title={printTitle}
          >
            <Printer size={24} />
          </button>
        )}

      </div>
    </div>
  );
};

export default ShareSection;