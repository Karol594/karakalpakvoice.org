import React, { useState } from 'react';
import emailjs from '@emailjs/browser';
import { Turnstile } from '@marsidev/react-turnstile';
import { useTranslation } from 'react-i18next';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

const Newsletter = () => {
  const { i18n } = useTranslation();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); 
  const [token, setToken] = useState(null);

  const translations = {
    RU: { placeholder: "Ваш email...", button: "Подписаться", success: "Успешно!", error: "Ошибка.", captcha: "Пройдите капчу." },
    KK: { placeholder: "Электрон поштаңыз...", button: "Жазылыў", success: "Табыслы!", error: "Қәте!", captcha: "Капчадан өтиң." },
    EN: { placeholder: "Your email...", button: "Subscribe", success: "Success!", error: "Error.", captcha: "Pass captcha." },
    PL: { placeholder: "Twój email...", button: "Subskrybuj", success: "Sukces!", error: "Błąd.", captcha: "Przejdź captcha." }
  };

  const currentLang = i18n.language ? i18n.language.toUpperCase() : 'RU';
  const langKey = currentLang === 'KAA' ? 'KK' : (['RU', 'KK', 'EN', 'PL'].includes(currentLang) ? currentLang : 'RU');
  const text = translations[langKey];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!token) { alert(text.captcha); return; }
    setStatus('loading');
    try {
      await emailjs.send('service_prfy0ms', 'template_uik8v9d', { user_email: email, 'cf-turnstile-response': token }, 'bdlmkh2WUhuaxXNSN');
      setStatus('success');
      setEmail('');
    } catch (error) { setStatus('error'); }
  };

  return (
    <div className="max-w-md mx-auto p-4 z-[50] relative">
      <div className="bg-black/20 backdrop-blur-md p-6 rounded-3xl border border-white/10 shadow-xl">
        {status === 'success' ? (
          <div className="flex items-center justify-center gap-3 py-2 text-green-500 font-bold animate-fade-in">
            <CheckCircle size={24} /> <span>{text.success}</span>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={text.placeholder}
              className="w-full px-4 py-3 bg-black/40 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            />
            <div className="flex justify-center scale-90 h-16 overflow-hidden">
              <Turnstile siteKey="0x4AAAAAACKFXbOOHUSaZLQc" onSuccess={(token) => setToken(token)} theme="dark" />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 px-5 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-800 text-white font-bold rounded-xl transition-all text-sm"
            >
              {status === 'loading' ? <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></div> : <><span className="uppercase tracking-widest">{text.button}</span><Send size={16} /></>}
            </button>
            {status === 'error' && <div className="text-red-400 text-[10px] text-center italic">{text.error}</div>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Newsletter;