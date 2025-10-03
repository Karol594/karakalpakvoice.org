import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { 
      name: 'Facebook', 
      icon: Facebook, 
      url: 'https://www.facebook.com/share/1FifdzG23b/',
      color: 'hover:bg-blue-600'
    },
    { 
      name: 'Instagram', 
      icon: Instagram, 
      url: 'https://www.instagram.com/karakalpakvoice_org/profilecard/?igsh=MTV6eWhmdDZqYnltaQ==',
      color: 'hover:bg-pink-600'
    },
    { 
      name: 'TikTok', 
      icon: '🎵', // TikTok иконка емес, emoji пайдаланамыз
      url: 'https://www.tiktok.com/@karakalpakvoice?_t=ZN-8xpLcNapoAQ&_r=1',
      color: 'hover:bg-black',
      isEmoji: true
    },
    { 
      name: 'Twitter', 
      icon: Twitter, 
      url: 'https://x.com/Karakalpak45997?t=Ms3EuR6t43lYOfZmU5w5MQ&s=09',
      color: 'hover:bg-sky-500'
    },
    { 
      name: 'Telegram', 
      icon: Send, 
      url: 'https://t.me/kkvoice_org',
      color: 'hover:bg-blue-500'
    },
    { 
      name: 'YouTube', 
      icon: Youtube, 
      url: 'https://youtube.com/@karakalpakvoice_org?si=gjtxaO9MdDLITb1W',
      color: 'hover:bg-red-600'
    }
  ];

  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="container mx-auto px-4 py-8">
        {/* Logo ҳәм қысқаша мағлыўмат */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Karakalpakvoice</h2>
          <p className="text-xl mb-4">Қарақалпақ даўысы</p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Қарақалпақ халқының бай мәдений мийрасын сақлаў, раўажландырыў ҳәм дүнья жүзине танытыўға арналған платформа.
          </p>
        </div>

        {/* Социал тармақлар */}
        <div className="flex justify-center flex-wrap gap-4 mb-6">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-3 bg-gray-800 ${social.color} rounded-full transition transform hover:scale-110`}
                aria-label={social.name}
                title={social.name}
              >
                {social.isEmoji ? (
                  <span className="text-2xl">{Icon}</span>
                ) : (
                  <Icon size={24} />
                )}
              </a>
            );
          })}
        </div>

        {/* Байланыс мағлыўматы */}
        <div className="text-center text-gray-400 mb-4 space-y-1">
          <p className="hover:text-white transition">
            <a href="mailto:info@karakalpakvoice.org">info@karakalpakvoice.org</a>
          </p>
          <p>Варшава, Польша</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          <p>© 2025 Karakalpakvoice.org. Барлық ҳүқықлар қорғалған.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
