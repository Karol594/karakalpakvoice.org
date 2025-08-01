// Karakalpak Voice - Main JavaScript with QARA-AI Integration

document.addEventListener('DOMContentLoaded', function() {
    console.log('🏛️ Karakalpak Voice Portal initialized!');
    
    // Initialize all features
    initThemeToggle();
    initMobileMenu();
    initQaraAI();
    initSearch();
    initNewsletterForm();
    initScrollEffects();
    initLanguageSwitcher();
    initAccessibility();
    
    // Initialize analytics tracking
    trackPageView();
    
    console.log('✅ All features loaded successfully!');
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;

    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add smooth transition
        document.body.style.transition = 'background-color 0.3s ease, color 0.3s ease';
        setTimeout(() => {
            document.body.style.transition = '';
        }, 300);
        
        // Track theme change
        trackEvent('theme_change', 'ui', newTheme);
        
        showNotification(
            newTheme === 'dark' ? 
            (getCurrentLanguage() === 'ru' ? 'Темная тема включена' : 
             getCurrentLanguage() === 'kk' ? 'Қараңғы тақырып қосылды' :
             getCurrentLanguage() === 'pl' ? 'Ciemny motyw włączony' : 'Dark theme enabled') :
            (getCurrentLanguage() === 'ru' ? 'Светлая тема включена' : 
             getCurrentLanguage() === 'kk' ? 'Жарық тақырып қосылды' :
             getCurrentLanguage() === 'pl' ? 'Jasny motyw włączony' : 'Light theme enabled'),
            'success'
        );
    });
}

// Mobile Menu
function initMobileMenu() {
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (!mobileMenuBtn || !mobileMenu) return;

    mobileMenuBtn.addEventListener('click', function() {
        const isHidden = mobileMenu.classList.contains('hidden');
        
        if (isHidden) {
            mobileMenu.classList.remove('hidden');
            mobileMenu.style.maxHeight = mobileMenu.scrollHeight + 'px';
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                </svg>
            `;
            trackEvent('mobile_menu_open', 'navigation');
        } else {
            mobileMenu.style.maxHeight = '0';
            setTimeout(() => {
                mobileMenu.classList.add('hidden');
            }, 300);
            mobileMenuBtn.innerHTML = `
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            `;
            trackEvent('mobile_menu_close', 'navigation');
        }
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.style.maxHeight = '0';
                setTimeout(() => {
                    mobileMenu.classList.add('hidden');
                }, 300);
                mobileMenuBtn.innerHTML = `
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
                    </svg>
                `;
            }
        }
    });
}

// QARA-AI Integration
function initQaraAI() {
    const qaraAIBtn = document.getElementById('qara-ai-btn');
    if (!qaraAIBtn) return;

    // Create QARA-AI chat interface
    createQaraAIInterface();
    
    qaraAIBtn.addEventListener('click', function() {
        toggleQaraAIChat();
        trackEvent('qara_ai_open', 'ai_interaction');
    });
}

function createQaraAIInterface() {
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.id = 'qara-ai-chat';
    chatContainer.className = 'fixed bottom-4 right-4 w-80 h-96 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 hidden z-50';
    chatContainer.innerHTML = `
        <div class="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4 rounded-t-lg">
            <div class="flex justify-between items-center">
                <div class="flex items-center space-x-2">
                    <div class="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                    <h3 class="font-semibold">QARA-AI</h3>
                </div>
                <button id="close-qara-ai" class="text-white hover:text-gray-200">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
        
        <div id="chat-messages" class="flex-1 p-4 h-64 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <div class="chat-message ai-message">
                <div class="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg mb-2">
                    <p class="text-sm text-gray-800 dark:text-gray-200">
                        ${getCurrentLanguage() === 'ru' ? 'Привет! Я QARA-AI, ваш помощник по каракалпакской культуре и языку. Чем могу помочь?' :
                          getCurrentLanguage() === 'kk' ? 'Сәлем! Мен QARA-AI, сіздің қарақалпақ мәдениеті мен тілі жөнінде көмекшіңіз. Не көмек ете аламын?' :
                          getCurrentLanguage() === 'pl' ? 'Cześć! Jestem QARA-AI, twoim asystentem ds. kultury i języka karakałpackiego. Jak mogę pomóc?' :
                          'Hello! I am QARA-AI, your assistant for Karakalpak culture and language. How can I help?'}
                    </p>
                </div>
            </div>
        </div>
        
        <div class="p-4 border-t border-gray-200 dark:border-gray-700">
            <div class="flex space-x-2">
                <input type="text" id="chat-input" placeholder="${getCurrentLanguage() === 'ru' ? 'Введите сообщение...' :
                          getCurrentLanguage() === 'kk' ? 'Хабарды енгізіңіз...' :
                          getCurrentLanguage() === 'pl' ? 'Wpisz wiadomość...' :
                          'Type a message...'}" 
                       class="flex-1 p-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100">
                <button id="send-message" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                    </svg>
                </button>
            </div>
            
            <div class="mt-2 flex space-x-1">
                <button class="quick-action text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded" data-action="translate">
                    ${getCurrentLanguage() === 'ru' ? 'Перевести' : getCurrentLanguage() === 'kk' ? 'Аудару' : getCurrentLanguage() === 'pl' ? 'Tłumacz' : 'Translate'}
                </button>
                <button class="quick-action text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded" data-action="culture">
                    ${getCurrentLanguage() === 'ru' ? 'Культура' : getCurrentLanguage() === 'kk' ? 'Мәдениет' : getCurrentLanguage() === 'pl' ? 'Kultura' : 'Culture'}
                </button>
                <button class="quick-action text-xs bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded" data-action="news">
                    ${getCurrentLanguage() === 'ru' ? 'Новости' : getCurrentLanguage() === 'kk' ? 'Жаңалықтар' : getCurrentLanguage() === 'pl' ? 'Wiadomości' : 'News'}
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(chatContainer);
    
    // Add event listeners for chat
    setupChatEventListeners();
}

function setupChatEventListeners() {
    const closeBtn = document.getElementById('close-qara-ai');
    const sendBtn = document.getElementById('send-message');
    const chatInput = document.getElementById('chat-input');
    const quickActions = document.querySelectorAll('.quick-action');
    
    closeBtn?.addEventListener('click', () => {
        toggleQaraAIChat();
        trackEvent('qara_ai_close', 'ai_interaction');
    });
    
    sendBtn?.addEventListener('click', sendMessage);
    
    chatInput?.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    quickActions.forEach(btn => {
        btn.addEventListener('click', function() {
            const action = this.getAttribute('data-action');
            handleQuickAction(action);
            trackEvent('qara_ai_quick_action', 'ai_interaction', action);
        });
    });
}

function toggleQaraAIChat() {
    const chatContainer = document.getElementById('qara-ai-chat');
    if (!chatContainer) return;
    
    chatContainer.classList.toggle('hidden');
    
    if (!chatContainer.classList.contains('hidden')) {
        document.getElementById('chat-input')?.focus();
    }
}

async function sendMessage() {
    const chatInput = document.getElementById('chat-input');
    const message = chatInput?.value.trim();
    
    if (!message) return;
    
    // Add user message to chat
    addMessageToChat(message, 'user');
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    try {
        // Call QARA-AI API
        const response = await callQaraAI(message);
        hideTypingIndicator();
        addMessageToChat(response, 'ai');
        
        trackEvent('qara_ai_message_sent', 'ai_interaction');
    } catch (error) {
        hideTypingIndicator();
        addMessageToChat(
            getCurrentLanguage() === 'ru' ? 'Извините, произошла ошибка. Попробуйте позже.' :
            getCurrentLanguage() === 'kk' ? 'Кешіріңіз, қате орын алды. Кейінірек қайталаңыз.' :
            getCurrentLanguage() === 'pl' ? 'Przepraszam, wystąpił błąd. Spróbuj później.' :
            'Sorry, an error occurred. Please try again later.',
            'ai'
        );
        console.error('QARA-AI Error:', error);
    }
}

async function callQaraAI(message) {
    const apiEndpoint = window.qaraAI?.endpoint || '/api/qara-ai';
    const language = getCurrentLanguage();
    
    const response = await fetch(apiEndpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            message: message,
            language: language,
            context: 'karakalpak_voice',
            models: window.qaraAI?.models || ['claude', 'gpt']
        })
    });
    
    if (!response.ok) {
        throw new Error('QARA-AI API Error');
    }
    
    const data = await response.json();
    return data.response || 'No response received';
}

function addMessageToChat(message, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}-message mb-2`;
    
    const messageClass = sender === 'user' ? 'bg-blue-600 text-white ml-8' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-8';
    
    messageDiv.innerHTML = `
        <div class="${messageClass} p-3 rounded-lg">
            <p class="text-sm">${message}</p>
            <small class="text-xs opacity-75">${new Date().toLocaleTimeString()}</small>
        </div>
    `;
    
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.id = 'typing-indicator';
    typingDiv.className = 'chat-message ai-message mb-2';
    typingDiv.innerHTML = `
        <div class="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 mr-8 p-3 rounded-lg">
            <div class="flex space-x-1">
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
                <div class="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
            </div>
        </div>
    `;
    
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typingIndicator = document.getElementById('typing-indicator');
    if (typingIndicator) {
        typingIndicator.remove();
    }
}

function handleQuickAction(action) {
    let message = '';
    const lang = getCurrentLanguage();
    
    switch(action) {
        case 'translate':
            message = lang === 'ru' ? 'Помоги с переводом на каракалпакский язык' :
                     lang === 'kk' ? 'Қарақалпақ тіліне аудару көмегін бер' :
                     lang === 'pl' ? 'Pomóż z tłumaczeniem na język karakałpacki' :
                     'Help me translate to Karakalpak language';
            break;
        case 'culture':
            message = lang === 'ru' ? 'Расскажи о каракалпакской культуре' :
                     lang === 'kk' ? 'Қарақалпақ мәдениеті туралы айт' :
                     lang === 'pl' ? 'Opowiedz o kulturze karakałpackiej' :
                     'Tell me about Karakalpak culture';
            break;
        case 'news':
            message = lang === 'ru' ? 'Какие последние новости из Каракалпакстана?' :
                     lang === 'kk' ? 'Қарақалпақстаннан соңғы жаңалықтар қандай?' :
                     lang === 'pl' ? 'Jakie są najnowsze wiadomości z Karakałpakstanu?' :
                     'What are the latest news from Karakalpakstan?';
            break;
    }
    
    if (message) {
        document.getElementById('chat-input').value = message;
        sendMessage();
    }
}

// Search Functionality (placeholder)
function initSearch() {
    const searchBtn = document.getElementById('search-btn');
    if (!searchBtn) return;
    
    searchBtn.addEventListener('click', function() {
        // TODO: Implement search modal
        showNotification(
            getCurrentLanguage() === 'ru' ? 'Поиск будет добавлен в следующем обновлении' :
            getCurrentLanguage() === 'kk' ? 'Іздеу келесі жаңартуда қосылады' :
            getCurrentLanguage() === 'pl' ? 'Wyszukiwanie zostanie dodane w następnej aktualizacji' :
            'Search will be added in the next update',
            'info'
        );
        trackEvent('search_clicked', 'navigation');
    });
}

// Newsletter Form
function initNewsletterForm() {
    const forms = document.querySelectorAll('.newsletter-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = form.querySelector('input[type="email"]')?.value;
            const button = form.querySelector('button[type="submit"]');
            
            if (!email || !button) return;
            
            const originalText = button.textContent;
            button.innerHTML = '<div class="loading"></div> ' + (getCurrentLanguage() === 'ru' ? 'Подписка...' : 
                                                              getCurrentLanguage() === 'kk' ? 'Жазылу...' :
                                                              getCurrentLanguage() === 'pl' ? 'Zapisywanie...' : 'Subscribing...');
            button.disabled = true;
            
            // Simulate API call
            setTimeout(() => {
                button.textContent = getCurrentLanguage() === 'ru' ? 'Подписано!' : 
                                   getCurrentLanguage() === 'kk' ? 'Жазылды!' :
                                   getCurrentLanguage() === 'pl' ? 'Zapisano!' : 'Subscribed!';
                button.style.background = '#10b981';
                
                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                    button.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
            
            trackEvent('newsletter_subscribe', 'engagement', email);
        });
    });
}

// Scroll Effects
function initScrollEffects() {
    // Add scroll-to-top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'fixed bottom-4 left-4 w-12 h-12 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 opacity-0 invisible z-40';
    scrollToTopBtn.id = 'scroll-to-top';
    document.body.appendChild(scrollToTopBtn);

    let isVisible = false;
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300 && !isVisible) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
            isVisible = true;
        } else if (window.pageYOffset <= 300 && isVisible) {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'invisible';
            isVisible = false;
        }
    });

    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        trackEvent('scroll_to_top', 'navigation');
    });
}

// Language Switcher
function initLanguageSwitcher() {
    const langLinks = document.querySelectorAll('a[href*="/ru/"], a[href*="/kk/"], a[href*="/en/"], a[href*="/pl/"]');
    
    langLinks.forEach(link => {
        link.addEventListener('click', function() {
            const newLang = this.href.includes('/ru/') ? 'ru' :
                          this.href.includes('/kk/') ? 'kk' :
                          this.href.includes('/en/') ? 'en' :
                          this.href.includes('/pl/') ? 'pl' : 'unknown';
            
            trackEvent('language_switch', 'localization', newLang);
        });
    });
}

// Accessibility Features
function initAccessibility() {
    // Skip links
    const skipLinks = document.querySelectorAll('.skip-link');
    skipLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.focus();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Keyboard navigation for modals
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            // Close any open modals
            const openChat = document.getElementById('qara-ai-chat');
            if (openChat && !openChat.classList.contains('hidden')) {
                toggleQaraAIChat();
            }
        }
    });
}

// Utility Functions
function getCurrentLanguage() {
    return doc
