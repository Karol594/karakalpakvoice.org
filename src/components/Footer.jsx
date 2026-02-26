import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, Mail, ShieldCheck, Globe, 
  Facebook, Send, Instagram, Youtube, Link as LinkIcon, Check,
  X, Bell, ChevronRight, Loader2, RefreshCcw
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

const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

// API KEYS
const GOOGLE_SHEETS_URL = "https://script.google.com/macros/s/AKfycbxWjsSEnGU2E8WL0au4TvTtEnVt64Ws7IMhoRWK5VmfATT4odb5Zf_usfEC8dNpclbz/exec";
const EMAILJS_SERVICE_ID = "service_prfy0ms";
const EMAILJS_TEMPLATE_ID = "template_larvdbk";
const EMAILJS_PUBLIC_KEY = "X0wpA22ol6NG5QhVWJMGu";

// ============================================================
// SUBSCRIBE MODAL
// ============================================================
const SubscribeModal = ({ isOpen, onClose, t, lang }) => {
  const [email, setEmail] = useState('');
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
      setError('');
      setCaptchaAnswer('');
      generateCaptcha();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Капча тексеру
    if (parseInt(captchaAnswer) !== num1 + num2) {
      setError(
        lang === 'KK' ? 'Қәте жуўап! Қайтадан көриң.' :
        lang === 'RU' ? 'Неверный ответ! Попробуйте снова.' :
        lang === 'PL' ? 'Błędna odpowiedź! Spróbuj ponownie.' :
        'Wrong answer! Please try again.'
      );
      generateCaptcha();
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Геолокация
      let ip = "Unknown";
      let country = "Unknown";
      try {
        const geoRes = await fetch('https://ipapi.co/json/');
        const geoData = await geoRes.json();
        ip = geoData.ip;
        country = geoData.country_name;
      } catch (geoError) {
        console.warn("Геолокацияны алыў мүмкин болмады", geoError);
      }

      // Google Sheets-ке жазыў
      await fetch(GOOGLE_SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({
          email: email,
          country: country,
          ip: ip,
          status: "Pending (Тастыйықланбаған)"
        })
      });

      // EmailJS арқылы растау хаты жіберу
      await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: { 
            to_email: email,
            user_lang: lang
          }
        })
      });

      setSuccess(true);
      setTimeout(() => { onClose(); }, 3000);

    } catch (err) {
      setError(
        lang === 'KK' ? 'Интернетиңизди тексериң ямаса кейинрек көриң.' :
        lang === 'RU' ? 'Произошла ошибка сети. Попробуйте позже.' :
        lang === 'PL' ? 'Błąd sieci. Spróbuj później.' :
        'Network error. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={!isLoading ? onClose : undefined}></div>
      <div className="relative bg-[#121212] border border-gray-700 rounded-2xl w-full max-w-md p-8 shadow-2xl text-white">

        {!isLoading && (
          <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white bg-gray-800/50 p-1 rounded-full transition-colors">
            <X size={20}/>
          </button>
        )}

        {success ? (
          // Сәтті жазылғаннан кейінгі экран
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-500/20 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 animate-bounce">
              <Check size={32}/>
            </div>
            <h3 className="text-2xl font-bold mb-2">
              {lang === 'KK' ? 'Рахмет!' : lang === 'RU' ? 'Спасибо!' : lang === 'PL' ? 'Dziękuję!' : 'Thank you!'}
            </h3>
            <p className="text-gray-400">
              {lang === 'KK' ? 'Сиз жаңалықларға табыслы жазылдыңыз. Почтаңызды тексериң!' :
               lang === 'RU' ? 'Вы успешно подписались на новости. Проверьте вашу почту!' :
               lang === 'PL' ? 'Pomyślnie zapisałeś się. Sprawdź swoją pocztę!' :
               'You have successfully subscribed. Check your inbox!'}
            </p>
          </div>
        ) : (
          <>
            {/* Тақырып */}
            <div className="text-center mb-6">
              <div className="w-12 h-12 bg-blue-600/20 text-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Bell size={24}/>
              </div>
              <h3 className="text-xl font-bold mb-2">{t.subscribeBtn}</h3>
              <p className="text-sm text-gray-400">{t.subscribeDesc}</p>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Email */}
              <input
                type="email"
                placeholder="Email адресиңиз"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading}
                className="w-full bg-gray-900 border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50 transition-colors"
              />

              {/* Математикалық Капча */}
              <div className="bg-[#0a0a0a] p-4 rounded-lg border border-gray-800">
                <label className="block text-xs text-gray-500 mb-2 uppercase tracking-wider font-bold">
                  {lang === 'KK' ? 'Қәўипсизлик' :
                   lang === 'RU' ? 'Безопасность' :
                   lang === 'PL' ? 'Bezpieczeństwo' :
                   'Security'} (Captcha)
                </label>
                <div className="flex items-center gap-3">
                  <div className="flex-1 bg-gray-800/50 rounded px-3 py-2 text-center font-mono text-lg font-bold text-blue-400 border border-gray-700 select-none">
                    {num1} + {num2} = ?
                  </div>
                  <input
                    type="number"
                    placeholder="?"
                    value={captchaAnswer}
                    onChange={(e) => setCaptchaAnswer(e.target.value)}
                    required
                    disabled={isLoading}
                    className="w-20 bg-white/10 border border-gray-700 rounded-lg px-3 py-2 text-center text-white focus:outline-none focus:border-blue-500 font-bold disabled:opacity-50"
                  />
                  <button type="button" onClick={generateCaptcha} disabled={isLoading} className="p-2 text-gray-500 hover:text-white disabled:opacity-50">
                    <RefreshCcw size={18}/>
                  </button>
                </div>
                {error && <p className="text-red-500 text-xs mt-2 font-medium">{error}</p>}
              </div>

              {/* Жіберу кнопкасы */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 hover:bg-blue-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? (
                  <>
                    <Loader2 size={18} className="animate-spin"/>
                    <span>
                      {lang === 'KK' ? 'Күте турың...' :
                       lang === 'RU' ? 'Подождите...' :
                       lang === 'PL' ? 'Czekaj...' : 'Please wait...'}
                    </span>
                  </>
                ) : (
                  <>
                    <span>{t.subscribeAction}</span>
                    <Send size={16}/>
                  </>
                )}
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

  const [currentLang, setCurrentLang] = useState(
    localStorage.getItem('i18nextLng') || i18n.language || 'RU'
  );
  const [copied, setCopied] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const handleI18nChange = (lng) => setCurrentLang(lng);
    const handleWindowChange = (event) => {
      if (event.detail && event.detail.lang) setCurrentLang(event.detail.lang);
    };
    i18n.on('languageChanged', handleI18nChange);
    window.addEventListener('languageChange', handleWindowChange);
    return () => {
      i18n.off('languageChanged', handleI18nChange);
      window.removeEventListener('languageChange', handleWindowChange);
    };
  }, [i18n]);

  const normalizedLang = (currentLang || 'RU').toUpperCase();
  const langKey = normalizedLang === 'KAA' ? 'KK' : (['EN','PL','KK','RU'].includes(normalizedLang) ? normalizedLang : 'RU');

  const t = {
    RU: {
      desc: "Независимая медиаплатформа и цифровой архив, посвященные истории, культуре и правам человека Каракалпакстана.",
      cols: { projects: "Проекты", about: "О нас", contact: "Контакты" },
      projectsList: [
        { name: "Экология", path: "/projects/ecology" },
        { name: "Образование", path: "/projects/education" },
        { name: "Туризм", path: "/projects/tourism" },
        { name: "Свободные медиа", path: "/projects/media" },
        { name: "Цифровое наследие", path: "/projects/digital-heritage" }
      ],
      links: { mission: "Наша миссия", team: "Команда", policy: "Редакционная политика" },
      shareTitle: "Следите за нами в соцсетях",
      copyLink: "Скопировать ссылку",
      rights: "Все права защищены.",
      subscribeBtn: "Подписаться на новости",
      subscribeDesc: "Получайте последние обновления прямо на почту.",
      subscribeAction: "Подписаться",
      subscribeCta: "Хотите быть в курсе событий? Подпишитесь на нашу рассылку."
    },
    KK: {
      desc: "Қарақалпақстан тарийхы, мәденияты ҳәм инсан ҳуқықларына бағышланған ғәрезсиз медиа-платформа ҳәм санлы архив.",
      cols: { projects: "Жойбарлар", about: "Биз ҳаққымызда", contact: "Байланыс" },
      projectsList: [
        { name: "Экология", path: "/projects/ecology" },
        { name: "Билимлендириў", path: "/projects/education" },
        { name: "Туризм", path: "/projects/tourism" },
        { name: "Еркин медиа", path: "/projects/media" },
        { name: "Санлы мийрас", path: "/projects/digital-heritage" }
      ],
      links: { mission: "Миссиямыз", team: "Команда", policy: "Редакциялық сиясат" },
      shareTitle: "Социал тармақларда бизге қосылың",
      copyLink: "Силтемени көшириў",
      rights: "Барлық ҳуқықлар қорғалған.",
      subscribeBtn: "Жаңалықларға жазылыў",
      subscribeDesc: "Соңғы жаңалықларды электрон почтаңызға алың.",
      subscribeAction: "Жазылыў",
      subscribeCta: "Ең әҳмийетли ўақыялардан хабардар болғыңыз келе ме?"
    },
    EN: {
      desc: "An independent media platform and digital archive dedicated to the history, culture and human rights of Karakalpakstan.",
      cols: { projects: "Projects", about: "About Us", contact: "Contact Info" },
      projectsList: [
        { name: "Ecology", path: "/projects/ecology" },
        { name: "Education", path: "/projects/education" },
        { name: "Tourism", path: "/projects/tourism" },
        { name: "Free Media", path: "/projects/media" },
        { name: "Digital Heritage", path: "/projects/digital-heritage" }
      ],
      links: { mission: "Our Mission", team: "Our Team", policy: "Editorial Policy" },
      shareTitle: "Follow us on Social Media",
      copyLink: "Copy Link",
      rights: "All rights reserved.",
      subscribeBtn: "Subscribe to Newsletter",
      subscribeDesc: "Get the latest updates directly to your inbox.",
      subscribeAction: "Subscribe",
      subscribeCta: "Want to stay updated? Subscribe to our newsletter."
    },
    PL: {
      desc: "Niezależna platforma medialna i Archiwum Cyfrowe poświęcone historii, kulturze i prawom człowieka Karakalpakstanu.",
      cols: { projects: "Projekty", about: "O nas", contact: "Kontakt" },
      projectsList: [
        { name: "Ekologia", path: "/projects/ecology" },
        { name: "Edukacja", path: "/projects/education" },
        { name: "Turystyka", path: "/projects/tourism" },
        { name: "Wolne Media", path: "/projects/media" },
        { name: "Cyfrowe Dziedzictwo", path: "/projects/digital-heritage" }
      ],
      links: { mission: "Nasza misja", team: "Zespół", policy: "Polityka redakcyjna" },
      shareTitle: "Śledź nas w mediach społecznościowych",
      copyLink: "Kopiuj link",
      rights: "Wszelkie prawa zastrzeżone.",
      subscribeBtn: "Zapisz się do newslettera",
      subscribeDesc: "Otrzymuj najnowsze aktualizacje na swoją skrzynkę.",
      subscribeAction: "Zapisz się",
      subscribeCta: "Chcesz być na bieżąco? Zapisz się do naszego newslettera."
    }
  };

  const content = t[langKey] || t.RU;
  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <footer className="relative bg-[#0a0a0a] text-gray-300 font-sans border-t border-gray-800/50">

        {/* Қарақалпақ өрнегі */}
        <div className="w-full h-10 relative overflow-hidden border-b border-gray-800/30">
          <div className="absolute inset-0 opacity-80" style={{
            backgroundImage: "url('/images/hero-pattern.png')",
            backgroundSize: "contain",
            filter: "sepia(1) saturate(25) hue-rotate(10deg) brightness(1.3)"
          }}></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#D4AF37]/40 via-transparent to-[#D4AF37]/40"></div>
        </div>

        {/* Жазылу секциясы */}
        <div className="bg-[#0f0f0f] border-b border-gray-800/50">
          <div className="max-w-7xl mx-auto px-4 py-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-900/20 rounded-full text-blue-500"><Mail size={28}/></div>
              <div>
                <h4 className="text-white font-bold text-lg">{content.subscribeBtn}</h4>
                <p className="text-xs text-gray-500">{content.subscribeCta}</p>
              </div>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full transition-all flex items-center gap-2"
            >
              {content.subscribeAction} <ChevronRight size={18}/>
            </button>
          </div>
        </div>

        {/* Негізгі сілтемелер */}
        <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1.5fr] gap-12">
          <div className="space-y-6">
            <Link to="/" className="flex items-center gap-3">
              <img src="/images/logo2.png" alt="Logo" className="w-10 h-10 object-contain"/>
              <span className="text-xl font-bold text-amber-500 tracking-wider uppercase">Karakalpak Voice</span>
            </Link>
            <p className="text-xs text-gray-500 leading-relaxed">{content.desc}</p>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-6 border-l-2 border-blue-600 pl-3 uppercase tracking-widest">{content.cols.projects}</h3>
            <ul className="space-y-3 text-[13px]">
              {content.projectsList.map((p, i) => (
                <li key={i}><Link to={p.path} className="hover:text-blue-400 transition">• {p.name}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-bold text-sm mb-6 border-l-2 border-amber-500 pl-3 uppercase tracking-widest">{content.cols.about}</h3>
            <ul className="space-y-3 text-[13px]">
              <li><Link to="/about" className="hover:text-amber-400 transition">{content.links.mission}</Link></li>
              <li><Link to="/team" className="hover:text-amber-400 transition">{content.links.team}</Link></li>
              <li><Link to="/policy" className="hover:text-amber-400 transition flex items-center gap-2"><ShieldCheck size={14}/>{content.links.policy}</Link></li>
            </ul>
          </div>

          <div className="lg:pl-10">
            <h3 className="text-white font-bold text-sm mb-6 border-l-2 border-green-500 pl-3 uppercase tracking-widest">{content.cols.contact}</h3>
            <div className="space-y-4 text-[13px]">
              <div className="flex items-start gap-3"><MapPin size={16} className="text-green-500 shrink-0"/><span className="text-gray-400">Warsaw, Poland (EU)</span></div>
              <div className="flex items-center gap-3"><Mail size={16} className="text-green-500 shrink-0"/><a href="mailto:info@karakalpakvoice.org" className="hover:text-white">info@karakalpakvoice.org</a></div>

              <div className="pt-6 border-t border-gray-800 mt-4">
                <h4 className="text-[10px] text-gray-500 mb-4 uppercase tracking-widest font-bold">{content.shareTitle}</h4>
                <div className="flex flex-wrap items-center gap-2.5">
                  <a href="https://facebook.com" className="p-2.5 rounded-full bg-[#1877F2] text-white hover:scale-110 transition"><Facebook size={18}/></a>
                  <a href="https://t.me/kkvoice_org" className="p-2.5 rounded-full bg-[#0088cc] text-white hover:scale-110 transition"><Send size={18}/></a>
                  <a href="https://instagram.com" className="p-2.5 rounded-full bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 text-white hover:scale-110 transition"><Instagram size={18}/></a>
                  <a href="https://youtube.com" className="p-2.5 rounded-full bg-[#FF0000] text-white hover:scale-110 transition"><Youtube size={18}/></a>
                  <a href="https://tiktok.com" className="p-2.5 rounded-full bg-black border border-gray-700 text-white hover:scale-110 transition"><TikTokIcon size={18}/></a>
                  <button onClick={copyToClipboard} className={`p-2.5 rounded-full transition hover:scale-110 text-white ${copied ? 'bg-green-600' : 'bg-gray-700'}`}>
                    {copied ? <Check size={18}/> : <LinkIcon size={18}/>}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="bg-black py-6 border-t border-gray-900 text-[10px] text-gray-600 uppercase tracking-widest">
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p>© 2025-2026 Karakalpak-Voice Media Foundation. {content.rights}</p>
            <div className="flex items-center gap-3"><span>Warsaw • EU</span><Globe size={12}/></div>
          </div>
        </div>
      </footer>

      <SubscribeModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} t={content} lang={langKey}/>
    </>
  );
}