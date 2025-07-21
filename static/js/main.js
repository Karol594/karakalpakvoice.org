// Тил аўдармасы объекти
const translations = {
    kk: {
        'nav-home': 'Бас бет',
        'nav-sovereignty': 'Суверенитет',
        'nav-news': 'Жаңалықлар',
        'nav-politics': 'Сиясат',
        'nav-history': 'Тарийх',
        'nav-sport': 'Спорт',
        'nav-geography': 'География',
        'nav-traditions': 'Дәстүр',
        'nav-about': 'Биз туўралы',
        'sovereignty-title': 'Қарақалпақстан Республикасы',
        'sovereignty-subtitle': 'Өз Конституциясы, Өз Парламенти, Өз Ҳүкимети',
        'declaration-date': '1990 жылы 14 декабрь',
        'declaration-text': 'Қарақалпақстан Республикасы өзиниң Суверенитети ҳаққындағы Декларациясын қабыл етти ҳәм усы күннен баслап Қарақалпақстан барлық басқа мәмлекетлер менен тең ҳуқықлы!',
        'support-title': 'Жойбарды қоллап-қуўатлаў',
        'support-text': 'Сизиң қоллап-қуўатлаўыңыз бизге Қарақалпақстанның даўысын дүньяға жеткериўге жәрдем береди!',
        'paysend-desc': 'Орта Азия ушын',
        'kaspi-desc': 'Қазақстан ушын',
        'kaspi-gold-desc': 'Премиум карта',
        'news-title': 'Жаңалықлар',
        'news-latest': 'Соңғы жаңалықлар',
        'news-latest-desc': 'Қарақалпақстандағы ең соңғы ўақыялар',
        'news-economy': 'Экономика',
        'news-economy-desc': 'Экономикалық жаңалықлар ҳәм экспертизалар',
        'news-society': 'Жәмийет',
        'news-society-desc': 'Жәмийетлик турмыс ҳәм мәденият',
        'politics-title': 'Сиясат',
        'politics-government': 'Ҳүкимет',
        'politics-government-desc': 'Ҳүкиметтиң искерлиги ҳәм қарарлары',
        'politics-parliament': 'Парламент',
        'politics-parliament-desc': 'Нызам шығарыў процеси ҳәм дебатлар',
        'politics-democracy': 'Демократия',
        'politics-democracy-desc': 'Халықтың ҳуқықлары ҳәм еркинликлери',
        'history-title': 'Тарийх',
        'history-ancient': 'Әййемги тарийх',
        'history-ancient-desc': 'Қарақалпақ халқының пайда болыўы',
        'history-medieval': 'Орта әсирлер',
        'history-medieval-desc': 'Хорезм мәмлекети дәўири',
        'history-modern': 'Ҳәзирги заман',
        'history-modern-desc': 'Қарақалпақстанның ҳәзирги тарийхы',
        'sport-title': 'Спорт',
        'sport-football': 'Футбол',
        'sport-football-desc': 'Қарақалпақстан футболы',
        'sport-wrestling': 'Гүрес',
        'sport-wrestling-desc': 'Дәстүрий гүрес түрлери',
        'sport-athletics': 'Жеңил атлетика',
        'sport-athletics-desc': 'Спортшылардың житискенликлери',
        'geography-title': 'География',
        'geography-physical': 'Физикалық география',
        'geography-physical-desc': 'Жер рельефи, климаты, өсимлик ҳәм ҳайўанат дүньясы',
        'geography-economic': 'Экономикалық география',
        'geography-economic-desc': 'Тәбийий ресурслар, экономикалық комплекслер',
        'geography-population': 'Халық географиясы',
        'geography-population-desc': 'Халықтың тарқалыўы, тығызлығы, қурамы',
        'traditions-title': 'Дәстүр',
        'traditions-holidays': 'Байрамлар',
        'traditions-holidays-desc': 'Миллий байрамлар ҳәм дәстүрлер',
        'traditions-clothing': 'Кийим үлгилери',
        'traditions-clothing-desc': 'Миллий кийимлер ҳәм зергерлик буйымлары',
        'traditions-cuisine': 'Ас-суў ислери',
        'traditions-cuisine-desc': 'Дәстүрий аўқатлар ҳәм таярлаў усыллары',
        'about-title': 'Биз туўралы',
        'about-voice': 'Қарақалпақ Даўысы',
        'about-description': 'Бул Қарақалпақстан халқына еркин мәлимлеме алыў ҳәм өз пикирлерин билдириў имканиятын беретуғын платформа болып есапланады.',
        'about-mission': 'Бизиң миссиямыз:',
        'about-mission-1': 'Қарақалпақ халқының даўысын дүньяға жеткизиў',
        'about-mission-2': 'Цензурасыз ҳәм обьектив мәлимлеме бериў',
        'about-mission-3': 'Мәдений мийрасты ҳәм тилди сақлаў',
        'about-mission-4': 'Халықтың ҳуқықларын қорғаў',
        'about-contact': 'Байланыс:',
        'about-editor': 'Бас редактор:',
        'about-address': 'Мәнзил:',
        'about-location': 'Варшава, Польша',
        'about-social': 'Социал тармақларда биз:',
        'footer-description': 'Қарақалпақстан халқының даўысы',
        'footer-sections': 'Бөлимлер',
        'footer-contact': 'Байланыс',
        'footer-support': 'Қоллаў',
        'footer-support-project': 'Жойбарды қоллап-қуўатлаў',
        'footer-volunteer': 'Волонтёр болыў',
        'footer-advertising': 'Реклама етиў',
        'footer-copyright': '© 2025 Қарақалпақ Voice. Барлық ҳуқықлар сақланған.',
        'donate-btn': 'Қоллаў'
    },
    ru: {
        // ... орыс тилиндеги аўдармалар ...
    },
    en: {
        // ... англичан тилиндеги аўдармалар ...
    },
    pl: {
        // ... поляк тилиндеги аўдармалар ...
    }
};

// Ағымдағы тил
let currentLang = 'kk';

// Тилди алмастырыў функциясы
function switchLanguage(lang) {
    currentLang = lang;
    
    // Барлық тил түймелеринен active класын алып таслаў.
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Ағымдағы тил түймесине active класын қосыў
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Барлық элементлерди аўдарыў
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (translations[lang] && translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
    
    // Тилди сақлаў
    localStorage.setItem('language', lang);
}

// Теманы алмастырыў
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        themeToggle.innerHTML = document.body.classList.contains('light-theme') ? '🌞' : '🌙';
    });
}

// Навигацияны сазлаў
function setupNavigation() {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Барлық актив силтемелерден актив класын алып таслаў
            document.querySelectorAll('.nav-link').forEach(lnk => {
                lnk.classList.remove('active');
            });
            
            // Ағымдағы силтемеге актив класын қосыў
            this.classList.add('active');
            
            // Бөлимге өтиў
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

// Төлем усылын таңлаў
function selectPaymentMethod(method) {
    document.querySelectorAll('.payment-card').forEach(card => {
        card.classList.remove('active');
    });
    event.currentTarget.classList.add('active');
    
    // reCAPTCHA көрсетиў
    const captchaContainer = document.getElementById('captchaContainer');
    if (captchaContainer) {
        captchaContainer.classList.add('show');
    }
    
    // Төлем мағлыўматларын көрсетиў
    let paymentInfo = '';
    switch(method) {
        case 'paysend':
            paymentInfo = 'Paysend ID: +998901234567\nКарта: 8600 1234 5678 9012';
            break;
        case 'kaspi':
            paymentInfo = 'Kaspi.kz номері: +77771234567\nКарта: 4400 4301 2345 6789';
            break;
        case 'kaspi_gold':
            paymentInfo = 'Kaspi Gold номері: +77771234567\nКарта: 5169 4901 2345 6789';
            break;
    }
    alert(`${method} төлем усылы таңланды!\n\n${paymentInfo}`);
}

// Қайырқомлық бөлимин көрсетиў
function showDonateSection() {
    const sovereigntySection = document.getElementById('sovereignty');
    if (sovereigntySection) {
        sovereigntySection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Жоқары көтериў
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Прокрутканы бақлаў
function handleScroll() {
    const scrollBtn = document.querySelector('.scroll-top-btn');
    if (scrollBtn) {
        if (window.scrollY > 500) {
            scrollBtn.classList.add('show');
        } else {
            scrollBtn.classList.remove('show');
        }
    }
}

// Документ жүкленгенде
document.addEventListener('DOMContentLoaded', () => {
    // Теманы жүклеў
    const savedTheme = localStorage.getItem('theme');
    const themeToggle = document.getElementById('themeToggle');
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
        if (themeToggle) themeToggle.innerHTML = '🌞';
    } else if (themeToggle) {
        themeToggle.innerHTML = '🌙';
    }
    
    // Тилди жүклеў
    const savedLang = localStorage.getItem('language') || 'kk';
    switchLanguage(savedLang);
    
    // Тил түймелерине event listener қосыў
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            switchLanguage(lang);
        });
    });
    
    // Навигацияны сазлаў
    setupNavigation();
    
    // Прокрутканы бақлаў
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Дәслепки күйди тексериў
    
    // Анимация кешиктириў
    const animatedElements = document.querySelectorAll('.animated');
    animatedElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Қоллаў түймеси
    const donateBtn = document.querySelector('.donate-btn');
    if (donateBtn) {
        donateBtn.addEventListener('click', showDonateSection);
    }
    
    // Жоғары көтериў түймеси
    const scrollTopBtn = document.querySelector('.scroll-top-btn');
    if (scrollTopBtn) {
        scrollTopBtn.addEventListener('click', scrollToTop);
    }
    
    // Төлем карточкалары
    document.querySelectorAll('.payment-card').forEach(card => {
        const method = card.querySelector('h3').textContent.toLowerCase();
        card.addEventListener('click', () => selectPaymentMethod(method));
    });
});
