// ==========================================
// 1. Global Styles (نظام الألوان المتجاوب + إصلاحات الموبايل)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@300;500;700&display=swap');

    :root { 
        /* الوضع الداكن (الافتراضي) */
        --primary: #4e54c8; 
        --accent: #00d2ff;
        --bg-color: #0a0a12;
        --text-main: #ffffff;
        --text-muted: #a0a0a0;
        --card-bg: rgba(255, 255, 255, 0.03);
        --card-border: rgba(255, 255, 255, 0.1);
        --sidebar-bg: rgba(10, 10, 18, 0.95);
        --shadow: 0 10px 40px rgba(0,0,0,0.5);
        --btn-text: #ffffff;
    }

    /* الوضع الساطع (Light Mode) - إصلاح اختفاء النصوص */
    [data-theme="light"] {
        --primary: #4e54c8;
        --accent: #2962ff;
        --bg-color: #f4f7f6; /* خلفية رمادية فاتحة جداً */
        --text-main: #1a1a2e; /* نص أسود غامق */
        --text-muted: #555555; /* نص رمادي غامق */
        --card-bg: #ffffff; /* بطاقة بيضاء صلبة */
        --card-border: rgba(0, 0, 0, 0.08);
        --sidebar-bg: #ffffff;
        --shadow: 0 10px 30px rgba(0,0,0,0.08);
        --btn-text: #ffffff;
    }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; transition: background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s; }
    html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    
    body { 
        font-family: 'Outfit', sans-serif; 
        background-color: var(--bg-color); 
        color: var(--text-main);
    }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* --- أزرار النظام العائمة (الثيم واللغة) --- */
    .system-controls {
        position: fixed; top: 20px; right: 20px; z-index: 99999;
        display: flex; gap: 10px;
    }

    .icon-btn { 
        background: var(--card-bg); 
        width: 45px; height: 45px; border-radius: 50%; 
        box-shadow: var(--shadow); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; transition: 0.3s; 
        border: 1px solid var(--card-border);
        color: var(--text-main);
    }
    .icon-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

    /* --- زر الدعم الجديد (أنيق وغير مزعج) --- */
    .support-float {
        position: fixed; bottom: 20px; right: 20px; /* تم النقل لليمين */
        width: 50px; height: 50px; border-radius: 50%;
        background: var(--card-bg); color: var(--text-main);
        display: flex; align-items: center; justify-content: center;
        text-decoration: none; border: 1px solid var(--card-border);
        box-shadow: var(--shadow); z-index: 99990;
        transition: 0.3s; font-size: 20px;
    }
    .support-float:hover { background: var(--primary); color: white; border-color: var(--primary); transform: scale(1.1); }

    /* --- Loader --- */
    .global-loader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-color); z-index: 999999; display: none; justify-content: center; align-items: center; flex-direction: column; }
    .spinner { width: 50px; height: 50px; border: 3px solid var(--card-border); border-left-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
    
    /* --- Modals (اللغة والكوكيز) --- */
    .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99998; backdrop-filter: blur(5px); justify-content: center; align-items: center; padding: 20px; }
    .language-modal { background: var(--card-bg); padding: 25px; border-radius: 20px; width: 100%; max-width: 320px; text-align: center; border: 1px solid var(--card-border); box-shadow: var(--shadow); }
    .language-modal h3 { color: var(--text-main); margin-bottom: 20px; }
    
    .lang-option { display: flex; align-items: center; gap: 15px; padding: 12px; margin: 10px 0; background: rgba(128,128,128,0.1); border-radius: 12px; cursor: pointer; color: var(--text-main); border: 1px solid transparent; }
    .lang-option:hover { border-color: var(--primary); background: rgba(78, 84, 200, 0.1); }
    
    .cookie-banner { position: fixed; bottom: -400px; left: 0; width: 100%; background: var(--card-bg); backdrop-filter: blur(20px); padding: 25px; box-shadow: 0 -5px 30px rgba(0,0,0,0.15); z-index: 99997; transition: bottom 0.5s ease; text-align: center; border-top: 3px solid var(--primary); color: var(--text-main); display: none; }
    .cookie-banner.visible { display: flex; bottom: 0; }
    .cookie-banner h3 { color: var(--accent); margin-bottom: 10px; }
    .cookie-banner p { color: var(--text-muted); margin-bottom: 20px; font-size: 14px; }
    
    .btn-accept { background: var(--primary); color: white; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: bold; }
    .btn-reject { background: transparent; border: 1px solid var(--text-muted); color: var(--text-muted); padding: 10px 25px; border-radius: 50px; cursor: pointer; }

    @keyframes spin { 100% { transform: rotate(360deg); } }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection
// ==========================================
function injectUI() {
    // 1. أزرار التحكم العلوية
    if (!document.querySelector('.system-controls')) {
        const controls = document.createElement('div');
        controls.className = 'system-controls';
        controls.innerHTML = `
            <div class="icon-btn" onclick="window.toggleTheme()" title="Theme"><i class="fas fa-moon" id="themeIcon"></i></div>
            <div class="icon-btn" onclick="window.toggleLangModal()" title="Lang"><i class="fas fa-globe"></i></div>
        `;
        document.body.appendChild(controls);
    }

    // 2. زر الدعم (الجديد في اليمين)
    if (!document.querySelector('.support-float')) {
        const supportBtn = document.createElement('a');
        supportBtn.href = "support.html";
        supportBtn.className = "support-float";
        supportBtn.innerHTML = `<i class="fas fa-headset"></i>`; // أيقونة فقط لتكون أنيقة
        document.body.appendChild(supportBtn);
    }

    // 3. اللودر والنوافذ
    if (!document.getElementById('globalLoader')) {
        const loader = document.createElement('div');
        loader.className = 'global-loader'; loader.id = 'globalLoader';
        loader.innerHTML = `<div class="spinner"></div>`;
        document.body.appendChild(loader);
    }
    
    if (!document.getElementById('langModal')) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay'; modal.id = 'langModal';
        modal.onclick = (e) => { if(e.target === modal) window.toggleLangModal(); };
        modal.innerHTML = `
            <div class="language-modal">
                <h3 data-i18n="settingsTitle">Language</h3>
                <div class="lang-option" onclick="window.changeLanguage('en')"><span class="flag-icon flag-icon-us"></span><span>English</span></div>
                <div class="lang-option" onclick="window.changeLanguage('ar')"><span class="flag-icon flag-icon-sa"></span><span>العربية</span></div>
                <div class="lang-option" onclick="window.changeLanguage('ru')"><span class="flag-icon flag-icon-ru"></span><span>Русский</span></div>
            </div>`;
        document.body.appendChild(modal);
    }

    if (!document.getElementById('cookieBanner')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner'; banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div>
                <h3 data-i18n="cookieTitle">Privacy</h3>
                <p data-i18n="cookieText">Cookies help us improve.</p>
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
// 3. Logic (Theme & Functions)
// ==========================================
window.toggleTheme = function() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('skydata_theme', newTheme);
    
    if (newTheme === 'light') {
        icon.className = 'fas fa-sun';
        icon.style.color = 'orange';
    } else {
        icon.className = 'fas fa-moon';
        icon.style.color = 'white';
    }
};

window.navigateTo = function(url) {
    const loader = document.getElementById('globalLoader');
    if(loader) { loader.style.display = 'flex'; setTimeout(() => { window.location.href = url; }, 500); }
    else window.location.href = url;
};

window.toggleLangModal = function() {
    const modal = document.getElementById('langModal');
    if(modal) modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
};

// ==========================================
// 4. Translation
// ==========================================
const translations = {
    en: {
        settingsTitle: "Language", cookieTitle: "Privacy Policy", cookieText: "We use cookies to improve your experience. By using our site, you agree to our Terms.", cookieAccept: "Accept", cookieReject: "Deny",
        navHome: "Home", navDash: "Dashboard", navTools: "Tools", navAI: "AI", navDev: "Dev", navSec: "Security", navSet: "Settings",
        heroTitle: "NEXT GEN DIGITAL SOLUTIONS", heroDesc: "Advanced Web Tools & AI Services.", heroBtnLogin: "Access Console", heroBtnDash: "Go to Dashboard",
        statUptime: "Uptime", statUsers: "Users", statSecure: "Encryption",
        servicesTitle: "Our Services",
        cardWebTitle: "Web Tools", cardWebDesc: "Converters and Analyzers.",
        cardAITitle: "AI Solutions", cardAIDesc: "Image Generation.",
        cardDevTitle: "Development", cardDevDesc: "Custom Apps & Bots.",
        cardSecTitle: "Security", cardSecDesc: "DDoS Protection.",
        cardBotTitle: "Discord Bots", cardBotDesc: "Moderation Bots.",
        cardFastTitle: "Speed", cardFastDesc: "Global CDN.",
        loginTitle: "Login", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "I agree to Terms & Privacy",
        profileTitle: "My Profile", nameLabel: "NAME", emailLabel: "EMAIL", rankLabel: "RANK", logout: "Logout",
        footerRights: "© 2025 Sky Data Inc.", footerSec: "Secured Connection"
    },
    ar: {
        settingsTitle: "اللغة", cookieTitle: "سياسة الخصوصية", cookieText: "نستخدم الكوكيز لتحسين تجربتك. استخدامك للموقع يعني موافقتك على الشروط.", cookieAccept: "موافقة", cookieReject: "رفض",
        navHome: "الرئيسية", navDash: "لوحة التحكم", navTools: "الأدوات", navAI: "الذكاء", navDev: "تطوير", navSec: "أمان", navSet: "إعدادات",
        heroTitle: "حلول رقمية متطورة", heroDesc: "أدوات ويب وذكاء اصطناعي.", heroBtnLogin: "دخول المنصة", heroBtnDash: "لوحة التحكم",
        statUptime: "وقت التشغيل", statUsers: "مستخدم", statSecure: "تشفير",
        servicesTitle: "خدماتنا",
        cardWebTitle: "أدوات الويب", cardWebDesc: "تحويل وتحليل.",
        cardAITitle: "حلول الذكاء", cardAIDesc: "توليد صور.",
        cardDevTitle: "تطوير", cardDevDesc: "تطبيقات وبوتات.",
        cardSecTitle: "حماية", cardSecDesc: "حماية من الهجمات.",
        cardBotTitle: "بوتات ديسكورد", cardBotDesc: "بوتات إدارة.",
        cardFastTitle: "سرعة", cardFastDesc: "استجابة فورية.",
        loginTitle: "تسجيل الدخول", googleBtn: "جوجل", linkedinBtn: "لينكد إن", githubBtn: "غيت هاب", termsText: "أوافق على الشروط والسياسة",
        profileTitle: "الملف الشخصي", nameLabel: "الاسم", emailLabel: "البريد", rankLabel: "الرتبة", logout: "خروج",
        footerRights: "© 2025 Sky Data Inc.", footerSec: "اتصال آمن"
    },
    ru: {
        settingsTitle: "Язык", cookieTitle: "Приватность", cookieText: "Мы используем cookie.", cookieAccept: "Принять", cookieReject: "Отклонить",
        navHome: "Главная", navDash: "Панель", navTools: "Тулзы", navAI: "AI", navDev: "Код", navSec: "Защита", navSet: "Настройки",
        heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ", heroDesc: "Веб-инструменты и AI.", heroBtnLogin: "Войти", heroBtnDash: "Панель",
        statUptime: "Аптайм", statUsers: "Юзеры", statSecure: "Шифрование",
        servicesTitle: "Услуги",
        cardWebTitle: "Веб-тулзы", cardWebDesc: "Конвертеры.",
        cardAITitle: "AI Решения", cardAIDesc: "Генерация.",
        cardDevTitle: "Разработка", cardDevDesc: "Веб-аппы.",
        cardSecTitle: "Защита", cardSecDesc: "От DDoS.",
        cardBotTitle: "Боты", cardBotDesc: "Музыка.",
        cardFastTitle: "Скорость", cardFastDesc: "CDN.",
        loginTitle: "Вход", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "Я согласен с условиями",
        profileTitle: "Профиль", nameLabel: "ИМЯ", emailLabel: "EMAIL", rankLabel: "РАНГ", logout: "Выйти",
        footerRights: "© 2025 Sky Data Inc.", footerSec: "Безопасное соединение"
    }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang);
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if(el.tagName === 'INPUT') el.placeholder = dict[key]; else el.innerText = dict[key];
        }
    });
    document.getElementById('langModal').style.display = 'none';
};

window.handleCookieChoice = function(choice) {
    document.getElementById('cookieBanner').classList.remove('visible');
    setTimeout(() => document.getElementById('cookieBanner').style.display = 'none', 500);
    localStorage.setItem('skydata_cookie_consent', choice === 'accept' ? 'accepted' : 'rejected');
};

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
        const savedTheme = localStorage.getItem('skydata_theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        const icon = document.getElementById('themeIcon');
        if(icon) { icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon'; icon.style.color = savedTheme === 'light' ? 'orange' : 'white'; }

        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);
        if (!localStorage.getItem('skydata_cookie_consent')) setTimeout(() => document.getElementById('cookieBanner').classList.add('visible'), 1500);
        initNotifications();
    });
})();