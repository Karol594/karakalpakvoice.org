// admin-functions.js - Админ панель функциялары

// Глобальные переменные
let articles = JSON.parse(localStorage.getItem('articles') || '[]');
let mediaFiles = JSON.parse(localStorage.getItem('mediaFiles') || '[]');
let categories = JSON.parse(localStorage.getItem('categories') || '["sovereignty","news","politics","history","sport","geography","culture","religion"]');

// Тіл мәліметтері
const languages = {
    kaa: 'Қарақалпақ',
    ru: 'Орыс', 
    en: 'Ағылшын',
    pl: 'Поляк'
};

// Категория аттары
const categoryNames = {
    sovereignty: 'Суверенитет',
    news: 'Жаңалықлар', 
    politics: 'Сиясат',
    history: 'Тарийх',
    sport: 'Спорт',
    geography: 'География',
    culture: 'Дәстүр',
    religion: 'Дин'
};

// Табты көрсету
function showTab(tabName) {
    // Барлық табтарды жасыру
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    
    document.querySelectorAll('.nav-tab').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Таңдалған табты көрсету
    document.getElementById(tabName).classList.add('active');
    event.target.classList.add('active');
    
    // Тиісті мәліметтерді жүктеу
    if (tabName === 'articles') {
        loadArticlesList();
    } else if (tabName === 'media') {
        loadMediaFiles();
    } else if (tabName === 'categories') {
        loadCategoriesList();
    }
}

// Мақала сақтау
document.getElementById('article-form').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const article = {
        id: Date.now().toString(),
        title: document.getElementById('article-title').value,
        category: document.getElementById('article-category').value,
        author: document.getElementById('article-author').value,
        language: document.getElementById('article-language').value,
        excerpt: document.getElementById('article-excerpt').value,
        content: document.getElementById('article-content').value,
        tags: document.getElementById('article-tags').value.split(',').map(tag => tag.trim()),
        date: new Date().toISOString().split('T')[0],
        image: null // Кейінірек сурет қосамыз
    };
    
    // Сурет файлын өңдеу
    const imageFile = document.getElementById('article-image').files[0];
    if (imageFile) {
        const reader = new FileReader();
        reader.onload = function(e) {
            article.image = e.target.result;
            saveArticle(article);
        };
        reader.readAsDataURL(imageFile);
    } else {
        saveArticle(article);
    }
});

// Мақаланы сақтау функциясы
function saveArticle(article) {
    articles.unshift(article); // Жаңа мақаланы басына қосу
    localStorage.setItem('articles', JSON.stringify(articles));
    
    showMessage('article-success', '✅ Мақала сәтті сақталды!');
    resetArticleForm();
    loadArticlesList();
    
    // Негізгі сайтқа жаңарту сигналын жіберу
    updateMainSite();
}

// Мақалалар тізімін жүктеу
function loadArticlesList() {
    const listContainer = document.getElementById('articles-list');
    
    if (articles.length === 0) {
        listContainer.innerHTML = '<div style="padding: 40px; text-align: center; opacity: 0.7;">Әзірше мақалалар жоқ</div>';
        return;
    }
    
    listContainer.innerHTML = articles.map(article => `
        <div class="article-item">
            <div class="article-info">
                <h3>${article.title}</h3>
                <p>📅 ${article.date} | 👤 ${article.author} | 🌍 ${languages[article.language]} | 📂 ${categoryNames[article.category]}</p>
                <p style="margin-top: 5px;">${article.excerpt.substring(0, 100)}...</p>
            </div>
            <div class="article-actions">
                <button class="btn btn-secondary" onclick="editArticle('${article.id}')">✏️ Өңдеу</button>
                <button class="btn btn-danger" onclick="deleteArticle('${article.id}')">🗑️ Өшіру</button>
            </div>
        </div>
    `).join('');
}

// Мақаланы өңдеу
function editArticle(articleId) {
    const article = articles.find(a => a.id === articleId);
    if (!article) return;
    
    document.getElementById('article-title').value = article.title;
    document.getElementById('article-category').value = article.category;
    document.getElementById('article-author').value = article.author;
    document.getElementById('article-language').value = article.language;
    document.getElementById('article-excerpt').value = article.excerpt;
    document.getElementById('article-content').value = article.content;
    document.getElementById('article-tags').value = article.tags.join(', ');
    
    // Мақаланы жаңарту үшін ID сақтау
    document.getElementById('article-form').dataset.editId = articleId;
    
    // Скроллды формаға жылжыту
    document.getElementById('article-form').scrollIntoView({ behavior: 'smooth' });
    
    showMessage('article-success', '📝 Мақала өңдеуге жүктелді');
}

// Мақаланы өшіру
function deleteArticle(articleId) {
    if (confirm('Бұл мақаланы өшіруге сенімдісіз бе?')) {
        articles = articles.filter(a => a.id !== articleId);
        localStorage.setItem('articles', JSON.stringify(articles));
        loadArticlesList();
        updateMainSite();
        showMessage('article-success', '🗑️ Мақала өшірілді');
    }
}

// Форманы тазалау
function resetArticleForm() {
    document.getElementById('article-form').reset();
    document.getElementById('article-form').removeAttribute('data-edit-id');
    document.getElementById('article-author').value = 'KarakalpakVoice.org';
}

// Медиа файлдарды басқару
document.getElementById('media-file').addEventListener('change', function(e) {
    const files = Array.from(e.target.files);
    files.forEach(file => uploadMediaFile(file));
});

// Drag & Drop медиа файлдар үшін
const mediaUpload = document.querySelector('.media-upload');
mediaUpload.addEventListener('dragover', function(e) {
    e.preventDefault();
    this.style.borderColor = 'rgba(255,255,255,0.8)';
});

mediaUpload.addEventListener('dragleave', function(e) {
    e.preventDefault();
    this.style.borderColor = 'rgba(255,255,255,0.3)';
});

mediaUpload.addEventListener('drop', function(e) {
    e.preventDefault();
    this.style.borderColor = 'rgba(255,255,255,0.3)';
    
    const files = Array.from(e.dataTransfer.files);
    files.forEach(file => uploadMediaFile(file));
});

// Медиа файлын жүктеу
function uploadMediaFile(file) {
    const reader = new FileReader();
    reader.onload = function(e) {
        const mediaItem = {
            id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
            name: file.name,
            type: file.type,
            size: file.size,
            url: e.target.result,
            uploadDate: new Date().toISOString()
        };
        
        mediaFiles.unshift(mediaItem);
        localStorage.setItem('mediaFiles', JSON.stringify(mediaFiles));
        loadMediaFiles();
        showMessage('media-success', `✅ ${file.name} жүктелді!`);
    };
    reader.readAsDataURL(file);
}

// Медиа файлдарды көрсету
function loadMediaFiles() {
    const container = document.getElementById('media-preview');
    
    if (mediaFiles.length === 0) {
        container.innerHTML = '<div style="padding: 40px; text-align: center; opacity: 0.7; grid-column: 1/-1;">Медиа файлдар жоқ</div>';
        return;
    }
    
    container.innerHTML = mediaFiles.map(media => {
        let preview = '';
        if (media.type.startsWith('image/')) {
            preview = `<img src="${media.url}" alt="${media.name}">`;
        } else if (media.type.startsWith('video/')) {
            preview = `<video src="${media.url}" controls></video>`;
        } else if (media.type.startsWith('audio/')) {
            preview = `<audio src="${media.url}" controls style="width: 100%;"></audio>`;
        } else {
            preview = `<div style="height: 120px; background: rgba(255,255,255,0.1); display: flex; align-items: center; justify-content: center; border-radius: 8px;">📄</div>`;
        }
        
        return `
            <div class="media-item">
                ${preview}
                <p style="font-size: 12px; margin-bottom: 5px;">${media.name}</p>
                <p style="font-size: 10px; opacity: 0.7;">${formatFileSize(media.size)}</p>
                <button class="btn btn-danger" style="margin-top: 10px; padding: 5px 10px; font-size: 12px;" onclick="deleteMedia('${media.id}')">🗑️</button>
            </div>
        `;
    }).join('');
}

// Медиа файлды өшіру
function deleteMedia(mediaId) {
    if (confirm('Бұл файлды өшіруге сенімдісіз бе?')) {
        mediaFiles = mediaFiles.filter(m => m.id !== mediaId);
        localStorage.setItem('mediaFiles', JSON.stringify(mediaFiles));
        loadMediaFiles();
        showMessage('media-success', '🗑️ Файл өшірілді');
    }
}

// Файл өлшемін форматтау
function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Категориялар тізімін жүктеу
function loadCategoriesList() {
    const container = document.getElementById('categories-list');
    container.innerHTML = categories.map(cat => `
        <div style="display: flex; justify-content: space-between; align-items: center; padding: 15px; background: rgba(255,255,255,0.05); margin-bottom: 10px; border-radius: 8px;">
            <span>${categoryNames[cat] || cat}</span>
            <button class="btn btn-danger" onclick="deleteCategory('${cat}')">🗑️</button>
        </div>
    `).join('');
}

// Жаңа категория қосу
function addCategory() {
    const newCat = document.getElementById('new-category').value.trim();
    if (newCat && !categories.includes(newCat.toLowerCase())) {
        categories.push(newCat.toLowerCase());
        categoryNames[newCat.toLowerCase()] = newCat;
        localStorage.setItem('categories', JSON.stringify(categories));
        loadCategoriesList();
        document.getElementById('new-category').value = '';
        showMessage('article-success', '✅ Категория қосылды!');
    }
}

// Категорияны өшіру
function deleteCategory(categoryId) {
    if (confirm('Бұл категорияны өшіруге сенімдісіз бе?')) {
        categories = categories.filter(c => c !== categoryId);
        localStorage.setItem('categories', JSON.stringify(categories));
        loadCategoriesList();
        showMessage('article-success', '🗑️ Категория өшірілді');
    }
}

// Баптауларды сақтау
function saveSettings() {
    const settings = {
        siteTitle: document.getElementById('site-title').value,
        siteDescription: document.getElementById('site-description').value,
        contactEmail: document.getElementById('contact-email').value
    };
    
    localStorage.setItem('siteSettings', JSON.stringify(settings));
    showMessage('article-success', '✅ Баптаулар сақталды!');
}

// Хабарлама көрсету
function showMessage(elementId, message) {
    const element = document.getElementById(elementId);
    element.textContent = message;
    element.style.display = 'block';
    
    setTimeout(() => {
        element.style.display = 'none';
    }, 3000);
}

// Негізгі сайтты жаңарту
function updateMainSite() {
    // Бұл функция негізгі сайттағы мақалалар тізімін жаңартады
    try {
        if (window.parent && window.parent.loadArticles) {
            window.parent.loadArticles();
        }
    } catch (e) {
        console.log('Main site update failed:', e);
    }
}

// Бет жүктелгенде
document.addEventListener('DOMContentLoaded', function() {
    loadArticlesList();
    loadMediaFiles();
    loadCategoriesList();
    
    // Баптауларды жүктеу
    const settings = JSON.parse(localStorage.getItem('siteSettings') || '{}');
    if (settings.siteTitle) document.getElementById('site-title').value = settings.siteTitle;
    if (settings.siteDescription) document.getElementById('site-description').value = settings.siteDescription;
    if (settings.contactEmail) document.getElementById('contact-email').value = settings.contactEmail;
});
