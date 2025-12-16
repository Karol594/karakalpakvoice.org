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

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Validate form
    if (!formData.name  !formData.email  !formData.message) {
      setStatus({ type: 'error', message: t.errors.required });
      return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setStatus({ type: 'error', message: t.errors.email });
      return;
    }

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
            {t.subtitle}
          </p>
        </div>

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
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows="6"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all outline-none resize-none"
                  placeholder={t.message}
                />
              </div>

              {status.message && (
                <div className={`p-4 rounded-xl ${
                  status.type === 'error' ? 'bg-red-50 text-red-700' :
                  status.type === 'success' ? 'bg-green-50 text-green-700' :
                  'bg-blue-50 text-blue-700'
                }`}>
                  {status.message}
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={status.type === 'loading'}
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
            </div>
          </div>
        </div>
      </div>

      <style>{`
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
