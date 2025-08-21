/* KarakalpakVoice.org - Main JavaScript Functions */
/* ∞D Design with Karakalpakstan Flag Colors */

// Global variables
let customCursor = null;
let isMenuOpen = false;
let currentPage = 'home';

// Initialize everything when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
    initializeCustomCursor();
    initializeQRCode();
    initializeMobileMenu();
    initializeInfinityAnimations();
    initializeSmoothScroll();
    initializeShareFunctions();
    initializeModalSystem();
    initializeSecurityWarning();
    initializeBackToTop();
    updateCurrentPage();
});

// Custom Cursor with Karakalpakstan Flag Colors
function initializeCustomCursor() {
    customCursor = document.querySelector('.custom-cursor');
    
    if (!customCursor) {
        // Create cursor if it doesn't exist
        customCursor = document.createElement('div');
        customCursor.className = 'custom-cursor';
        customCursor.innerHTML = '<div class="cursor-dot"></div>';
        document.body.appendChild(customCursor);
    }
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    
    // Update mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor follow animation
    function animateCursor() {
        const speed = 0.15;
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        
        if (customCursor) {
            customCursor.style.transform = `translate(${cursorX}px, ${cursorY}px)`;
        }
        
        requestAnimationFrame(animateCursor);
    }
    animateCursor();
    
    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, .section-card, .lang-btn');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            if (customCursor) {
                customCursor.style.transform += ' scale(1.5)';
                customCursor.style.mixBlendMode = 'normal';
            }
        });
        
        element.addEventListener('mouseleave', () => {
            if (customCursor) {
                customCursor.style.transform = customCursor.style.transform.replace(' scale(1.5)', '');
                customCursor.style.mixBlendMode = 'difference';
            }
        });
    });
}

// QR Code Generation
function initializeQRCode() {
    const qrCanvas = document.getElementById('qr-canvas');
    if (qrCanvas && typeof QRCode !== 'undefined') {
        const currentURL = window.location.href;
        
        QRCode.toCanvas(qrCanvas, currentURL, {
            width: 150,
            height: 150,
            color: {
                dark: '#0066CC',  // Karakalpakstan blue
                light: '#FFFFFF'
            },
            margin: 2,
            errorCorrectionLevel: 'M'
        }, function(error) {
            if (error) {
                console.warn('QR Code generation failed:', error);
                // Fallback - show text
                qrCanvas.style.display = 'none';
                const fallback = document.createElement('div');
                fallback.innerHTML = `<p style="color: #0066CC;">QR Code: ${currentURL}</p>`;
                qrCanvas.parentNode.appendChild(fallback);
            }
        });
    }
}

// Mobile Menu Toggle
function initializeMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            
            // Toggle menu classes
            nav.classList.toggle('nav-open', isMenuOpen);
            mobileMenuBtn.classList.toggle('menu-open', isMenuOpen);
            
            // Animate hamburger lines
            const lines = mobileMenuBtn.querySelectorAll('span');
            if (isMenuOpen) {
                lines[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                lines[1].style.opacity = '0';
                lines[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
            } else {
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
        
        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (isMenuOpen && !nav.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
                isMenuOpen = false;
                nav.classList.remove('nav-open');
                mobileMenuBtn.classList.remove('menu-open');
                
                const lines = mobileMenuBtn.querySelectorAll('span');
                lines[0].style.transform = 'none';
                lines[1].style.opacity = '1';
                lines[2].style.transform = 'none';
            }
        });
    }
}

// Infinity Animations
function initializeInfinityAnimations() {
    // Animate infinity symbols
    const infinitySymbols = document.querySelectorAll('.infinity-symbol');
    infinitySymbols.forEach((symbol, index) => {
        symbol.style.animationDelay = `${index * 0.5}s`;
    });
    
    // Animate particles background
    const particles = document.querySelector('.infinity-particles');
    if (particles) {
        // Add random floating elements
        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'floating-particle';
            particle.style.cssText = `
                position: absolute;
                width: 4px;
                height: 4px;
                background: rgba(0, 102, 204, 0.3);
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: floatParticle ${8 + Math.random() * 4}s ease-in-out infinite;
                animation-delay: ${Math.random() * 2}s;
            `;
            particles.appendChild(particle);
        }
    }
}

// Smooth Scrolling
function initializeSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href === '#') return;
            
            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Close mobile menu if open
                if (isMenuOpen) {
                    const nav = document.querySelector('.nav');
                    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
                    if (nav && mobileMenuBtn) {
                        isMenuOpen = false;
                        nav.classList.remove('nav-open');
                        mobileMenuBtn.classList.remove('menu-open');
                    }
                }
            }
        });
    });
}

// Share Functions
function initializeShareFunctions() {
    // Add share buttons to articles
    const shareButtons = document.querySelectorAll('[data-share]');
    shareButtons.forEach(button => {
        button.addEventListener('click', () => {
            const type = button.getAttribute('data-share');
            shareContent(type);
        });
    });
}

function shareContent(type = 'general') {
    const url = window.location.href;
    const title = document.title;
    const text = document.querySelector('meta[name="description"]')?.content || '';
    
    // Try native Web Share API first
    if (navigator.share) {
        navigator.share({
            title: title,
            text: text,
            url: url
        }).catch(err => console.log('Share failed:', err));
        return;
    }
    
    // Fallback to social media links
    const shareUrls = {
        twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        telegram: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`,
        email: `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(text + '\n\n' + url)}`
    };
    
    // Show share modal
    showShareModal(shareUrls);
}

function showShareModal(shareUrls) {
    const modal = document.createElement('div');
    modal.className = 'share-modal';
    modal.innerHTML = `
        <div class="share-modal-content">
            <div class="share-modal-header">
                <h3>Поделиться</h3>
                <button class="share-modal-close">&times;</button>
            </div>
            <div class="share-buttons">
                <a href="${shareUrls.twitter}" target="_blank" class="share-btn twitter">Twitter</a>
                <a href="${shareUrls.facebook}" target="_blank" class="share-btn facebook">Facebook</a>
                <a href="${shareUrls.telegram}" target="_blank" class="share-btn telegram">Telegram</a>
                <a href="${shareUrls.whatsapp}" target="_blank" class="share-btn whatsapp">WhatsApp</a>
                <a href="${shareUrls.email}" class="share-btn email">Email</a>
            </div>
            <div class="share-url">
                <input type="text" value="${window.location.href}" readonly>
                <button class="copy-url-btn">Копировать</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Close modal events
    const closeBtn = modal.querySelector('.share-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
    
    // Copy URL functionality
    const copyBtn = modal.querySelector('.copy-url-btn');
    const urlInput = modal.querySelector('input');
    copyBtn.addEventListener('click', () => {
        urlInput.select();
        document.execCommand('copy');
        copyBtn.textContent = 'Скопировано!';
        setTimeout(() => {
            copyBtn.textContent = 'Копировать';
        }, 2000);
    });
}

// Modal System
function initializeModalSystem() {
    // Close modal function
    window.closeModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
    
    // Open modal function
    window.openModal = function(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    };
    
    // Close modal on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });
    
    // Close modal on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const openModal = document.querySelector('.modal[style*="display: flex"]');
            if (openModal) {
                openModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        }
    });
}

// Security Warning System
function initializeSecurityWarning() {
    window.closeWarning = function() {
        const warning = document.getElementById('securityWarning');
        if (warning) {
            warning.style.display = 'none';
        }
    };
    
    // Auto-hide warning after 10 seconds
    setTimeout(() => {
        const warning = document.getElementById('securityWarning');
        if (warning) {
            warning.style.opacity = '0.8';
        }
    }, 10000);
}

// Back to Top Button
function initializeBackToTop() {
    // Create back to top button
    const backToTop = document.createElement('button');
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '↑';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: linear-gradient(135deg, #0066CC, #009639);
        color: white;
        border: none;
        font-size: 18px;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        box-shadow: 0 4px 12px rgba(0, 102, 204, 0.3);
    `;
    
    document.body.appendChild(backToTop);
    
    // Show/hide based on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTop.style.opacity = '1';
            backToTop.style.visibility = 'visible';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Update current page for navigation
function updateCurrentPage() {
    const path = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-list a');
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href');
        
        if (path.includes(href) || (path === '/' && href === '../index.html')) {
            link.classList.add('active');
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

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
    };
}

// Error Handling
window.addEventListener('error', (e) => {
    console.warn('JavaScript Error:', e.error);
    // Could send error to analytics here
});

// Performance Monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            const perfData = performance.getEntriesByType('navigation')[0];
            if (perfData) {
                console.log('Page Load Time:', perfData.loadEventEnd - perfData.loadEventStart, 'ms');
            }
        }, 0);
    });
}

// Export functions for global use
window.KarakalpakVoiceMain = {
    shareContent,
    openModal,
    closeModal,
    closeWarning,
    debounce,
    throttle
};

// Add CSS animations dynamically
const additionalStyles = document.createElement('style');
additionalStyles.textContent = `
    @keyframes floatParticle {
        0%, 100% { transform: translateY(0px) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(180deg); }
    }
    
    .nav-open {
        display: flex !important;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(15px);
        padding: 20px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    }
    
    .share-modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
    }
    
    .share-modal-content {
        background: white;
        padding: 30px;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
    }
    
    .share-buttons {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
        gap: 10px;
        margin: 20px 0;
    }
    
    .share-btn {
        padding: 10px;
        text-align: center;
        border-radius: 8px;
        text-decoration: none;
        color: white;
        font-weight: 500;
    }
    
    .share-btn.twitter { background: #1DA1F2; }
    .share-btn.facebook { background: #4267B2; }
    .share-btn.telegram { background: #0088cc; }
    .share-btn.whatsapp { background: #25D366; }
    .share-btn.email { background: #666; }
    
    .share-url {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }
    
    .share-url input {
        flex: 1;
        padding: 8px;
        border: 1px solid #ddd;
        border-radius: 5px;
    }
    
    .copy-url-btn {
        padding: 8px 15px;
        background: #0066CC;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
    }
`;

document.head.appendChild(additionalStyles);