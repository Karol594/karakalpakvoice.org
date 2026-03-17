import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Mail, ShieldCheck,
  Facebook, Send, Youtube, Link as LinkIcon, Check,
  X, Bell, ChevronRight, Loader2, RefreshCcw, Linkedin, Twitter
} from 'lucide-react';

const useTranslation = () => {
  return {
    i18n: {
      language: 'KK',
      on: (event, callback) => {
        window.addEventListener('appLanguageChange', (e) => callback(e.detail));
      },
      off: (event, callback) => {
        window.removeEventListener('appLanguageChange', (e) => callback(e.detail));
      }
    }
  };
};

// API KEYS
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbz08JpdjEyTEs8eNrltLIwqoWTReL7t-yRgrshUxjjCSdyekW8SJILYi01XoNHhQRhn/exec";
const EMAILJS_SERVICE_ID = "service_prfy0ms";
const EMAILJS_TEMPLATE_ID = "template_larvdbk";
const EMAILJS_PUBLIC_KEY = "bdlmkh2WUhuaxXNSN";

// ============================================================
// SUBSCRIBE MODAL
// ============================================================
const SubscribeModal = ({ isOpen, onClose, t, lang }) => {
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState(''); 
  const [num1, setNum1] = useState(Math.floor(Math.random() * 10) + 1);
  const [num2, setNum2] = useState(Math.floor(Math.random() * 10) + 1);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateCaptcha = () => {
    setNum1(Math.floor(Math.random() * 10) + 1);
    setNum2(Math.floor(Math.random() * 10) + 1);
    setCaptchaAnswer('');
    setError('');
  };

  useEffect(() => {
    if (isOpen) {
      setSuccess(false);
      setEmail('');
      setHoneypot('');
      setError('');
      setCaptchaAnswer('');
      generateCaptcha();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (honeypot !== '') return;

    const lastSub = localStorage.getItem('last_sub_time');
    if (lastSub && Date.now() - lastSub < 60000) {
      setError(lang === 'KK' ? 'Бираз күтиң (60 сек).' : 'Too many requests.');
      return;
    }

    if (parseInt(captchaAnswer) !== num1 + num2) {
      setError(lang === 'KK' ? 'Қәте жуўап!' : 'Wrong answer!');
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      let ip = "Unknown";
      let country = "Unknown";
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        if (geoRes.ok) {
          const geoData = await geoRes.json();
          ip = geoData.ip;
          country = geoData.country_name;
        }
      } catch (err) { console.warn("Geo error"); }

      fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, country, ip, status: "Subscribed" })
      });

      const emailResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { 
            email: email, 
            user_lang: lang,
            user_ip: ip,
            user_country: country,
            name: "New Subscriber"
          }
        })
      });

      if (emailResponse.ok) {
        setSuccess(true);
        localStorage.setItem('last_sub_time', Date.now());
        setTimeout(() => { onClose(); }, 3000);
      } else {
        const errorText = await emailResponse.text();
        console.error("EmailJS Error Detail:", errorText);
        throw new Error(errorText);
      }

    } catch (err) {
      setError(lang === 'KK' ? 'Тармақ қәтеси. Қайтадан көриң.' : 'Network error.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={!isLoading ? onClose : undefined}></div>
      <div className="relative bg-[#121212] border border-gray-700 rounded-2xl w-full max-w-md p-8 shadow-2xl text-white">
        <input type="text" style={{display: 'none'}} value={honeypot} onChange={(e) => setHoneypot(e.target.value)} tabIndex="-1" autoComplete="off" />
        
        {!isLoading && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 p-1 rounded-full">
            <X size={20}/>
          </button>
        )}

        {success ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check size={32}/>
            </div>
            <h3 className="text-2xl font-bold mb-2">{lang === 'KK' ? 'Рахмет!' : 'Thank you!'}</h3>
            <p className="text-gray-400">{lang === 'KK' ? 'Сиз жаңалықларға табыслы жазылдыңыз.' : 'Subscription successful.'}</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={24}/>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.subscribeBtn}</h3>
              <p className="text-sm text-gray-400">{t.subscribeDesc}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="email"
                placeholder="Email адресиңиз"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:border-blue-500 disabled:opacity-50"
              />

              <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
                <label className="block text-xs text-gray-500 mb-2 uppercase font-bold">{lang === 'KK' ? 'Қәўипсизлик' : 'Security'}</label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-800/50 rounded px-3 py-2 text-center font-mono text-lg font-bold text-blue-400 border border-gray-700">
                    {num1} + {num2} = ?
                  </div>
                  <input
                    type="number"
                    placeholder="?"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-20 bg-white/10 border border-gray-700 rounded-lg px-3 py-2 text-center text-white focus:border-blue-500 font-bold"
                  />
                  <button type="button" onClick={generateCaptcha} disabled={isLoading} className="p-2 text-gray-500 hover:text-white">
                    <RefreshCcw size={18}/>
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:bg-blue-800"
              >
                {isLoading ? <Loader2 size={18} className="animate-spin"/> : <Send size={16}/>}
                <span>{isLoading ? (lang === 'KK' ? 'Күте турың...' : 'Please wait...') : t.subscribeAction}</span>
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

// ============================================================
// MAIN FOOTER
// ============================================================
export default function Footer() {
  const { i18n } = useTranslation();
  const [currentLang, setCurrentLang] = useState(localStorage.getItem('i18nextLng') || i18n.language || 'RU');
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleWindowChange = (event) => { if (event.detail && event.detail.lang) setCurrentLang(event.detail.lang); };
    window.addEventListener('languageChange', handleWindowChange);
    return () => window.removeEventListener('languageChange', handleWindowChange);
  }, []);

  const normalizedLang = (currentLang || 'RU').toUpperCase();
  const langKey = normalizedLang === 'KAA' ? 'KK' : (['EN','PL','KK','RU'].includes(normalizedLang) ? normalizedLang : 'RU');

  const t = {
    RU: {
      desc: "Независимая медиаплатформа и цифровой архив Каракалпакстана.",
      cols: { projects: "Проекты", about: "О нас", contact: "Контакты" },
      projectsList: [
        { name: "Экология", path: "/ecology" }, { name: "Образование", path: "/education" },
        { name: "Туризм", path: "/tourism" }, { name: "Свободные медиа", path: "/free-media" },
        { name: "Цифровое наследие", path: "/digital-heritage" }
      ],
      links: { mission: "Наша миссия", team: "Команда", policy: "Редакционная политика" },
      shareTitle: "Следите за нами",
      copyLink: "Копировать ссылку",
      rights: "Все права защищены.",
      subscribeBtn: "Подписаться на новости",
      subscribeDesc: "Получайте обновления прямо на почту.",
      subscribeAction: "Подписаться",
      subscribeCta: "Хотите быть в курсе событий?"
    },
    KK: {
      desc: "Қарақалпақстан тарийхы, мәденияты ҳәм инсан ҳуқықларына бағышланған ғәрезсиз медиа-платформа.",
      cols: { projects: "Жойбарлар", about: "Биз ҳаққымызда", contact: "Байланыс" },
      projectsList: [
        { name: "Экология", path: "/ecology" }, { name: "Билимлендириў", path: "/education" },
        { name: "Туризм", path: "/tourism" }, { name: "Еркин медиа", path: "/free-media" },
        { name: "Санлы мийрас", path: "/digital-heritage" }
      ],
      links: { mission: "Миссиямыз", team: "Команда", policy: "Редакциялық сиясат" },
      shareTitle: "Социал тармақларда бизге қосылың",
      copyLink: "Силтемени көшириў",
      rights: "Барлық ҳуқықлар қорғалған.",
      subscribeBtn: "Жаңалықларға жазылыў",
      subscribeDesc: "Соңғы жаңалықларды почтаңызға алың.",
      subscribeAction: "Жазылыў",
      subscribeCta: "Ең әҳмийетли ўақыялардан хабардар болғыңыз келе ме?"
    },
    EN: {
      desc: "Independent media platform and digital archive of Karakalpakstan.",
      cols: { projects: "Projects", about: "About Us", contact: "Contact Info" },
      projectsList: [
        { name: "Ecology", path: "/ecology" }, { name: "Education", path: "/education" },
        { name: "Tourism", path: "/tourism" }, { name: "Free Media", path: "/free-media" },
        { name: "Digital Heritage", path: "/digital-heritage" }
      ],
      links: { mission: "Our Mission", team: "Our Team", policy: "Editorial Policy" },
      shareTitle: "Follow us",
      copyLink: "Copy Link",
      rights: "All rights reserved.",
      subscribeBtn: "Subscribe",
      subscribeDesc: "Get updates directly to your inbox.",
      subscribeAction: "Subscribe",
      subscribeCta: "Want to stay updated?"
    },
    PL: {
      desc: "Niezależna platforma medialna poświęcona Karakalpakstanowi.",
      cols: { projects: "Projekty", about: "O nas", contact: "Kontakt" },
      projectsList: [
        { name: "Ekologia", path: "/ecology" }, { name: "Edukacja", path: "/education" },
        { name: "Turystyka", path: "/tourism" }, { name: "Wolne Media", path: "/free-media" },
        { name: "Cyfrowe Dziedzictwo", path: "/digital-heritage" }
      ],
      links: { mission: "Misja", team: "Zespół", policy: "Polityka redakcyjna" },
      shareTitle: "Śledź nas",
      copyLink: "Kopiuj link",
      rights: "Wszelkie prawa zastrzeżone.",
      subscribeBtn: "Zapisz się",
      subscribeDesc: "Otrzymuj aktualizacje.",
      subscribeAction: "Zapisz się",
      subscribeCta: "Chcesz być na bieżąco?"
    }
  };

  const content = t[langKey] || t.RU;
  const copyToClipboard = () => {
    navigator.clipboard.writeText('https://karakalpakvoice.org/');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <footer className="relative bg-[#0a0a0a] text-gray-300 font-sans border-t border-gray-800/50">
        <div className="w-full h-10 relative overflow-hidden border-b border-gray-800/30">
          <div className="absolute inset-0 opacity-80" style={{
            backgroundImage: "url('/images/hero-pattern.png')",
            backgroundSize: "contain",
            filter: "sepia(1) saturate(25) hue-rotate(10deg) brightness(1.3)"
          }}></div>
        </div>

        <div className="bg-[#0f0f0f] border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900/20 rounded-full text-blue-500"><Mail size={28}/></div>
              <div>
                <h4 className="text-white font-bold text-lg">{content.subscribeBtn}</h4>
                <p className="text-xs text-gray-500">{content.subscribeCta}</p>
              </div>
            </div>
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2">
              {content.subscribeAction} <ChevronRight size={18}/>
            </button>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo2.png" alt="Logo" className="w-10 h-10 object-contain"/>
              <span className="text-xl font-bold text-amber-500 tracking-wider uppercase">Karakalpak Voice</span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">{content.desc}</p>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-6 border-l-2 border-blue-600 pl-3 uppercase">{content.cols.projects}</h3>
            <ul className="space-y-3 text-[13px]">
              {content.projectsList.map((p, i) => (
                <li key={i}><Link to={p.path} className="hover:text-blue-400">• {p.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-6 border-l-2 border-amber-500 pl-3 uppercase">{content.cols.about}</h3>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/about" className="hover:text-amber-400">{content.links.mission}</Link></li>
              <li><Link to="/team" className="hover:text-amber-400">{content.links.team}</Link></li>
              <li><Link to="/policy" className="hover:text-amber-400 flex items-center gap-2"><ShieldCheck size={14}/>{content.links.policy}</Link></li>
            </ul>
          </div>

          <div className="lg:pl-10">
            <h3 className="text-white font-bold text-sm mb-6 border-l-2 border-green-500 pl-3 uppercase">{content.cols.contact}</h3>
            <div className="space-y-4 text-[13px]">
              <div className="flex items-start gap-3">
                <MapPin size={16} className="text-green-500 shrink-0"/>
                <span className="text-gray-400">Warsaw, Poland (EU)</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={16} className="text-green-500 shrink-0"/>
                <a href="mailto:info@karakalpakvoice.org">info@karakalpakvoice.org</a>
              </div>
              <div className="pt-6 border-t border-gray-800 mt-4">
                <div className="flex flex-wrap items-center gap-2.5">
                  <a href="https://www.facebook.com/share/1KYZAzopoy/" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#1877F2] text-white hover:scale-110 transition">
                    <Facebook size={18}/>
                  </a>
                  <a href="https://t.me/kkvoice_org" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#0088cc] text-white hover:scale-110 transition">
                    <Send size={18}/>
                  </a>
                  <a href="https://www.linkedin.com/in/karakalpak-voice-19b4633b5" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#0077B5] text-white hover:scale-110 transition">
                    <Linkedin size={18}/>
                  </a>
                  <a href="https://x.com/Karakalpak45997" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-black text-white hover:scale-110 transition border border-gray-700">
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.736-8.857L1.254 2.25H8.08l4.253 5.622 5.911-5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                  </a>
                  <a href="https://www.youtube.com/@KarakalpakVoice_org" target="_blank" rel="noopener noreferrer" className="p-2.5 rounded-full bg-[#FF0000] text-white hover:scale-110 transition">
                    <Youtube size={18}/>
                  </a>
                  <button onClick={copyToClipboard} className={`p-2.5 rounded-full transition text-white ${copied ? 'bg-green-600' : 'bg-gray-700'}`}>
                    {copied ? <Check size={18}/> : <LinkIcon size={18}/>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black py-6 border-t border-gray-900 text-[10px] text-gray-600 uppercase tracking-widest text-center">
          <p>© 2025-2026 Karakalpak-Voice Media Foundation. {content.rights}</p>
        </div>
      </footer>
      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={content} lang={langKey}/>
    </>
  );
}