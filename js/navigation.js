// KarakalpakVoice.org - Navigation Functions
// Мобиль меню және навигация функциялары

document.addEventListener('DOMContentLoaded', function() {
    initializeMobileMenu();
    initializeSmoothScrolling();
    initializeActiveNavigation();
});

// Мобиль меню функциялары
function initializeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    if (!menuToggle || !mobileNav) return;
    
    // Меню ашыў/жабыў
    menuToggle.addEventListener('click', function(e) {
        e.stopPropagation();
        toggleMobileMenu();
    });
    
    // Меню сыртына басқанда жабыў
    document.addEventListener('click', function(e) {
        if (mobileNav.classList.contains('active') && 
            !mobileNav.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            closeMobileMenu();
        }
    });
    
    // Escape түймеси менен жабыў
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    });
    
    // Меню элементлерине киргизилгенде жабыў
    const mobileNavLinks = mobileNav.querySelectorAll('a');
    mobileNavLinks.forEach(link => {
        link.addEventListener('click', function() {
            setTimeout(() => {
                closeMobileMenu();
            }, 300);
        });
    });
    
    // Touch жестлери
    let startY = 0;
    let currentY = 0;
    
    mobileNav.addEventListener('touchstart', function(e) {
        startY = e.touches[0].clientY;
    });
    
    mobileNav.addEventListener('touchmove', function(e) {
        currentY = e.touches[0].clientY;
        const deltaY = currentY - startY;
        
        // Жоқарыға swipe жасағанда меню жабыў
        if (deltaY < -50) {
            closeMobileMenu();
        }
    });
}

// Меню ашыў/жабыў функциясы
function toggleMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    menuToggle.classList.toggle('active');
    mobileNav.classList.toggle('active');
    
    // Body scroll блоклаў/ашыў
    if (mobileNav.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = '';
    }
}

// Меню жабыў
function closeMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    menuToggle.classList.remove('active');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}

// Меню ашыў
function openMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');
    
    menuToggle.classList.add('active');
    mobileNav.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Тегіс скролл функциясы
function initializeSmoothScrolling() {
    // Барлық anchor линктер ушын тегис скролл
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Актив навигация
function initializeActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');
    
    if (sections.length === 0 || navLinks.length === 0) return;
    
    // Scroll ўақыяны тыңлаў
    window.addEventListener('scroll', throttle(updateActiveNavigation, 100));
    
    function updateActiveNavigation() {
        const scrollPosition = window.scrollY + 200;
        
        let currentSection = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        // Актив класты жаңалаў
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }
}

// Throttle функциясы (performance үшін)
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Дебаунс функциясы
function debounce(func, delay) {
    let timeoutId;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(context, args), delay);
    }
}

// Бет навигациясы
function navigateToPage(page) {
    const baseUrl = window.location.origin + window.location.pathname.replace(/\/[^\/]*$/, '/');
    let targetUrl = '';
    
    switch(page) {
        case 'home':
            targetUrl = baseUrl + 'index.html';
            break;
        case 'sovereignty':
            targetUrl = baseUrl + 'pages/sovereignty.html';
            break;
        case 'news':
            targetUrl = baseUrl + 'pages/news.html';
            break;
        case 'politics':
            targetUrl = baseUrl + 'pages/politics.html';
            break;
        case 'history':
            targetUrl = baseUrl + 'pages/history.html';
            break;
        case 'sports':
            targetUrl = baseUrl + 'pages/sports.html';
            break;
        case 'geography':
            targetUrl = baseUrl + 'pages/geography.html';
            break;
        case 'traditions':
            targetUrl = baseUrl + 'pages/traditions.html';
            break;
        case 'religion':
            targetUrl = baseUrl + 'pages/religion.html';
            break;
        default:
            targetUrl = baseUrl + 'index.html';
    }
    
    // Бетке өтиў
    window.location.href = targetUrl;
}

// Keyboard навигациясы
document.addEventListener('keydown', function(e) {
    // M пернесімен меню ашу/жабу
    if (e.key === 'm' || e.key === 'M') {
        if (!e.ctrlKey && !e.altKey && !e.shiftKey) {
            const activeElement = document.activeElement;
            // Input ямаса textarea ишинде болмаса
            if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') {
                e.preventDefault();
                toggleMobileMenu();
            }
        }
    }
    
    // Arrow keys арқалы меню навигациясы
    const mobileNav = document.getElementById('mobileNav');
    if (mobileNav && mobileNav.classList.contains('active')) {
        const navLinks = mobileNav.querySelectorAll('a');
        const currentActive = mobileNav.querySelector('a:focus');
        let currentIndex = Array.from(navLinks).indexOf(currentActive);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            currentIndex = (currentIndex + 1) % navLinks.length;
            navLinks[currentIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            currentIndex = currentIndex <= 0 ? navLinks.length - 1 : currentIndex - 1;
            navLinks[currentIndex].focus();
        } else if (e.key === 'Enter' && currentActive) {
            e.preventDefault();
            currentActive.click();
        }
    }
});

// Resize ўақыяны тыңлаў
window.addEventListener('resize', debounce(function() {
    // Desktop өлшеминде меню жабыў
    if (window.innerWidth > 768) {
        closeMobileMenu();
    }
}, 250));

// URL өзгергенде навигацияны жаңалаў
window.addEventListener('popstate', function() {
    updateNavigationState();
});

function updateNavigationState() {
    const currentPath = window.location.pathname;
    const navLinks = document.querySelectorAll('.mobile-nav a');
    
    navLinks.forEach(link => {
        link.classList.remove('current-page');
        const linkPath = new URL(link.href).pathname;
        if (linkPath === currentPath) {
            link.classList.add('current-page');
        }
    });
}

// Breadcrumb навигациясы
function createBreadcrumb() {
    const path = window.location.pathname;
    const segments = path.split('/').filter(segment => segment !== '');
    
    const breadcrumbContainer = document.querySelector('.breadcrumb');
    if (!breadcrumbContainer) return;
    
    let breadcrumbHTML = '<a href="index.html">Бас бет</a>';
    
    segments.forEach((segment, index) => {
        if (segment !== 'index.html') {
            const segmentName = getSegmentName(segment);
            if (index === segments.length - 1) {
                breadcrumbHTML += ` / <span>${segmentName}</span>`;
            } else {
                breadcrumbHTML += ` / <a href="${segment}">${segmentName}</a>`;
            }
        }
    });
    
    breadcrumbContainer.innerHTML = breadcrumbHTML;
}

function getSegmentName(segment) {
    const names = {
        'sovereignty.html': 'Суверенитет',
        'news.html': 'Жаңалықлар',
        'politics.html': 'Сиясат',
        'history.html': 'Тарийх',
        'sports.html': 'Спорт',
        'geography.html': 'География',
        'traditions.html': 'Дәстүр',
        'religion.html': 'Дин',
        'pages': ''
    };
    
    return names[segment] || segment;
}

// Меню анимациялары
function animateMenuItems() {
    const mobileNav = document.getElementById('mobileNav');
    const navItems = mobileNav.querySelectorAll('li');
    
    navItems.forEach((item, index) => {
        item.style.transform = 'translateX(-100%)';
        item.style.opacity = '0';
        
        setTimeout(() => {
            item.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
            item.style.transform = 'translateX(0)';
            item.style.opacity = '1';
        }, index * 100);
    });
}

// Меню ашылғанда анимация қосыў
const originalOpenMenu = openMobileMenu;
openMobileMenu = function() {
    originalOpenMenu();
    setTimeout(animateMenuItems, 50);
};

// Touch навигациясы
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipeGesture();
});

function handleSwipeGesture() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;
    
    // Оңға swipe - меню ашыў
    if (swipeDistance > swipeThreshold && touchStartX < 50) {
        openMobileMenu();
    }
    
    // Солға swipe - меню жабыў
    if (swipeDistance < -swipeThreshold) {
        const mobileNav = document.getElementById('mobileNav');
        if (mobileNav && mobileNav.classList.contains('active')) {
            closeMobileMenu();
        }
    }
}

// Export функциялары (басқа файлдар ушын)
window.NavigationHelper = {
    openMenu: openMobileMenu,
    closeMenu: closeMobileMenu,
    toggleMenu: toggleMobileMenu,
    navigateToPage: navigateToPage
};