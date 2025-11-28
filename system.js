// ==========================================
// 1. Global Styles (تصميم زجاجي مظلم - Dark Glass UI)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@300;500;700&display=swap');

    :root { 
        --primary: #4e54c8; 
        --accent: #00d2ff;
        --glass-dark: rgba(15, 15, 25, 0.9);
        --border-light: rgba(255, 255, 255, 0.1);
        --text-white: #ffffff;
    }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; }
    
    html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    
    /* الخطوط: Outfit للإنجليزي، Cairo للعربي */
    body { font-family: 'Outfit', sans-serif; }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* زر الإعدادات (ثابت) */
    .settings-btn { 
        position: fixed; top: 25px; right: 25px; 
        background: var(--glass-dark); backdrop-filter: blur(15px);
        width: 45px; height: 45px; border-radius: 50%; 
        box-shadow: 0 0 15px rgba(0,0,0,0.3); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; z-index: 99999; transition: 0.4s; 
        border: 1px solid var(--border-light);
    }
    .settings-btn i { color: var(--text-white); font-size: 20px; transition: 0.3s; }
    .settings-btn:hover { transform: rotate(90deg); border-color: var(--accent); }
    .settings-btn:hover i { color: var(--accent); }
    
    /* نافذة اللغات (Dark Modal) */
    .modal-overlay { 
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.7); z-index: 99998; backdrop-filter: blur(5px); 
        justify-content: center; align-items: center; padding: 20px;
    }
    .language-modal { 
        background: #0a0a12; padding: 25px; border-radius: 20px; 
        width: 100%; max-width: 350px; text-align: center; 
        border: 1px solid var(--border-light);
        box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }
    .language-modal h3 { color: white; margin-bottom: 20px; font-weight: 300; letter-spacing: 1px; }
    
    .lang-option { 
        display: flex; align-items: center; gap: 15px; padding: 12px; margin: 10px 0; 
        background: rgba(255,255,255,0.05); border-radius: 10px; cursor: pointer; 
        transition: 0.2s; border: 1px solid transparent; color: white;
    }
    .lang-option:hover { border-color: var(--primary); background: rgba(78, 84, 200, 0.15); }
    .lang-option span { font-size: 15px; text-align: left; }
    
    .close-btn {
        margin-top:15px; width:100%; padding:12px; border:none; 
        background: var(--primary); color: white; border-radius: 8px; 
        cursor:pointer; font-weight:bold; transition: 0.3s;
    }
    .close-btn:hover { background: var(--accent); color: black; }
    
    /* بانر الكوكيز (Dark Glass) */
    .cookie-banner { 
        position: fixed; bottom: -400px; left: 0; width: 100%; 
        background: rgba(10, 10, 18, 0.98); backdrop-filter: blur(20px); 
        padding: 20px; box-shadow: 0 -10px 30px rgba(0,0,0,0.4); z-index: 99997; 
        transition: bottom 0.5s ease; text-align: center; 
        border-top: 2px solid var(--primary); color: white; display: none;
    }
    .cookie-banner.visible { display: flex; bottom: 0; }
    .cookie-banner h3 { color: var(--accent); margin: 0 0 10px 0; }
    .cookie-banner p { color: #ccc; font-size: 13px; margin: 0 0 15px 0; }
    
    .cookie-actions { display: flex; gap: 10px; margin-top: 10px; justify-content: center; flex-wrap: wrap; }
    .btn-accept { background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: bold; }
    .btn-reject { background: transparent; border: 1px solid #555; color: #aaa; padding: 10px 25px; border-radius: 50px; cursor: pointer; }
    .btn-reject:hover { border-color: white; color: white; }

    .legal-links a { color: var(--accent); text-decoration: none; font-size: 12px; margin: 0 5px; opacity: 0.8; }
    .legal-links a:hover { opacity: 1; text-decoration: underline; }

    @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection
// ==========================================
function injectUI() {
    // 1. زر الإعدادات
    if (!document.querySelector('.settings-btn')) {
        const btn = document.createElement('div');
        btn.className = 'settings-btn';
        btn.innerHTML = '<i class="fas fa-cog"></i>';
        btn.onclick = window.toggleLangModal;
        document.body.appendChild(btn);
    }
    // 2. نافذة اللغات
    if (!document.getElementById('langModal')) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'langModal';
        modal.onclick = (e) => { if(e.target === modal) window.toggleLangModal(); };
        modal.innerHTML = `
            <div class="language-modal">
                <h3 data-i18n="settingsTitle">Language</h3>
                <div class="lang-option" onclick="window.changeLanguage('en')">
                    <span class="flag-icon flag-icon-us"></span><span>English (US)</span>
                </div>
                <div class="lang-option" onclick="window.changeLanguage('ar')">
                    <span class="flag-icon flag-icon-sa"></span><span>العربية (KSA)</span>
                </div>
                <div class="lang-option" onclick="window.changeLanguage('ru')">
                    <span class="flag-icon flag-icon-ru"></span><span>Русский (RU)</span>
                </div>
                <button class="close-btn" onclick="window.toggleLangModal()">Close</button>
            </div>`;
        document.body.appendChild(modal);
    }
    // 3. الكوكيز
    if (!document.getElementById('cookieBanner')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div>
                <h3 data-i18n="cookieTitle">Privacy</h3>
                <p data-i18n="cookieText">We use cookies.</p>
                <div class="legal-links">
                    <a href="privacypolicy.html" target="_blank" data-i18n="privacy">Privacy</a> | 
                    <a href="Terms-of-Service.html" target="_blank" data-i18n="terms">Terms</a>
                </div>
                <div class="cookie-actions">
                    <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Deny</button>
                    <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept</button>
                </div>
            </div>`;
        document.body.appendChild(banner);
    }
}

window.toggleLangModal = function() {
    const modal = document.getElementById('langModal');
    if(modal) modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
};

// ==========================================
// 3. Full Translation Dictionary (الترجمة الكاملة)
// ==========================================
const translations = {
    en: {
        // Settings & Cookie
        settingsTitle: "Language Settings", 
        cookieTitle: "Privacy Protocol", 
        cookieText: "We utilize advanced cookies to optimize system performance and ensure security.", 
        cookieAccept: "Accept Protocol", 
        cookieReject: "Deny", 
        privacy: "Privacy Policy", 
        terms: "Terms of Service",
        
        // Navigation
        navHome: "Home", 
        navDash: "Dashboard", 
        navTools: "Web Tools", 
        navAI: "AI Services", 
        navDev: "Dev Services", 
        navSec: "Security", 
        navSet: "Settings",
        
        // Hero Section
        heroTitle: "NEXT GEN DIGITAL SOLUTIONS", 
        heroDesc: "Advanced Web Tools, Custom AI Models, and Professional Development Services. Secured by Military-Grade Encryption.", 
        heroBtn: "Access Console",
        
        // Stats
        statUptime: "Uptime", 
        statUsers: "Active Users", 
        statSecure: "Encryption",
        
        // Services
        servicesTitle: "Professional Services",
        cardWebTitle: "Web Tools", 
        cardWebDesc: "Advanced format converters, code minifiers, and SEO analyzers.",
        cardAITitle: "AI Solutions", 
        cardAIDesc: "Image generation, text analysis, and automation powered by neural networks.",
        cardDevTitle: "Manual Dev", 
        cardDevDesc: "Hire us to build custom Web Apps, Discord Bots, and scripts.",
        cardSecTitle: "Iron-Clad Security", 
        cardSecDesc: "Protected against DDoS, SQL Injection, and XSS.",
        cardBotTitle: "Discord Bots", 
        cardBotDesc: "Custom bots with music, moderation, and economy systems.",
        cardFastTitle: "Fast Performance", 
        cardFastDesc: "Optimized for speed. Responding in milliseconds via Global CDN.",
        
        // Login Page
        loginTitle: "Secure Login",
        googleBtn: "Continue with Google",
        linkedinBtn: "Continue with LinkedIn",
        githubBtn: "Continue with GitHub",
        secureNote: "Authenticated via OAuth 2.0",
        
        // Dashboard / Menu
        profileTitle: "User Profile",
        loading: "Loading Profile...",
        nameLabel: "NAME",
        emailLabel: "EMAIL",
        rankLabel: "RANK",
        logout: "Logout System",
        
        // Footer
        footerRights: "© 2025 Sky Data Inc. All Rights Reserved.",
        footerSec: "Secured Connection • End-to-End Encrypted"
    },
    ar: {
        // إعدادات وكوكيز
        settingsTitle: "إعدادات اللغة", 
        cookieTitle: "بروتوكول الخصوصية", 
        cookieText: "نستخدم ملفات تعريف الارتباط المتقدمة لتحسين أداء النظام وضمان الأمان.", 
        cookieAccept: "قبول البروتوكول", 
        cookieReject: "رفض", 
        privacy: "سياسة الخصوصية", 
        terms: "شروط الخدمة",
        
        // القائمة الجانبية
        navHome: "الرئيسية", 
        navDash: "لوحة التحكم", 
        navTools: "أدوات الويب", 
        navAI: "خدمات الذكاء", 
        navDev: "خدمات التطوير", 
        navSec: "الحماية والأمان", 
        navSet: "الإعدادات",
        
        // واجهة الهيرو
        heroTitle: "حلول رقمية من الجيل القادم", 
        heroDesc: "أدوات ويب متقدمة، نماذج ذكاء اصطناعي مخصصة، وخدمات تطوير احترافية. مؤمنة بتشفير عسكري.", 
        heroBtn: "الدخول للمنصة",
        
        // الإحصائيات
        statUptime: "وقت التشغيل", 
        statUsers: "مستخدم نشط", 
        statSecure: "تشفير عالي",
        
        // الخدمات
        servicesTitle: "خدماتنا الاحترافية",
        cardWebTitle: "أدوات الويب", 
        cardWebDesc: "محولات صيغ متقدمة، ضغط الأكواد، وتحليل SEO للمحترفين.",
        cardAITitle: "حلول الذكاء", 
        cardAIDesc: "توليد الصور، تحليل النصوص، والأتمتة المدعومة بالشبكات العصبية.",
        cardDevTitle: "تطوير يدوي", 
        cardDevDesc: "وظفنا لبناء تطبيقات ويب مخصصة، بوتات ديسكورد، وسكربتات.",
        cardSecTitle: "حماية فولاذية", 
        cardSecDesc: "حماية ضد DDoS، حقن SQL، وثغرات XSS. خصوصيتك أولويتنا.",
        cardBotTitle: "بوتات ديسكورد", 
        cardBotDesc: "بوتات مخصصة مع أنظمة الموسيقى، الإدارة، والاقتصاد.",
        cardFastTitle: "أداء فائق السرعة", 
        cardFastDesc: "محسن للسرعة. استجابة في أجزاء من الثانية عبر CDN عالمي.",
        
        // صفحة الدخول
        loginTitle: "تسجيل دخول آمن",
        googleBtn: "المتابعة باستخدام جوجل",
        linkedinBtn: "المتابعة باستخدام لينكد إن",
        githubBtn: "المتابعة باستخدام غيت هاب",
        secureNote: "مصادقة آمنة عبر بروتوكول OAuth 2.0",
        
        // لوحة التحكم
        profileTitle: "الملف الشخصي",
        loading: "جاري تحميل البيانات...",
        nameLabel: "الاسم المسجل",
        emailLabel: "البريد الإلكتروني",
        rankLabel: "الرتبة الحالية",
        logout: "تسجيل الخروج",
        
        // التذييل
        footerRights: "© 2025 Sky Data Inc. جميع الحقوق محفوظة.",
        footerSec: "اتصال آمن • مشفر من الطرف للطرف"
    },
    ru: {
        // Настройки и Cookie
        settingsTitle: "Настройки языка", 
        cookieTitle: "Протокол конфиденциальности", 
        cookieText: "Мы используем передовые файлы cookie для оптимизации производительности системы и обеспечения безопасности.", 
        cookieAccept: "Принять", 
        cookieReject: "Отклонить", 
        privacy: "Политика конфиденциальности", 
        terms: "Условия использования",
        
        // Навигация
        navHome: "Главная", 
        navDash: "Панель", 
        navTools: "Веб-инструменты", 
        navAI: "AI Сервисы", 
        navDev: "Разработка", 
        navSec: "Безопасность", 
        navSet: "Настройки",
        
        // Hero
        heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ НОВОГО ПОКОЛЕНИЯ", 
        heroDesc: "Передовые веб-инструменты, пользовательские AI модели и профессиональная разработка. Защищено военным шифрованием.", 
        heroBtn: "Войти в консоль",
        
        // Статистика
        statUptime: "Аптайм", 
        statUsers: "Активные пользователи", 
        statSecure: "Шифрование",
        
        // Сервисы
        servicesTitle: "Профессиональные услуги",
        cardWebTitle: "Веб-инструменты", 
        cardWebDesc: "Конвертеры форматов, минификация кода и SEO анализ.",
        cardAITitle: "AI Решения", 
        cardAIDesc: "Генерация изображений, анализ текста и автоматизация на нейросетях.",
        cardDevTitle: "Ручная разработка", 
        cardDevDesc: "Создание кастомных веб-приложений, ботов Discord и скриптов.",
        cardSecTitle: "Железная защита", 
        cardSecDesc: "Защита от DDoS, SQL Injection и XSS. Конфиденциальность превыше всего.",
        cardBotTitle: "Discord Боты", 
        cardBotDesc: "Кастомные боты с системами музыки, модерации и экономики.",
        cardFastTitle: "Быстрая скорость", 
        cardFastDesc: "Оптимизировано для скорости. Глобальный CDN.",
        
        // Вход
        loginTitle: "Безопасный вход",
        googleBtn: "Войти через Google",
        linkedinBtn: "Войти через LinkedIn",
        githubBtn: "Войти через GitHub",
        secureNote: "Авторизация через OAuth 2.0",
        
        // Профиль
        profileTitle: "Профиль пользователя",
        loading: "Загрузка профиля...",
        nameLabel: "ИМЯ",
        emailLabel: "EMAIL",
        rankLabel: "РАНГ",
        logout: "Выйти из системы",
        
        // Футер
        footerRights: "© 2025 Sky Data Inc. Все права защищены.",
        footerSec: "Безопасное соединение • Сквозное шифрование"
    }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang);
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT') el.placeholder = dict[key];
            else el.innerText = dict[key];
        }
    });
    
    const modal = document.getElementById('langModal');
    if(modal) modal.style.display = 'none';
};

// ==========================================
// 4. Cookie Logic (Corrected)
// ==========================================
window.handleCookieChoice = function(choice) {
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('visible'); 
    setTimeout(() => { banner.style.display = 'none'; }, 500); 
    localStorage.setItem('skydata_cookie_consent', choice === 'accept' ? 'accepted' : 'rejected');
};

function checkCookieStatus() {
    const consent = localStorage.getItem('skydata_cookie_consent');
    const banner = document.getElementById('cookieBanner');
    
    if (consent) {
        // إذا كان هناك قرار، لا تظهر البانر أبداً
        if (banner) banner.style.display = 'none';
    } else {
        // إذا لم يكن هناك قرار، أظهره
        if (banner) {
            banner.style.display = 'flex';
            setTimeout(() => { banner.classList.add('visible'); }, 1500);
        }
    }
}

// ==========================================
// 5. OneSignal & Init
// ==========================================
function initNotifications() {
    const script = document.createElement('script');
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({
            appId: "201dc615-587a-4e1c-a979-8b9d80667386",
            notifyButton: { enable: false },
            allowLocalhostAsSecureOrigin: true,
        });
    });
}

(function init() {
    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);
        
        // تشغيل التحقق من الكوكيز
        checkCookieStatus();
        
        initNotifications();
    });
})();