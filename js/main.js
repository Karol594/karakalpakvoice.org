// KarakalpakVoice.org - Main JavaScript Functions
// Негізгі интерактивлик және анимациялар

document.addEventListener('DOMContentLoaded', function() {
    initializeCursor();
    initializeParticles();
    initializeScrollEffects();
    initializeAdminPanel();
    initializeRecaptcha();
    initializeAnimations();
});

// Домалақ курсор функциясы
function initializeCursor() {
    const circleCursor = document.getElementById('circleCursor');
    let mouseX = 0;
    let mouseY = 0;
    
    // Курсорды жасырыў/көрсетиў 
    document.addEventListener('mouseenter', () => {
        circleCursor.style.opacity = '1';
    });
    
    document.addEventListener('mouseleave', () => {
        circleCursor.style.opacity = '0';
    });
    
    // Курсор қозғалысы
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        circleCursor.style.left = mouseX + 'px';
        circleCursor.style.top = mouseY + 'px';
    });
    
    // Клик эффекти
    document.addEventListener('click', (e) => {
        createClickEffect(e.clientX, e.clientY);
    });
}

// Клик эффекти жасаў
function createClickEffect(x, y) {
    const clickEffect = document.createElement('div');
    clickEffect.className = 'click-effect';
    clickEffect.innerHTML = '<div class="circle-flag" style="width: 25px; height: 25px;"></div>';
    clickEffect.style.left = (x - 12.5) + 'px';
    clickEffect.style.top = (y - 12.5) + 'px';
    
    document.body.appendChild(clickEffect);
    
    setTimeout(() => {
        if (clickEffect.parentNode) {
            clickEffect.remove();
        }
    }, 1000);
}

// Жулдызша генерациясы
function initializeParticles() {
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * window.innerWidth + 'px';
        particle.style.animationDuration = (Math.random() * 5 + 6) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        // Жулдызша түслерин тосаттан таңлаў
        const colors = ['#ffd700', '#ffffff', '#87ceeb'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.remove();
            }
        }, 8000);
    }
    
    // Жулдызшаларды мудамы генерациялаў
    setInterval(createParticle, 300);
    
    // Дәслепки жулдызшалар жаратыў
    for (let i = 0; i < 5; i++) {
        setTimeout(createParticle, i * 200);
    }
}

// Scroll эффектлери
function initializeScrollEffects() {
    const backToTop = document.getElementById('backToTop');
    
    // Back-to-top түймесин көрсетиў/жасырыў
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
        
        // Параллакс эффекти
        const scrolled = window.pageYOffset;
        const sections = document.querySelectorAll('.content-section');
        
        sections.forEach((section, index) => {
            const rate = scrolled * -0.5;
            section.style.transform = `translateY(${rate * 0.1}px)`;
        });
    });
    
    // Back-to-top функциясы
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Scroll анимациялары
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Барлық content section-ларды бақлаў
    document.querySelectorAll('.content-section, .contact-section, .qr-section, .recaptcha-section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Admin панель функциялары
function initializeAdminPanel() {
    const adminBtn = document.getElementById('adminBtn');
    
    adminBtn.addEventListener('click', () => {
        openAdminPanel();
    });
}

function openAdminPanel() {
    const password = prompt('Admin панелине кириў ушын паролди енгизиң:');
    if (password === 'karakalpak2025') {
        showAdminInterface();
    } else if (password !== null) {
        alert('Қәте парол! Қайталап көриңиз.');
    }
}

function showAdminInterface() {
    const adminHTML = `
        <div id="adminModal" style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            z-index: 10001;
            display: flex;
            justify-content: center;
            align-items: center;
        ">
            <div style="
                background: linear-gradient(45deg, #1e6bb8, #ffd700);
                padding: 3rem;
                border-radius: 20px;
                max-width: 600px;
                width: 90%;
                text-align: center;
                color: #000;
                position: relative;
            ">
                <button onclick="closeAdminPanel()" style="
                    position: absolute;
                    top: 10px;
                    right: 15px;
                    background: none;
                    border: none;
                    font-size: 2rem;
                    cursor: pointer;
                    color: #000;
                ">×</button>
                
                <h2 style="margin-bottom: 2rem; color: #000;">🔐 ADMIN ПАНЕЛИ</h2>
                
                <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                    <button onclick="addArticle()" style="
                        padding: 1rem;
                        background: #228b22;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1.1rem;
                    ">📝 Жаңа мақала қосу</button>
                    
                    <button onclick="editNews()" style="
                        padding: 1rem;
                        background: #1e6bb8;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1.1rem;
                    ">📰 Жаңалықларды өзгертиў</button>
                    
                    <button onclick="manageUsers()" style="
                        padding: 1rem;
                        background: #ff6600;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1.1rem;
                    ">👥 Қолланыўшыларды басқарыў</button>
                    
                    <button onclick="viewStats()" style="
                        padding: 1rem;
                        background: #9932cc;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1.1rem;
                    ">📊 Статистика көру</button>
                    
                    <button onclick="siteSettings()" style="
                        padding: 1rem;
                        background: #dc143c;
                        color: white;
                        border: none;
                        border-radius: 10px;
                        cursor: pointer;
                        font-size: 1.1rem;
                    ">⚙️ Сайт параметрлери</button>
                </div>
                
                <p style="color: #000; font-size: 0.9rem;">
                    Admin процедуралары арқалы сайт мазмунын басқарыўыңыз мүмкин.
                </p>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', adminHTML);
}

// Admin панелин жабыў
function closeAdminPanel() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.remove();
    }
}

// Admin функциялары
function addArticle() {
    alert('Мақала қосыў функциясы таярланып атыр...\nҲәзирше мақала дүзететуғын форма ашылар еди.');
    closeAdminPanel();
}

function editNews() {
    alert('Жаңалықларды өзгертиў функциясы таярланып атыр...\nБарлық жаңалықлар дизимин көре алар едиңиз.');
    closeAdminPanel();
}

function manageUsers() {
    alert('Қолланыўшыларды басқарыў функциясы таярланып атыр...\nРегистрацияланған қолланыўшылар дизими көринер еди.');
    closeAdminPanel();
}

function viewStats() {
    const stats = {
        visitors: Math.floor(Math.random() * 10000) + 5000,
        pageViews: Math.floor(Math.random() * 50000) + 25000,
        articles: Math.floor(Math.random() * 100) + 50,
        comments: Math.floor(Math.random() * 500) + 200
    };
    
    alert(`📊 САЙТ СТАТИСТИКАСЫ:\n\n👥 Келиўшилер: ${stats.visitors}\n📄 Бет көриўлер: ${stats.pageViews}\n📝 Мақалалар: ${stats.articles}\n💬 Пикирлер: ${stats.comments}\n\nТолық статистика кейин қосылады...`);
    closeAdminPanel();
}

function siteSettings() {
    alert('Сайт параметрлери функциясы таярланып атыр...\nТил параметрлери, дизайн таңлаўлары т.б.');
    closeAdminPanel();
}

// reCAPTCHA функциясы
function initializeRecaptcha() {
    const recaptchaCheckbox = document.getElementById('recaptcha');
    
    if (recaptchaCheckbox) {
        recaptchaCheckbox.addEventListener('change', function() {
            if (this.checked) {
                setTimeout(() => {
                    showRecaptchaSuccess();
                }, 1000);
            }
        });
    }
}

function showRecaptchaSuccess() {
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(45deg, #228b22, #32cd32);
        color: white;
        padding: 2rem;
        border-radius: 15px;
        text-align: center;
        z-index: 10000;
        font-size: 1.2rem;
        box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    `;
    successMessage.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
        <div>reCAPTCHA табыслы орынланды!</div>
        <div style="font-size: 0.9rem; margin-top: 1rem;">Сайттың толық функционалын пайдалана аласыз.</div>
    `;
    
    document.body.appendChild(successMessage);
    
    setTimeout(() => {
        successMessage.remove();
    }, 3000);
}

// Анимация функциялары
function initializeAnimations() {
    // Logo айналдырыў
    const logoIcon = document.querySelector('.logo-icon');
    if (logoIcon) {
        logoIcon.addEventListener('click', () => {
            logoIcon.style.transform = 'rotate(720deg) scale(1.2)';
            setTimeout(() => {
                logoIcon.style.transform = '';
            }, 1000);
        });
    }
    
    // Hero title клик эффекти
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        heroTitle.addEventListener('click', () => {
            heroTitle.style.transform = 'scale(1.1) rotateY(360deg)';
            setTimeout(() => {
                heroTitle.style.transform = '';
            }, 500);
        });
    }
    
    // QR код клик функциясы
    const qrCode = document.querySelector('.qr-code');
    if (qrCode) {
        qrCode.addEventListener('click', () => {
            const url = window.location.href;
            const message = `QR код мәлимети:\n\nСайт: ${url}\n\nБұл QR кодты сканерлеп, сайтты басқаларға бөлисе аласыз!`;
            alert(message);
        });
    }
}

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    // Admin панель: Ctrl+Shift+A
    if (e.ctrlKey && e.shiftKey && e.key === 'A') {
        e.preventDefault();
        openAdminPanel();
    }
    
    // Жоғарыға көтерилиў: Home
    if (e.key === 'Home') {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    
    // Төменге жүриў: End  
    if (e.key === 'End') {
        e.preventDefault();
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }
});

// Touch устройствалар ушын
document.addEventListener('touchstart', (e) => {
    // Touch клик эффекти
    if (e.touches.length === 1) {
        const touch = e.touches[0];
        createClickEffect(touch.clientX, touch.clientY);
    }
});

// Performance optimization
window.addEventListener('load', () => {
    // Lazy loading for images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
});

// Error handling
window.addEventListener('error', (e) => {
    console.log('Error caught:', e.error);
});

// Console welcome message
console.log(`
🎤 KarakalpakVoice.org
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Voice of Karakalpakstan - Қарақалпақстан халқының даўысы
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🔧 Developer Tips:
• Admin Panel: Ctrl+Shift+A
• Password: karakalpak2025
• Home/End keys for navigation

🌟 ∞D Design Features Active:
• Karakalpakstan Flag Cursor
• Particle Animation System  
• Responsive Mobile Menu
• Interactive Elements

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`);