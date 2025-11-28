// ==========================================
// 1. Global Styles (تصميم زجاجي مظلم - Dark Glass UI)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@300;500;700&display=swap');

    :root { 
        --primary: #4e54c8; 
        --accent: #00d2ff;
        --glass-dark: rgba(15, 15, 25, 0.85);
        --border-light: rgba(255, 255, 255, 0.1);
        --text-white: #ffffff;
    }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; }
    
    /* الخطوط: Outfit للإنجليزي، Cairo للعربي */
    body { font-family: 'Outfit', sans-serif; }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* زر الإعدادات (تصميم نيون مظلم) */
    .settings-btn { 
        position: fixed; top: 25px; right: 25px; 
        background: var(--glass-dark); backdrop-filter: blur(15px);
        width: 50px; height: 50px; border-radius: 50%; 
        box-shadow: 0 0 20px rgba(78, 84, 200, 0.2); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; z-index: 9999; transition: 0.4s; 
        border: 1px solid var(--border-light);
    }
    .settings-btn i { color: var(--text-white); font-size: 20px; transition: 0.3s; }
    .settings-btn:hover { 
        transform: rotate(90deg) scale(1.1); 
        border-color: var(--accent); 
        box-shadow: 0 0 30px rgba(0, 210, 255, 0.4);
    }
    .settings-btn:hover i { color: var(--accent); }
    
    /* نافذة اللغات (Dark Modal) */
    .modal-overlay { 
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.6); z-index: 9998; backdrop-filter: blur(8px); 
        justify-content: center; align-items: center; 
    }
    .language-modal { 
        background: #0a0a12; padding: 30px; border-radius: 24px; width: 320px; 
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        text-align: center; border: 1px solid var(--border-light);
        box-shadow: 0 20px 50px rgba(0,0,0,0.5);
    }
    .language-modal h3 { color: white; margin-bottom: 20px; font-weight: 300; letter-spacing: 1px; }
    
    .lang-option { 
        display: flex; align-items: center; gap: 15px; padding: 15px; margin: 10px 0; 
        background: rgba(255,255,255,0.03); border-radius: 12px; cursor: pointer; 
        transition: 0.3s; border: 1px solid transparent; color: white;
    }
    .lang-option:hover { 
        border-color: var(--primary); background: rgba(78, 84, 200, 0.1); 
        transform: translateX(5px);
    }
    .close-btn {
        margin-top:15px; width:100%; padding:12px; border:none; 
        background: var(--primary); color: white; border-radius: 8px; 
        cursor:pointer; font-weight:bold; transition: 0.3s;
    }
    .close-btn:hover { background: var(--accent); color: black; }
    
    /* بانر الكوكيز (Dark Glass Banner) */
    .cookie-banner { 
        position: fixed; bottom: -400px; left: 0; width: 100%; 
        background: rgba(10, 10, 18, 0.95); backdrop-filter: blur(20px); 
        padding: 30px; box-shadow: 0 -10px 40px rgba(0,0,0,0.3); z-index: 9997; 
        transition: bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1); 
        display: flex; flex-direction: column; align-items: center; text-align: center; 
        border-top: 1px solid var(--primary); color: white;
    }
    .cookie-banner.show { bottom: 0; }
    .cookie-banner h3 { color: var(--accent); margin-bottom: 10px; }
    .cookie-banner p { color: #ccc; font-size: 14px; max-width: 600px; line-height: 1.6; }
    
    .cookie-actions { display: flex; gap: 15px; margin-top: 20px; }
    .btn-accept { 
        background: linear-gradient(135deg, var(--primary), var(--accent)); 
        color: white; border: none; padding: 12px 30px; border-radius: 50px; 
        cursor: pointer; font-weight: bold; box-shadow: 0 5px 15px rgba(78, 84, 200, 0.3);
    }
    .btn-reject { 
        background: transparent; border: 1px solid #555; color: #aaa; 
        padding: 12px 30px; border-radius: 50px; cursor: pointer; transition: 0.3s;
    }
    .btn-reject:hover { border-color: white; color: white; }
    
    .legal-links a { color: var(--accent); text-decoration: none; font-size: 12px; margin: 0 5px; opacity: 0.8; }
    .legal-links a:hover { opacity: 1; text-decoration: underline; }

    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection (Dark Theme UI)
// ==========================================
function injectUI() {
    if (!document.querySelector('.settings-btn')) {
        const btn = document.createElement('div');
        btn.className = 'settings-btn';
        btn.innerHTML = '<i class="fas fa-cog"></i>';
        btn.onclick = window.toggleLangModal;
        document.body.appendChild(btn);
    }
    if (!document.getElementById('langModal')) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'langModal';
        modal.onclick = (e) => { if(e.target === modal) window.toggleLangModal(); };
        modal.innerHTML = `
            <div class="language-modal">
                <h3 data-i18n="settingsTitle">Language Settings</h3>
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
    if (!document.getElementById('cookieBanner')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div>
                <h3 data-i18n="cookieTitle">Privacy Protocol</h3>
                <p data-i18n="cookieText">We utilize advanced tracking cookies to optimize system performance.</p>
                <div class="legal-links" style="margin:10px 0;">
                    <a href="privacypolicy.html" target="_blank" data-i18n="privacy">Privacy</a> | 
                    <a href="Terms-of-Service.html" target="_blank" data-i18n="terms">Terms</a>
                </div>
                <div class="cookie-actions">
                    <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Deny</button>
                    <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept Protocol</button>
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
// 3. Translation Dictionary (القاموس الشامل)
// ==========================================
const translations = {
    en: {
        settingsTitle: "Language Settings", cookieTitle: "Privacy Protocol", cookieText: "We utilize advanced cookies to optimize system performance and ensure security.", cookieAccept: "Accept Protocol", cookieReject: "Deny", privacy: "Privacy Policy", terms: "Terms of Service",
        // Navbar
        navHome: "Home", navDash: "Dashboard", navTools: "Web Tools", navAI: "AI Services", navDev: "Dev Services", navSec: "Security", navSet: "Settings",
        // Hero
        heroTitle: "NEXT GEN DIGITAL SOLUTIONS", 
        heroDesc: "Advanced Web Tools, Custom AI Models, and Professional Development Services. Secured by Military-Grade Encryption.",
        heroBtn: "Access Console",
        // Stats
        statUptime: "Uptime", statUsers: "Users", statSecure: "AES-256",
        // Sections
        servicesTitle: "Professional Services",
        cardWebTitle: "Web Tools", cardWebDesc: "Advanced format converters, code minifiers, and SEO analyzers.",
        cardAITitle: "AI Solutions", cardAIDesc: "Image generation, text analysis, and automation powered by neural networks.",
        cardDevTitle: "Manual Dev", cardDevDesc: "Hire us to build custom Web Apps, Discord Bots, and scripts.",
        cardSecTitle: "Iron-Clad Security", cardSecDesc: "Protected against DDoS, SQL Injection, and XSS.",
        cardBotTitle: "Discord Bots", cardBotDesc: "Custom bots with music, moderation, and economy systems.",
        cardFastTitle: "Fast Performance", cardFastDesc: "Optimized for speed. Responding in milliseconds via Global CDN.",
        // Footer
        footerRights: "© 2025 Sky Data Inc. All Rights Reserved.",
        footerSec: "Secured Connection • End-to-End Encrypted"
    },
    ar: {
        settingsTitle: "إعدادات اللغة", cookieTitle: "بروتوكول الخصوصية", cookieText: "نستخدم ملفات تعريف ارتباط متقدمة لتحسين أداء النظام وضمان الحماية.", cookieAccept: "قبول البروتوكول", cookieReject: "رفض", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
        // Navbar
        navHome: "الرئيسية", navDash: "لوحة التحكم", navTools: "أدوات الويب", navAI: "خدمات الذكاء", navDev: "خدمات المطورين", navSec: "الحماية", navSet: "الإعدادات",
        // Hero
        heroTitle: "حلول رقمية من الجيل القادم", 
        heroDesc: "أدوات ويب متقدمة، نماذج ذكاء اصطناعي مخصصة، وخدمات تطوير احترافية. مؤمنة بتشفير عسكري.",
        heroBtn: "الدخول للمنصة",
        // Stats
        statUptime: "وقت التشغيل", statUsers: "مستخدم", statSecure: "تشفير عالي",
        // Sections
        servicesTitle: "خدماتنا الاحترافية",
        cardWebTitle: "أدوات الويب", cardWebDesc: "محولات صيغ متقدمة، ضغط الأكواد، وتحليل SEO للمحترفين.",
        cardAITitle: "حلول الذكاء", cardAIDesc: "توليد الصور، تحليل النصوص، والأتمتة المدعومة بالشبكات العصبية.",
        cardDevTitle: "تطوير يدوي", cardDevDesc: "وظفنا لبناء تطبيقات ويب مخصصة، بوتات ديسكورد، وسكربتات.",
        cardSecTitle: "حماية فولاذية", cardSecDesc: "حماية ضد DDoS، حقن SQL، وثغرات XSS. خصوصيتك أولويتنا.",
        cardBotTitle: "بوتات ديسكورد", cardBotDesc: "بوتات مخصصة مع أنظمة الموسيقى، الإدارة، والاقتصاد.",
        cardFastTitle: "أداء فائق السرعة", cardFastDesc: "محسن للسرعة. استجابة في أجزاء من الثانية عبر CDN عالمي.",
        // Footer
        footerRights: "© 2025 Sky Data Inc. جميع الحقوق محفوظة.",
        footerSec: "اتصال آمن • مشفر من الطرف للطرف"
    },
    ru: {
        settingsTitle: "Настройки языка", cookieTitle: "Протокол конфиденциальности", cookieText: "Мы используем передовые cookie для оптимизации системы.", cookieAccept: "Принять", cookieReject: "Отклонить", privacy: "Политика", terms: "Условия",
        // Navbar
        navHome: "Главная", navDash: "Панель", navTools: "Веб-инструменты", navAI: "AI Сервисы", navDev: "Разработка", navSec: "Безопасность", navSet: "Настройки",
        // Hero
        heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ НОВОГО ПОКОЛЕНИЯ", 
        heroDesc: "Передовые веб-инструменты, AI модели и профессиональная разработка. Защищено военным шифрованием.",
        heroBtn: "Войти в консоль",
        // Stats
        statUptime: "Аптайм", statUsers: "Пользователи", statSecure: "AES-256",
        // Sections
        servicesTitle: "Профессиональные услуги",
        cardWebTitle: "Веб-инструменты", cardWebDesc: "Конвертеры форматов, минификация кода и SEO анализ.",
        cardAITitle: "AI Решения", cardAIDesc: "Генерация изображений, анализ текста и автоматизация.",
        cardDevTitle: "Ручная разработка", cardDevDesc: "Создание веб-приложений, ботов Discord и скриптов.",
        cardSecTitle: "Железная защита", cardSecDesc: "Защита от DDoS, SQL Injection и XSS.",
        cardBotTitle: "Discord Боты", cardBotDesc: "Кастомные боты с музыкой, модерацией и экономикой.",
        cardFastTitle: "Быстрая скорость", cardFastDesc: "Оптимизировано для скорости. Глобальный CDN.",
        // Footer
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
    
    // إخفاء النافذة
    const modal = document.getElementById('langModal');
    if(modal) modal.style.display = 'none';
};

window.handleCookieChoice = function(choice) {
    document.getElementById('cookieBanner').classList.remove('show');
    localStorage.setItem('skydata_cookie_consent', choice === 'accept' ? 'accepted' : 'rejected');
};

// ==========================================
// 4. OneSignal (Without Penalty)
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
        // طلب لطيف مرة واحدة
        const permission = OneSignal.Notifications.permission;
        if (permission === 'default') {
            setTimeout(() => { OneSignal.Notifications.requestPermission(); }, 4000);
        }
    });
}

// ==========================================
// 5. Init
// ==========================================
(function init() {
    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);
        if (!localStorage.getItem('skydata_cookie_consent')) {
            setTimeout(() => {
                const banner = document.getElementById('cookieBanner');
                if(banner) banner.classList.add('show');
            }, 1500);
        }
        initNotifications();
    });
})();