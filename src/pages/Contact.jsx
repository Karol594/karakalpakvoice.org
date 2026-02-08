import React, { useState, useEffect } from 'react';
import { Send, Mail, Phone, MapPin, Globe } from 'lucide-react';

export default function Contact() {
  // 1. Глобал тилди бақлаў (Home.jsx-тегидей система)
  const [language, setLanguage] = useState('ru');

  useEffect(() => {
    // Басқа беттен өткенде экранды жоқары шығарыў
    window.scrollTo({ top: 0, behavior: "smooth" });

    // Глобал тил өзгеру оқиғасын тыңлаў
    const handleLangChange = (e) => {
      if (e.detail?.lang) setLanguage(e.detail.lang.toLowerCase());
    };
    window.addEventListener("languageChange", handleLangChange);
    return () => window.removeEventListener("languageChange", handleLangChange);
  }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState({ type: '', message: '' });

  const translations = {
    ru: {
      title: 'Свяжитесь с нами',
      subtitle: 'Отправьте свои вопросы и предложения',
      name: 'Ваше имя',
      email: 'Email адрес',
      message: 'Сообщение',
      send: 'Отправить',
      sending: 'Отправка...',
      info: 'Контактная информация',
      address: 'Варшава, Польша',
      errors: {
        required: 'Заполните все поля',
        email: 'Неверный формат email',
        failed: 'Произошла ошибка. Попробуйте снова.'
      },
      success: 'Ваше сообщение отправлено!'
    },
    kk: {
      title: 'Биз бенен байланысыў',
      subtitle: 'Сораўларыңызды ҳәм усынысларыңызды жибериң',
      name: 'Аты-жөниңиз',
      email: 'Email поштаңыз',
      message: 'Хабарлама',
      send: 'Жибериў',
      sending: 'Жиберилип атыр...',
      info: 'Байланыс мағлыўматы',
      address: 'Варшава, Польша',
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
      address: 'Warsaw, Poland',
      errors: {
        required: 'Please fill all fields',
        email: 'Invalid email format',
        failed: 'An error occurred. Please try again.'
      },
      success: 'Your message has been sent!'
    },
    pl: {
      title: 'Skontaktuj się z nami',
      subtitle: 'Wyślij nam swoje pytania i sugestie',
      name: 'Twoje imię',
      email: 'Adres email',
      message: 'Wiadomość',
      send: 'Wyślij',
      sending: 'Wysyłanie...',
      info: 'Informacje kontaktowe',
      address: 'Warszawa, Polska',
      errors: {
        required: 'Wypełnij wszystkie pola',
        email: 'Nieprawidłowy format email',
        failed: 'Wystąpił błąd. Spróbuj ponownie.'
      },
      success: 'Twoja wiadomość została wysłana!'
    }
  };

  // Тил табылмаса RU-ға қайтыў
  const t = translations[language] || translations.ru;

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: t.errors.required });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: t.errors.email });
      return;
    }

    setStatus({ type: 'loading', message: t.sending });

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
    /* 2. Қараңғы режим қосылды: dark:bg-black */
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      
      {/* 3. Артықша тил түймелері (қызыл сызық) алып тасталды */}

      <div className="max-w-7xl mx-auto px-4 py-32">
        <div className="text-center mb-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            {t.title}
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Форма блогы */}
          <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 animate-slide-left">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.name}
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder={t.name}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.email}
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none"
                  placeholder={t.email}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  {t.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 transition-all outline-none resize-none"
                  placeholder={t.message}
                />
              </div>

              {status.message && (
                <div className={`p-4 rounded-xl ${
                  status.type === 'error' ? 'bg-red-50 dark:bg-red-900/20 text-red-700' :
                  status.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 text-green-700' :
                  'bg-blue-50 dark:bg-blue-900/20 text-blue-700'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status.type === 'loading'}
                className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
                {status.type === 'loading' ? t.sending : t.send}
              </button>
            </div>
          </div>

          {/* Информация блогы */}
          <div className="space-y-6 animate-slide-right">
            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-800">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                {t.info}
              </h2>
              <div className="space-y-4">
                {contactInfo.map((item, index) => {
                  const IconComponent = item.icon;
                  return (
                    <a
                      key={index}
                      href={item.href}
                      className="flex items-center gap-4 p-4 rounded-xl hover:bg-white dark:hover:bg-gray-800 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center group-hover:bg-indigo-600 transition-all">
                        <IconComponent className="w-6 h-6 text-indigo-600 dark:text-indigo-400 group-hover:text-white" />
                      </div>
                      <span className="text-gray-700 dark:text-gray-300 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 font-medium">
                        {item.text}
                      </span>
                    </a>
                  );
                })}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-900 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-gray-800 h-64 flex items-center justify-center text-center">
              <div>
                <MapPin className="w-16 h-16 text-indigo-400 mx-auto mb-4" />
                <p className="text-gray-900 dark:text-white font-medium">{t.address}</p>
                <p className="text-sm text-gray-500 mt-2">+48 600 687 894</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .animate-fade-in { animation: fadeIn 0.6s ease-out; }
        .animate-slide-left { animation: slideInLeft 0.8s ease-out; }
        .animate-slide-right { animation: slideInRight 0.8s ease-out; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(-20px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes slideInLeft { from { opacity: 0; transform: translateX(-50px); } to { opacity: 1; transform: translateX(0); } }
        @keyframes slideInRight { from { opacity: 0; transform: translateX(50px); } to { opacity: 1; transform: translateX(0); } }
      `}</style>
    </div>
  );
}