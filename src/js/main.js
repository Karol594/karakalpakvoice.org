// 🚀 KarakalpakVoice.org - Main JavaScript

// Языковая система
const languages = {
    ru: {
        title: "Каракалпакский Голос",
        subtitle: "Независимая медиа платформа Каракалпакстана",
        status: "Сайт в разработке",
        coming: "Скоро полная версия!"
    },
    kaa: {
        title: "Қарақалпақ Даўысы", 
        subtitle: "Ғәрезсиз Қарақалпақ мәлимлеме платформасы",
        status: "Сайт қурылыс басқышында",
        coming: "Жақында толық нусқасы шығады!"
    },
    en: {
        title: "Karakalpak Voice",
        subtitle: "Independent Karakalpak Media Platform", 
        status: "Website under construction",
        coming: "Full version coming soon!"
    },
    pl: {
        title: "Głos Karakałpacki",
        subtitle: "Niezależna platforma medialna Karakałpaków",
        status: "Strona w budowie", 
        coming: "Pełna wersja wkrótce!"
    }
};

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    console.log('🎤 KarakalpakVoice.org загружен');
    
    // Автоопределение языка (по умолчанию русский)
    const defaultLang = 'ru';
    changeLanguage(defaultLang);
});

// Функция смены языка
function changeLanguage(lang) {
    const text = languages[lang];
    if (text) {
        document.title = text.title + ' | KarakalpakVoice.org';
        console.log(`Язык изменен на: ${lang}`);
    }
}
