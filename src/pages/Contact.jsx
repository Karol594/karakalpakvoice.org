<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Globe, User } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Contact() {
  const { i18n } = useTranslation();
  
  // Бет ашылғанда жоқарыға шығарыў
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const [status, setStatus] = useState({ type: '', message: '' });

  // --- АЎДАРМАЛАР (4 ТИЛДЕ) ---
=======
import React, { useState } from 'react';
import { Send, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Contact() {
  const [language, setLanguage] = useState('ru');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
  const translations = {
    ru: {
      title: 'Свяжитесь с нами',
      subtitle: 'Отправьте свои вопросы и предложения',
<<<<<<< HEAD
      form: { name: 'Ваше имя', email: 'Email адрес', subject: 'Тема', message: 'Сообщение', btn: 'Отправить', sending: 'Отправка...' },
      info: { title: 'Контактная информация', address1: 'Варшава, Польша (Офис)', address2: 'Нукус, Каракалпакстан (Редакция)', phone: 'Телефон', email: 'Email', site: 'Сайт' },
      errors: { required: 'Заполните все поля', email: 'Неверный формат email', success: 'Ваше сообщение отправлено!' }
    },
    kk: {
      title: 'Биз бенен байланысыў',
      subtitle: 'Сораўларыңыз ҳәм усынысларыңызды жибериң',
      form: { name: 'Аты-жөниңиз', email: 'Email почтаңыз', subject: 'Тема', message: 'Хабарлама', btn: 'Жибериў', sending: 'Жиберилип атыр...' },
      info: { title: 'Байланыс мағлыўматы', address1: 'Варшава, Польша (Офис)', address2: 'Нөкис, Қарақалпақстан (Редакция)', phone: 'Телефон', email: 'Электрон почта', site: 'Веб-сайт' },
      errors: { required: 'Барлық майданларды толтырың', email: 'Email форматы дурыс емес', success: 'Хабарламаңыз жиберилди!' }
    },
    en: {
      title: 'Connect with us',
      subtitle: 'Send us your questions and suggestions',
      form: { name: 'Your Name', email: 'Email Address', subject: 'Subject', message: 'Message', btn: 'Send', sending: 'Sending...' },
      info: { title: 'Contact Information', address1: 'Warsaw, Poland (HQ)', address2: 'Nukus, Karakalpakstan (Editorial)', phone: 'Phone', email: 'Email', site: 'Website' },
      errors: { required: 'Please fill all fields', email: 'Invalid email format', success: 'Your message has been sent!' }
=======
      name: 'Ваше имя',
      email: 'Email адрес',
      message: 'Сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      info: 'Контактная информация',
      address: '📍Варшава, Польша',
      errors: {
        required: 'Заполните все поля',
        email: 'Неверный формат email',
        failed: 'Произошла ошибка. Попробуйте снова.'
      },
      success: 'Ваше сообщение отправлено!'
    },
    kk: {
      title: 'Биз менен байланысыў',
      subtitle: 'Сораўларыңызды ҳәм усынысларыңызды жибериң',
      name: 'Атыңыз-жөниңиз',
      email: 'Email мәнзили',
      message: 'Хабарлама',
      send: 'Жибериў',
      sending: 'Жиберилип атыр...',
      info: 'Байланыс мағлыўматы',
      address: '📍Варшава, Польша',
      errors: {
        required: 'Барлық майданларды толтырың',
        email: 'Email форматы дурыс емес',
        failed: 'Қәте болды. Қайталап көриң.'
      },
      success: 'Хабарламаңыз жиберилди!'
    },
    en: {
      title: 'Contact Us',
      subtitle: 'Send us your questions and suggestions',
      name: 'Your Name',
      email: 'Email Address',
      message: 'Message',
      send: 'Send',
      sending: 'Sending...',
      info: 'Contact Information',
      address: '📍Warsaw, Poland',
      errors: {
        required: 'Please fill all fields',
        email: 'Invalid email format',
        failed: 'An error occurred. Please try again.'
      },
      success: 'Your message has been sent!'
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
    },
    pl: {
      title: 'Skontaktuj się z nami',
      subtitle: 'Wyślij nam swoje pytania i sugestie',
<<<<<<< HEAD
      form: { name: 'Twoje imię', email: 'Adres email', subject: 'Temat', message: 'Wiadomość', btn: 'Wyślij', sending: 'Wysyłanie...' },
      info: { title: 'Informacje kontaktowe', address1: 'Warszawa, Polska (Biuro)', address2: 'Nukus, Karakałpakstan (Redakcja)', phone: 'Telefon', email: 'Email', site: 'Strona www' },
      errors: { required: 'Wypełnij wszystkie pola', email: 'Nieprawidłowy format email', success: 'Twoja wiadomość została wysłana!' }
    }
  };

  // Ҳәзирги тилди анықлаў (default: RU)
  const currentLang = i18n.language ? i18n.language.toLowerCase() : 'ru';
  const langKey = currentLang === 'kaa' ? 'kk' : (translations[currentLang] ? currentLang : 'ru');
  const t = translations[langKey];
=======
      name: 'Twoje imię',
      email: 'Adres email',
      message: 'Wiadomość',
      send: 'Wyślij',
      sending: 'Wysyłanie...',
      info: 'Informacje kontaktowe',
      address: '📍Warszawa, Polska',
      errors: {
        required: 'Wypełnij wszystkie pola',
        email: 'Nieprawidłowy format email',
        failed: 'Wystąpił błąd. Spróbuj ponownie.'
      },
      success: 'Twoja wiadomość została wysłana!'
    }
  };

  const t = translations[language];
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

<<<<<<< HEAD
    if (!formData.name || !formData.email || !formData.message) {
=======
    // Validate form
    if (!formData.name  !formData.email  !formData.message) {
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
      setStatus({ type: 'error', message: t.errors.required });
      return;
    }

<<<<<<< HEAD
=======
    // Email validation
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: t.errors.email });
      return;
    }

<<<<<<< HEAD
    setStatus({ type: 'loading', message: t.form.sending });

    setTimeout(() => {
      setStatus({ type: 'success', message: t.errors.success });
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 1500);
  };

  const contactList = [
    { icon: Mail, label: t.info.email, text: 'info@karakalpakvoice.org', href: 'mailto:info@karakalpakvoice.org' },
    { icon: Phone, label: t.info.phone, text: '+48 600 687 894', href: 'tel:+48600687894' },
    { icon: Globe, label: t.info.site, text: 'www.karakalpakvoice.org', href: 'https://karakalpakvoice.org' },
    { icon: MapPin, label: 'Europe', text: t.info.address1, href: '#' },
    { icon: MapPin, label: 'Asia', text: t.info.address2, href: '#' }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300 pt-20 pb-20">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* HEADER */}
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 dark:text-white mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
=======
    setStatus({ type: 'loading', message: t.sending });

    // Simulate API call
    setTimeout(() => {
      setStatus({ type: 'success', message: t.success });
      setFormData({ name: '', email: '', message: '' });
    }, 1500);
  };

  const contactInfo = [
    { icon: Mail, text: 'info@karakalpakvoice.org', href: 'mailto:info@karakalpakvoice.org' },
    { icon: Phone, text: '+48 600 687 894', href: 'tel:+48600687894' },
    { icon: MapPin, text: t.address, href: '#' },
    { icon: Globe, text: 'www.karakalpakvoice.org', href: 'https://karakalpakvoice.org' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Language Selector */}
      <div className="fixed top-6 right-6 z-50 flex gap-2">
        {[
          { code: 'ru', label: 'РУС' },
          { code: 'kk', label: 'ҚҚ' },
          { code: 'en', label: 'ENG' },
          { code: 'pl', label: 'POL' }
        ].map(lang => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1.5

roun

ded-lg text-sm font-medium transition-all ${
              language === lang.code
                ? 'bg-indigo-600 text-white shadow-lg'
                : 'bg-white/80 text-gray-700 hover:bg-white'
            }`}
          >
            {lang.label}
          </button>
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-[fadeIn_0.6s_ease-out]">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
            {t.subtitle}
          </p>
        </div>

<<<<<<< HEAD
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* LEFT: FORM */}
          <div className="bg-gray-50 dark:bg-gray-900/50 rounded-3xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 animate-slide-left">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">{t.form.name}</label>
                  <div className="relative">
                    <User className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      placeholder={t.form.name}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">{t.form.email}</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-3.5 text-gray-400" size={20} />
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                      placeholder={t.form.email}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">{t.form.subject}</label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none"
                  placeholder={t.form.subject}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-600 dark:text-gray-400 ml-1">{t.form.message}</label>
=======
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Card */}
          <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 animate-[slideInLeft_0.8s_ease-out]">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder={t.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none"
                  placeholder={t.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.message}
                </label>
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
<<<<<<< HEAD
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-black text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 transition-all outline-none resize-none"
                  placeholder={t.form.message}
=======
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                  placeholder={t.message}
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
                />
              </div>

              {status.message && (
<<<<<<< HEAD
                <div className={`p-4 rounded-xl text-center font-medium ${
                  status.type === 'error' ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400' :
                  status.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                  'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
=======
                <div className={`p-4 rounded-xl ${
                  status.type === 'error' ? 'bg-red-50 text-red-700' :
                  status.type === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
                }`}>
                  {status.message}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status.type === 'loading'}
<<<<<<< HEAD
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-4 rounded-xl font-bold shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
                {status.type === 'loading' ? t.form.sending : t.form.btn}
              </button>
            </form>
          </div>

          {/* RIGHT: INFO CARDS */}
          <div className="space-y-6 animate-slide-right">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 pl-4 border-l-4 border-blue-500">
              {t.info.title}
            </h2>
            
            <div className="grid gap-6">
              {contactList.map((item, index) => {
                const Icon = item.icon;
                return (
                  <a
                    key={index}
                    href={item.href}
                    className="flex items-center gap-6 p-6 rounded-2xl bg-white dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-xl hover:border-blue-500 dark:hover:border-blue-500 transition-all group"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-300">
                      <Icon className="w-6 h-6 text-blue-600 dark:text-blue-400 group-hover:text-white" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                        {item.label}
                      </p>
                      <p className="text-lg md:text-xl font-medium text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {item.text}
                      </p>
                    </div>
                  </a>
                );
              })}
=======
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {status.type === 'loading' ? t.sending : t.send}
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-6 animate-[slideInRight_0.8s_ease-out]">
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {t.info}
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => (
                  <a

key={index}
                    href={item.href}
                    className="flex items-center gap-4 p-4 rounded-xl hover:bg-indigo-50 transition-all group"
                  >
                    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center group-hover:bg-indigo-600 group-hover:scale-110 transition-all">
                      <item.icon className="w-6 h-6 text-indigo-600 group-hover:text-white" />
                    </div>
                    <span className="text-gray-700 group-hover:text-indigo-600 font-medium">
                      {item.text}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-white/70 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-white/20 h-64 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <p className="text-gray-600 font-medium">{t.address}</p>
                <p className="text-sm text-gray-500 mt-2">+48 600 687 894</p>
              </div>
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
            </div>
          </div>
        </div>
      </div>

      <style>{`
<<<<<<< HEAD
        .animate-fade-in { animation: fadeIn 0.8s ease-out; }
        .animate-slide-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-right { animation: slideInRight 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}
=======
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes slideInRight {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
      }
>>>>>>> ada8ad33363af76bb9bc1b46ad8fc671bbe1487d
