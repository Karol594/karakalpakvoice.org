import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';

export default function Contact() {
  const [lang, setLang] = useState(localStorage.getItem('lang') || 'KK');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [captcha, setCaptcha] = useState({ num1: 0, num2: 0, answer: '' });
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    generateCaptcha();
    const handleStorageChange = () => setLang(localStorage.getItem('lang') || 'KK');
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const generateCaptcha = () => {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    setCaptcha({ num1, num2, answer: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ type: '', message: '' });

    // Validate captcha
    if (parseInt(captcha.answer) !== captcha.num1 + captcha.num2) {
      setStatus({ 
        type: 'error', 
        message: t.errors.captcha 
      });
      generateCaptcha();
      return;
    }

    // Validate form
    if (!formData.name || !formData.email || !formData.message) {
      setStatus({ type: 'error', message: t.errors.required });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setStatus({ type: 'success', message: t.success });
      setFormData({ name: '', email: '', message: '' });
      generateCaptcha();
      setIsSubmitting(false);
    }, 1500);
  };

  const t = {
    KK: {
      title: "Байланысыў",
      subtitle: "Биз бенен байланысың. Сизиң пикириңиз биз үшын әҳимийетли.",
      form: { name: "Атыңыз", email: "Email", message: "Хабар", send: "Жибериў" },
      captcha: { label: "Робот емес екениңизди дәлиллең", placeholder: "Жуўабы" },
      info: { email: "Email мәнзил", phone: "Телефон", address: "Мәнзил" },
      success: "Хабарыңыз жиберилди! Тез арада жуўап беремиз.",
      errors: { captcha: "Қәте жуўап. Қайта ҳәрекет қылың.", required: "Барлық майданларды толтырың!" }
    },
    RU: {
      title: "Контакты",
      subtitle: "Свяжитесь с нами. Ваше мнение важно для нас.",
      form: { name: "Ваше имя", email: "Email", message: "Сообщение", send: "Отправить" },
      captcha: { label: "Докажите, что вы не робот", placeholder: "Ответ" },
      info: { email: "Email адрес", phone: "Телефон", address: "Адрес" },
      success: "Ваше сообщение отправлено! Мы ответим в ближайшее время.",
      errors: { captcha: "Неверный ответ. Попробуйте снова.", required: "Заполните все поля!" }
    },
    EN: {
      title: "Contact",
      subtitle: "Get in touch with us. Your opinion matters to us.",
      form: { name: "Your name", email: "Email", message: "Message", send: "Send" },
      captcha: { label: "Prove you're not a robot", placeholder: "Answer" },
      info: { email: "Email address", phone: "Phone", address: "Address" },
      success: "Your message has been sent! We'll respond soon.",
      errors: { captcha: "Wrong answer. Try again.", required: "Fill in all fields!" }
    },
    PL: {
      title: "Kontakt",
      subtitle: "Skontaktuj się z nami. Twoja opinia jest dla nas ważna.",
      form: { name: "Twoje imię", email: "Email", message: "Wiadomość", send: "Wyślij" },
      captcha: { label: "Udowodnij, że nie jesteś robotem", placeholder: "Odpowiedź" },
      info: { email: "Adres email", phone: "Telefon", address: "Adres" },
      success: "Twoja wiadomość została wysłana! Odpowiemy wkrótce.",
      errors: { captcha: "Zła odpowiedź. Spróbuj ponownie.", required: "Wypełnij wszystkie pola!" }
    }
  }[lang];

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-6">
        
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          
          {/* FORM */}
          <div className="p-8 bg-gray-50 dark:bg-gray-900 rounded-3xl border border-gray-200 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div>
                <label className="block text-sm font-semibold mb-2">{t.form.name}</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{t.form.email}</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">{t.form.message}</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  rows={5}
                  className="w-full px-4 py-3 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-600 resize-none"
                />
              </div>

              {/* CAPTCHA */}
              <div className="p-6 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-2xl">
                <label className="block text-sm font-semibold mb-3">{t.captcha.label}</label>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-3 text-2xl font-bold">
                    <span>{captcha.num1}</span>
                    <span>+</span>
                    <span>{captcha.num2}</span>
                    <span>=</span>
                  </div>
                  <input
                    type="number"
                    value={captcha.answer}
                    onChange={(e) => setCaptcha({...captcha, answer: e.target.value})}
                    placeholder={t.captcha.placeholder}
                    className="w-20 px-3 py-2 bg-white dark:bg-black border border-gray-300 dark:border-gray-700 rounded-lg text-center font-bold"
                  />
                  <button
                    type="button"
                    onClick={generateCaptcha}
                    className="p-2 hover:bg-white/50 dark:hover:bg-black/20 rounded-lg transition"
                  >
                    <RefreshCw size={20} />
                  </button>
                </div>
              </div>

              {/* STATUS */}
              {status.message && (
                <div className={`flex items-center gap-3 p-4 rounded-xl ${
                  status.type === 'success' 
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200' 
                    : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200'
                }`}>
                  {status.type === 'success' ? <CheckCircle size={20} /> : <AlertCircle size={20} />}
                  <p className="text-sm font-medium">{status.message}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl font-semibold hover:from-purple-700 hover:to-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                {isSubmitting ? (
                  <RefreshCw size={20} className="animate-spin" />
                ) : (
                  <>
                    <Send size={20} />
                    {t.form.send}
                  </>
                )}
              </button>
            </form>
          </div>

          {/* INFO */}
          <div className="space-y-6">
            <div className="p-8 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 rounded-3xl border border-gray-200 dark:border-gray-800">
              <Mail size={32} className="text-purple-600 dark:text-purple-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.info.email}</h3>
              <a href="mailto:info@karakalpakvoice.org" className="text-lg text-purple-600 dark:text-purple-400 hover:underline">
                info@karakalpakvoice.org
              </a>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950/20 dark:to-cyan-950/20 rounded-3xl border border-gray-200 dark:border-gray-800">
              <Phone size={32} className="text-blue-600 dark:text-blue-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.info.phone}</h3>
              <a href="tel:+48123456789" className="text-lg text-blue-600 dark:text-blue-400 hover:underline">
                +48 123 456 789
              </a>
            </div>

            <div className="p-8 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20 rounded-3xl border border-gray-200 dark:border-gray-800">
              <MapPin size={32} className="text-green-600 dark:text-green-400 mb-4" />
              <h3 className="text-xl font-bold mb-2">{t.info.address}</h3>
              <p className="text-lg">Варшава, Польша</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
