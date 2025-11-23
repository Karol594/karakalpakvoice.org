import React from 'react';
import { Facebook, Instagram, Twitter, Youtube, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const TikTokIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
  </svg>
);

function Footer() {
  const { t } = useTranslation();

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://www.facebook.com/share/1FifdzG23b/' },
    { name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/karakalpakvoice_org/profilecard/?igsh=MTV6eWhmdDZqYnltaQ==' },
    { name: 'TikTok', icon: TikTokIcon, url: 'https://www.tiktok.com/@karakalpakvoice' },
    { name: 'Twitter', icon: Twitter, url: 'https://x.com/Karakalpak45997' },
    { name: 'Telegram', icon: Send, url: 'https://t.me/kkvoice_org' },
    { name: 'YouTube', icon: Youtube, url: 'https://youtube.com/@karakalpakvoice_org' },
  ];

  return (
    <footer className="bg-white dark:bg-gray-900 border-t border-gray-100 dark:border-gray-800 mt-16">
      <div className="container mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold">KarakalpakVoice</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('footer.description')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Байланыс</h4>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              <a href="mailto:info@karakalpakvoice.org" className="hover:underline">info@karakalpakvoice.org</a>
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{t('footer.location')}</p>
          </div>

          <div>
            <h4 className="font-semibold mb-2">Биздин әлеуметтік</h4>
            <div className="flex gap-3 mt-2">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="p-2 rounded-full bg-gray-100 dark:bg-gray-800 hover:scale-105 transition">
                    <Icon size={18} />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-gray-800 pt-6">
          © {new Date().getFullYear()} KarakalpakVoice. {t('footer.copyright')}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
