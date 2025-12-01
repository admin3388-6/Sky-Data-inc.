// ==========================================
// 1. Global Styles (الستايل الأساسي - Dark Mode Only)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@300;500;700&display=swap');

    :root { 
        --primary: #4e54c8; 
        --accent: #00d2ff;
        --bg-dark: #0a0a12;
        --text-white: #ffffff;
        --text-muted: #8b9bb4;
        --glass: rgba(255, 255, 255, 0.03);
        --border: rgba(255, 255, 255, 0.08);
        --card-bg: rgba(10, 10, 18, 0.95);
        --sidebar-bg: rgba(10, 10, 18, 0.95);
        --shadow: 0 10px 40px rgba(0,0,0,0.5);
    }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; transition: 0.3s; }
    html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    
    body { 
        font-family: 'Outfit', sans-serif; 
        background-color: var(--bg-dark); 
        color: var(--text-white); 
    }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* شاشة التحميل (Loader) */
    .global-loader { 
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: var(--bg-dark); z-index: 999999; 
        display: none; justify-content: center; align-items: center; flex-direction: column; 
    }
    .spinner { 
        width: 50px; height: 50px; border: 3px solid var(--border); 
        border-left-color: var(--accent); border-radius: 50%; 
        animation: spin 0.8s linear infinite; 
    }
    
    /* بانر الكوكيز */
    .cookie-banner { 
        position: fixed; bottom: -400px; left: 0; width: 100%; 
        background: var(--card-bg); backdrop-filter: blur(20px); 
        padding: 25px; box-shadow: 0 -5px 30px rgba(0,0,0,0.15); z-index: 99997; 
        transition: bottom 0.5s ease; text-align: center; 
        border-top: 3px solid var(--primary); color: var(--text-white); display: none; 
    }
    .cookie-banner.visible { display: flex; bottom: 0; }
    .cookie-banner h3 { color: var(--accent); margin-bottom: 10px; }
    .cookie-banner p { color: var(--text-muted); margin-bottom: 20px; font-size: 14px; }
    
    .btn-accept { background: var(--primary); color: white; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: bold; }
    .btn-reject { background: transparent; border: 1px solid #888; color: #888; padding: 10px 25px; border-radius: 50px; cursor: pointer; }

    @keyframes spin { 100% { transform: rotate(360deg); } }
`;

// حقن الستايل
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection (اللودر والكوكيز فقط)
// ==========================================
function injectUI() {
    // 1. اللودر
    if (!document.getElementById('globalLoader')) { 
        const loader = document.createElement('div'); 
        loader.className = 'global-loader'; 
        loader.id = 'globalLoader'; 
        loader.innerHTML = `<div class="spinner"></div>`; 
        document.body.appendChild(loader); 
    }

    // 2. الكوكيز
    if (!document.getElementById('cookieBanner')) { 
        const banner = document.createElement('div'); 
        banner.className = 'cookie-banner'; 
        banner.id = 'cookieBanner'; 
        banner.innerHTML = `
            <div>
                <h3 data-i18n="cookieTitle">Privacy</h3>
                <p data-i18n="cookieText">We use cookies to save your progress.</p>
                <div style="margin-bottom:15px; font-size:12px;">
                    <a href="terms.html" style="color:var(--accent)">Terms</a> | <a href="privacy.html" style="color:var(--accent)">Privacy</a>
                </div>
                <div style="display:flex;gap:10px;justify-content:center;">
                    <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Deny</button>
                    <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept</button>
                </div>
            </div>`; 
        document.body.appendChild(banner); 
    }
}

// ==========================================
// 3. Helper Functions
// ==========================================
window.navigateTo = function(url) {
    const loader = document.getElementById('globalLoader');
    if(loader) { 
        loader.style.display = 'flex'; 
        setTimeout(() => { window.location.href = url; }, 500); 
    } else {
        window.location.href = url;
    }
};

window.handleCookieChoice = function(choice) {
    document.getElementById('cookieBanner').classList.remove('visible');
    setTimeout(() => document.getElementById('cookieBanner').style.display = 'none', 500);
    localStorage.setItem('skydata_cookie_consent', choice);
};

// ==========================================
// 4. Translation Dictionary (القاموس الكامل)
// ==========================================
const translations = {
    en: { 
        cookieTitle: "Privacy Policy", cookieText: "We use cookies to improve your experience.", cookieAccept: "Accept", cookieReject: "Deny",
        heroTitle: "NEXT GEN DIGITAL SOLUTIONS", heroDesc: "Advanced Web Tools & AI.", heroBtnLogin: "Access Console", heroBtnDash: "Go to Dashboard", 
        navHome: "Home", navDash: "Dashboard", navTools: "Tools", navAI: "AI", navDev: "Dev", navSec: "Security", navSet: "Settings", 
        statUptime: "Uptime", statUsers: "Users", statSecure: "Encrypted", 
        servicesTitle: "Services", cardWebTitle: "Web Tools", cardWebDesc: "Converters.", cardAITitle: "AI", cardAIDesc: "Generation.", cardDevTitle: "Dev", cardDevDesc: "Custom Apps.", cardSecTitle: "Security", cardSecDesc: "Protection.", cardBotTitle: "Bots", cardBotDesc: "Discord Bots.", cardFastTitle: "Speed", cardFastDesc: "CDN.", 
        loginTitle: "Login", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "Agree to Terms", 
        profileTitle: "Profile", nameLabel: "NAME", emailLabel: "EMAIL", rankLabel: "RANK", logout: "Logout", 
        footerRights: "© 2025 Sky Data Inc.", footerSec: "Secured",
        gameScore: "Score", gameXP: "XP", gameShield: "Shield", gameLaunch: "Launch", gameStart: "Start", gameBest: "Best", gameSave: "Save & Exit", gameRetry: "Retry"
    },
    ar: { 
        cookieTitle: "الخصوصية", cookieText: "نستخدم الكوكيز.", cookieAccept: "موافقة", cookieReject: "رفض",
        heroTitle: "حلول رقمية", heroDesc: "أدوات متقدمة.", heroBtnLogin: "دخول", heroBtnDash: "لوحة التحكم", 
        navHome: "الرئيسية", navDash: "لوحة التحكم", navTools: "أدوات", navAI: "ذكاء", navDev: "تطوير", navSec: "أمان", navSet: "إعدادات", 
        statUptime: "تشغيل", statUsers: "مستخدم", statSecure: "تشفير", 
        servicesTitle: "خدماتنا", cardWebTitle: "أدوات الويب", cardWebDesc: "تحويل.", cardAITitle: "ذكاء", cardAIDesc: "توليد.", cardDevTitle: "تطوير", cardDevDesc: "تطبيقات.", cardSecTitle: "حماية", cardSecDesc: "أمان.", cardBotTitle: "بوتات", cardBotDesc: "ديسكورد.", cardFastTitle: "سرعة", cardFastDesc: "سريع.", 
        loginTitle: "دخول", googleBtn: "جوجل", linkedinBtn: "لينكد إن", githubBtn: "غيت هاب", termsText: "موافق", 
        profileTitle: "الملف", nameLabel: "الاسم", emailLabel: "البريد", rankLabel: "الرتبة", logout: "خروج", 
        footerRights: "© 2025 Sky Data", footerSec: "آمن",
        gameScore: "نقاط", gameXP: "خبرة", gameShield: "درع", gameLaunch: "انطلاق", gameStart: "ابدأ", gameBest: "أفضل", gameSave: "حفظ وخروج", gameRetry: "إعادة"
    },
    ru: { 
        cookieTitle: "Приватность", cookieText: "Cookie.", cookieAccept: "Принять", cookieReject: "Отклонить",
        heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ", heroDesc: "Веб и AI.", heroBtnLogin: "Вход", heroBtnDash: "Панель", 
        navHome: "Главная", navDash: "Панель", navTools: "Тулзы", navAI: "AI", navDev: "Код", navSec: "Защита", navSet: "Настройки", 
        statUptime: "Аптайм", statUsers: "Юзеры", statSecure: "Шифрование", 
        servicesTitle: "Услуги", cardWebTitle: "Веб", cardWebDesc: "Анализ.", cardAITitle: "AI", cardAIDesc: "Ген.", cardDevTitle: "Код", cardDevDesc: "Аппы.", cardSecTitle: "Защита", cardSecDesc: "DDoS.", cardBotTitle: "Боты", cardBotDesc: "Дискорд.", cardFastTitle: "Скорость", cardFastDesc: "CDN.", 
        loginTitle: "Вход", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "Согласен", 
        profileTitle: "Профиль", nameLabel: "ИМЯ", emailLabel: "EMAIL", rankLabel: "РАНГ", logout: "Выйти", 
        footerRights: "© 2025 Sky Data", footerSec: "Защищено",
        gameScore: "Счет", gameXP: "Опыт", gameShield: "Щит", gameLaunch: "Пуск", gameStart: "Старт", gameBest: "Лучший", gameSave: "Сохр.", gameRetry: "Повтор"
    }
};

// دالة الترجمة (تلقائية)
window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang); 
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => { 
        const key = el.getAttribute('data-i18n'); 
        if(dict[key]) { 
            if(el.tagName === 'INPUT') el.placeholder = dict[key]; 
            else el.innerText = dict[key]; 
        } 
    });
};

// ==========================================
// 5. Initialization
// ==========================================
function initNotifications() {
    const script = document.createElement('script');
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({ appId: "201dc615-587a-4e1c-a979-8b9d80667386", notifyButton: { enable: false }, allowLocalhostAsSecureOrigin: true });
    });
}

(function init() {
    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        
        // تطبيق اللغة الافتراضية
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);
        
        // الكوكيز
        if (!localStorage.getItem('skydata_cookie_consent')) setTimeout(() => document.getElementById('cookieBanner').classList.add('visible'), 1500);
        
        initNotifications();
    });
})();