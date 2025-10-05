import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// TikTok SVG компоненті
const TikTokIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

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
      icon: TikTokIcon,
      url: 'https://www.tiktok.com/@karakalpakvoice?_t=ZN-8xpLcNapoAQ&_r=1',
      color: 'hover:bg-black'
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
        {/* Logo ҳәм мағлыўмат */}
        <div className="mb-8 text-center">
          <h2 className="text-2xl font-bold mb-2">Karakalpakvoice</h2>
          <p className="text-xl mb-4">{t('header.subtitle')}</p>
          <p className="text-gray-400 max-w-2xl mx-auto">
            {t('footer.description')}
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
                <Icon size={24} />
              </a>
            );
          })}
        </div>

        {/* Байланыс */}
        <div className="text-center text-gray-400 mb-4 space-y-1">
          <p className="hover:text-white transition">
            <a href="mailto:info@karakalpakvoice.org">{t('footer.email')}</a>
          </p>
          <p>{t('footer.location')}</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-gray-500 text-sm border-t border-gray-800 pt-4">
          <p>{t('footer.copyright')}</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
