# 🏛️ Karakalpak Voice - Қарақалпақ Дауысы

> **Independent voice of Karakalpak people worldwide**  
> **Қарақалпақ халқының дүниежүзіндегі тәуелсіз дауысы**

[![Netlify Status](https://api.netlify.com/api/v1/badges/your-badge-id/deploy-status)](https://app.netlify.com/sites/karakalpakvoice/deploys)
[![Hugo](https://img.shields.io/badge/Hugo-0.119+-blue.svg)](https://gohugo.io/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![PWA](https://img.shields.io/badge/PWA-Ready-orange.svg)](https://web.dev/progressive-web-apps/)
[![QARA-AI](https://img.shields.io/badge/QARA--AI-Enabled-purple.svg)](https://karakalpakvoice.org)

## 📖 About | Туралы

**Karakalpak Voice** is a modern, multilingual web platform dedicated to preserving and promoting Karakalpak culture, language, and addressing contemporary issues facing the Karakalpak people.

**Қарақалпақ Дауысы** - қарақалпақ мәдениетін, тілін сақтауға және насихаттауға, сондай-ақ қарақалпақ халқының алдында тұрған заманауи мәселелерді шешуге арналған заманауи, көптілді веб-платформа.

## 🌍 Languages | Тілдер

- 🇷🇺 **Русский** - Primary language | Негізгі тіл
- 🏳️ **Қарақалпақша** - Native language | Ана тіл
- 🇺🇸 **English** - International | Халықаралық
- 🇵🇱 **Polski** - Diaspora in Poland | Польшадағы диаспора

## ✨ Features | Мүмкіндіктер

### 🎯 Core Features | Негізгі функциялар
- ✅ **Multilingual Hugo site** with 4 languages
- ✅ **QARA-AI integration** - AI assistant for Karakalpak culture
- ✅ **PWA support** - Install as mobile app
- ✅ **Responsive design** - Works on all devices
- ✅ **SEO optimized** - Meta tags, Open Graph, JSON-LD
- ✅ **Dark/Light themes** - User preference
- ✅ **Accessibility ready** - WCAG 2.1 compliant

### 🤖 QARA-AI Features | QARA-AI мүмкіндіктері
- 🔄 **Multi-model AI** (Claude, GPT, Gemini)
- 🌐 **Auto-translation** to/from Karakalpak
- 💬 **Intelligent chat** with cultural context
- 📚 **Quick actions** (Translate, Culture, News)
- 🎯 **Context-aware** responses

### 📱 Technical Features | Техникалық мүмкіндіктер
- ⚡ **Fast loading** - Optimized assets
- 🔍 **Search functionality** - Lunr.js integration
- 📊 **Analytics** - Matomo integration
- 🔐 **Security headers** - CSP, HTTPS, XSS protection
- 🚀 **Netlify deployment** - Automatic builds
- 📱 **Service Worker** - Offline support

## 🚀 Quick Start | Жылдам бастау

### Prerequisites | Алғышарттар
- **Node.js** 18+ 
- **Hugo Extended** 0.119+
- **Git**

### Installation | Орнату

```bash
# Clone repository | Репозиторийді клондау
git clone https://github.com/karakalpak-voice/karakalpakvoice.org.git
cd karakalpakvoice.org

# Install dependencies | Dependencies орнату
npm install

# Start development server | Development серверін іске қосу
npm run dev

# Open browser | Браузерді ашу
# http://localhost:1313
```

### Build for Production | Production үшін құру

```bash
# Build site | Сайтты құру
npm run build

# Test locally | Жергілікті тест
npm run serve:prod
```

## 📁 Project Structure | Жоба құрылымы

```
karakalpakvoice.org/
├── 📁 content/                 # Content in 4 languages
│   ├── 📁 ru/                 # Russian content
│   ├── 📁 kk/                 # Karakalpak content
│   ├── 📁 en/                 # English content
│   └── 📁 pl/                 # Polish content
├── 📁 static/                 # Static assets
│   ├── 📁 css/               # Stylesheets
│   ├── 📁 js/                # JavaScript
│   ├── 📁 images/            # Images and icons
│   └── site.webmanifest      # PWA manifest
├── 📁 themes/                 # Hugo theme
│   └── 📁 karakalpakvoice/   # Custom theme
├── 📁 netlify/               # Netlify functions
│   └── 📁 functions/         # API endpoints
│       └── qara-ai.js        # QARA-AI API
├── 📄 config.toml            # Hugo configuration
├── 📄 netlify.toml           # Netlify deployment
├── 📄 package.json           # Dependencies
└── 📄 README.md              # This file
```

## 🎨 Content Sections | Контент бөлімдері

### 🏛️ Main Sections | Негізгі бөлімдер
- **🏛️ Суверенитет** - Sovereignty and autonomy issues
- **📰 Жаңалықлар** - Latest news and updates  
- **🏛️ Сиясат** - Political analysis and commentary
- **📚 Тарийх** - History and historical figures
- **⚽ Спорт** - Sports and achievements
- **🏔️ Туризм** - Tourism and geography
- **🎭 Мәдениет** - Culture and traditions
- **📞 Биз туўралы** - About us and contacts

### 📝 Content Management | Контент басқару
- **Hugo Markdown** - Write in Markdown format
- **Front Matter** - YAML metadata
- **Multilingual** - Same content in 4 languages
- **Categories & Tags** - Organized taxonomy
- **SEO Ready** - Optimized for search engines

## 🤖 QARA-AI Integration | QARA-AI интеграциясы

### API Configuration | API конфигурациясы
```javascript
// Environment variables required
CLAUDE_API_KEY=your-claude-api-key
OPENAI_API_KEY=your-openai-api-key
GEMINI_API_KEY=your-gemini-api-key
```

### Usage Examples | Пайдалану мысалдары

```javascript
// Call QARA-AI API
const response = await fetch('/api/qara-ai', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    message: 'Қарақалпақ тілі туралы айтып бер',
    language: 'kk',
    models: ['claude', 'gpt']
  })
});
```

### Quick Actions | Жылдам әрекеттер
- **🔄 Translate** - Қарақалпақ тіліне аудару
- **🎭 Culture** - Мәдениет туралы сұрақтар
- **📰 News** - Соңғы жаңалықтар

## 🛠️ Development | Дамыту

### Available Scripts | Қолжетімді командалар

```bash
npm run dev              # Development server
npm run build            # Production build
npm run test             # Run all tests
npm run test:html        # HTML validation
npm run test:css         # CSS linting
npm run test:js          # JavaScript linting
npm run lighthouse       # Performance testing
npm run format           # Code formatting
npm run deploy           # Deploy to Netlify
npm run deploy:preview   # Preview deployment
```

### Code Quality | Код сапасы
- **ESLint** - JavaScript linting
- **Stylelint** - CSS linting
- **HTMLHint** - HTML validation
- **Prettier** - Code formatting
- **Lighthouse** - Performance auditing

### Testing | Тестілеу
```bash
npm run test             # All tests
npm run audit:security   # Security audit
npm run audit:lighthouse # Performance audit
```

## 🚀 Deployment | Орналастыру

### Netlify (Recommended) | Netlify (Ұсынылады)

1. **Connect Repository** | Репозиторийді қосу
   ```bash
   # Deploy to Netlify
   npm run deploy
   ```

2. **Environment Variables** | Орта айнымалылары
   ```
   HUGO_VERSION=0.119.0
   CLAUDE_API_KEY=your-key
   OPENAI_API_KEY=your-key
   GEMINI_API_KEY=your-key
   ```

3. **Custom Domain** | Пайдаланушы домені
   - Domain: `karakalpakvoice.org`
   - SSL: Auto-enabled
   - CDN: Global distribution

### Other Platforms | Басқа платформалар
- **Vercel** - `vercel --prod`
- **GitHub Pages** - Use workflow
- **Firebase** - `firebase deploy`

## 🔧 Configuration | Конфигурация

### Hugo Config | Hugo конфигурациясы
```toml
# config.toml
baseURL = "https://karakalpakvoice.org"
defaultContentLanguage = "ru"
theme = "karakalpakvoice"

[params.qara_ai]
  enabled = true
  models = ["claude", "gpt", "gemini"]
```

### PWA Manifest | PWA манифесті
```json
{
  "name": "Karakalpak Voice",
  "short_name": "Karakalpak Voice",
  "theme_color": "#1e40af",
  "display": "standalone"
}
```

## 📊 Analytics | Аналитика

### Matomo Integration | Matomo интеграциясы
```javascript
// Auto-tracking enabled
- Page views
- User interactions  
- QARA-AI usage
- Language switching
- Performance metrics
```

### Performance Metrics | Өнімділік көрсеткіштері
- **Lighthouse Score** - 95+ target
- **Core Web Vitals** - All green
- **Page Speed** - <3s load time
- **SEO Score** - 100/100

## 🤝 Contributing | Үлес қосу

### For Content Contributors | Контент авторлары үшін

1. **Fork repository** | Репозиторийді fork жасау
2. **Create content** | Контент жасау
   ```bash
   # Create new post
   hugo new content/kk/posts/my-article.md
   ```
3. **Submit PR** | Pull Request жіберу

### For Developers | Дамытушылар үшін

1. **Development setup** | Дамыту орнату
   ```bash
   git clone <repo>
   npm install
   npm run dev
   ```

2. **Code standards** | Код стандарттары
   - Use ESLint configuration
   - Follow Prettier formatting
   - Write meaningful commit messages
   - Add tests for new features

3. **Testing** | Тестілеу
   ```bash
   npm run test
   npm run lighthouse
   ```

### Content Guidelines | Контент нұсқаулықтары
- **Accuracy** - Verify all facts
- **Neutrality** - Present balanced views
- **Quality** - Well-written and engaging
- **Multilingual** - Provide translations when possible

## 📞 Support | Қолдау

### Get Help | Көмек алу
- 📧 **Email**: info@karakalpakvoice.org
- 💬 **Telegram**: @karakalpakvoice
- 🐛 **Issues**: [GitHub Issues](https://github.com/karakalpak-voice/karakalpakvoice.org/issues)
- 💡 **Discussions**: [GitHub Discussions](https://github.com/karakalpak-voice/karakalpakvoice.org/discussions)

### Documentation | Құжаттама
- 📖 **Hugo Docs**: https://gohugo.io/documentation/
- 🚀 **Netlify Docs**: https://docs.netlify.com/
- 🤖 **QARA-AI API**: `/api/qara-ai` endpoint

## 📄 License | Лицензия

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments | Алғыс сөздер

- **Hugo Team** - Amazing static site generator
- **Netlify** - Hosting and deployment platform  
- **Anthropic** - Claude AI integration
- **OpenAI** - GPT model access
- **Google** - Gemini AI support
- **Karakalpak Community** - Content and cultural guidance

## 🌟 Star History | Жұлдыз тарихы

[![Star History Chart](https://api.star-history.com/svg?repos=karakalpak-voice/karakalpakvoice.org&type=Date)](https://star-history.com/#karakalpak-voice/karakalpakvoice.org&Date)

---

<div align="center">

**Made with ❤️ for the Karakalpak people worldwide**  
**Дүниежүзіндегі қарақалпақ халқы үшін ❤️ жасалған**

[Website](https://karakalpakvoice.org) • [Documentation](https://docs.karakalpakvoice.org) • [Support](mailto:info@karakalpakvoice.org)

</div>
