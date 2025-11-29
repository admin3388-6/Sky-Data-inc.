const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@300;500;700&display=swap');

    :root { 
        /* الوضع الداكن */
        --primary: #4e54c8; 
        --accent: #00d2ff;
        --bg-color: #0a0a12;
        --text-main: #ffffff;
        --text-muted: #a0a0a0;
        --card-bg: rgba(255, 255, 255, 0.03);
        --card-border: rgba(255, 255, 255, 0.1);
        --sidebar-bg: rgba(10, 10, 18, 0.95);
        --shadow: 0 10px 40px rgba(0,0,0,0.5);
        --btn-glass: rgba(255, 255, 255, 0.1);
    }

    /* الوضع الساطع */
    [data-theme="light"] {
        --primary: #4e54c8;
        --accent: #2962ff;
        --bg-color: #f4f7f6;
        --text-main: #1a1a2e;
        --text-muted: #555555;
        --card-bg: #ffffff;
        --card-border: rgba(0, 0, 0, 0.08);
        --sidebar-bg: #ffffff;
        --shadow: 0 10px 30px rgba(0,0,0,0.08);
        --btn-glass: rgba(0, 0, 0, 0.05);
    }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; transition: background-color 0.3s, color 0.3s, border-color 0.3s; }
    html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    
    body { font-family: 'Outfit', sans-serif; background-color: var(--bg-color); color: var(--text-main); }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* الأزرار العائمة */
    .system-controls { position: fixed; top: 20px; right: 20px; z-index: 99999; display: flex; gap: 10px; }
    .icon-btn { background: var(--card-bg); width: 45px; height: 45px; border-radius: 50%; box-shadow: var(--shadow); display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.3s; border: 1px solid var(--card-border); color: var(--text-main); }
    .icon-btn:hover { border-color: var(--accent); color: var(--accent); transform: translateY(-2px); }

    /* زر الدعم */
    .support-float { position: fixed; bottom: 20px; right: 20px; width: 50px; height: 50px; border-radius: 50%; background: var(--card-bg); color: var(--text-main); display: flex; align-items: center; justify-content: center; text-decoration: none; border: 1px solid var(--card-border); box-shadow: var(--shadow); z-index: 99990; transition: 0.3s; font-size: 20px; }
    .support-float:hover { background: var(--primary); color: white; border-color: var(--primary); transform: scale(1.1); }

    /* Loader & Modals */
    .global-loader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-color); z-index: 999999; display: none; justify-content: center; align-items: center; flex-direction: column; }
    .spinner { width: 50px; height: 50px; border: 3px solid var(--card-border); border-left-color: var(--accent); border-radius: 50%; animation: spin 0.8s linear infinite; }
    
    .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.6); z-index: 99998; backdrop-filter: blur(5px); justify-content: center; align-items: center; padding: 20px; }
    .language-modal { background: var(--card-bg); padding: 25px; border-radius: 20px; width: 100%; max-width: 320px; text-align: center; border: 1px solid var(--card-border); box-shadow: var(--shadow); }
    .language-modal h3 { color: var(--text-main); margin-bottom: 20px; }
    .lang-option { display: flex; align-items: center; gap: 15px; padding: 12px; margin: 10px 0; background: var(--btn-glass); border-radius: 12px; cursor: pointer; transition: 0.2s; border: 1px solid transparent; color: var(--text-main); }
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

function injectUI() {
    if (!document.querySelector('.system-controls')) {
        const controls = document.createElement('div');
        controls.className = 'system-controls';
        controls.innerHTML = `<div class="icon-btn" onclick="window.toggleTheme()"><i class="fas fa-moon" id="themeIcon"></i></div><div class="icon-btn" onclick="window.toggleLangModal()"><i class="fas fa-globe"></i></div>`;
        document.body.appendChild(controls);
    }
    if (!document.querySelector('.support-float')) {
        const supportBtn = document.createElement('a'); supportBtn.href = "support.html"; supportBtn.className = "support-float"; supportBtn.innerHTML = `<i class="fas fa-headset"></i>`; document.body.appendChild(supportBtn);
    }
    if (!document.getElementById('globalLoader')) { const loader = document.createElement('div'); loader.className = 'global-loader'; loader.id = 'globalLoader'; loader.innerHTML = `<div class="spinner"></div>`; document.body.appendChild(loader); }
    if (!document.getElementById('langModal')) { const modal = document.createElement('div'); modal.className = 'modal-overlay'; modal.id = 'langModal'; modal.onclick=(e)=>{if(e.target===modal)window.toggleLangModal()}; modal.innerHTML = `<div class="language-modal"><h3 data-i18n="settingsTitle">Language</h3><div class="lang-option" onclick="window.changeLanguage('en')">English</div><div class="lang-option" onclick="window.changeLanguage('ar')">العربية</div><div class="lang-option" onclick="window.changeLanguage('ru')">Русский</div></div>`; document.body.appendChild(modal); }
    if (!document.getElementById('cookieBanner')) { const banner = document.createElement('div'); banner.className = 'cookie-banner'; banner.id = 'cookieBanner'; banner.innerHTML = `<div><h3 data-i18n="cookieTitle">Privacy</h3><p data-i18n="cookieText">Cookies help us improve.</p><div style="margin-bottom:15px; font-size:12px;"><a href="terms.html" style="color:var(--accent)">Terms</a></div><div style="display:flex;gap:10px;justify-content:center;"><button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Deny</button><button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept</button></div></div>`; document.body.appendChild(banner); }
}

window.toggleTheme = function() {
    const body = document.body; const icon = document.getElementById('themeIcon');
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('skydata_theme', newTheme);
    icon.className = newTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
    icon.style.color = newTheme === 'light' ? 'orange' : 'white';
};

window.navigateTo = function(url) {
    const loader = document.getElementById('globalLoader');
    if(loader) { loader.style.display = 'flex'; setTimeout(() => { window.location.href = url; }, 500); } else window.location.href = url;
};

window.toggleLangModal = function() { const modal = document.getElementById('langModal'); if(modal) modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex'; };

const translations = {
    en: { settingsTitle: "Language", cookieTitle: "Privacy Policy", cookieText: "We use cookies.", cookieAccept: "Accept", cookieReject: "Deny", supportBtn: "Support", heroTitle: "NEXT GEN DIGITAL SOLUTIONS", heroDesc: "Advanced Web Tools & AI.", heroBtnLogin: "Access Console", heroBtnDash: "Dashboard", navHome: "Home", navDash: "Dashboard", navTools: "Tools", navAI: "AI", navDev: "Dev", navSec: "Security", navSet: "Settings", statUptime: "Uptime", statUsers: "Users", statSecure: "Encrypted", servicesTitle: "Services", cardWebTitle: "Web Tools", cardWebDesc: "Converters.", cardAITitle: "AI", cardAIDesc: "Generation.", cardDevTitle: "Dev", cardDevDesc: "Custom Apps.", cardSecTitle: "Security", cardSecDesc: "Protection.", cardBotTitle: "Bots", cardBotDesc: "Discord Bots.", cardFastTitle: "Speed", cardFastDesc: "CDN.", loginTitle: "Login", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "Agree to Terms", profileTitle: "Profile", nameLabel: "NAME", emailLabel: "EMAIL", rankLabel: "RANK", logout: "Logout", footerRights: "© 2025 Sky Data Inc.", footerSec: "Secured" },
    ar: { settingsTitle: "اللغة", cookieTitle: "الخصوصية", cookieText: "نستخدم الكوكيز.", cookieAccept: "موافقة", cookieReject: "رفض", supportBtn: "دعم", heroTitle: "حلول رقمية", heroDesc: "أدوات متقدمة.", heroBtnLogin: "دخول", heroBtnDash: "لوحة التحكم", navHome: "الرئيسية", navDash: "لوحة التحكم", navTools: "أدوات", navAI: "ذكاء", navDev: "تطوير", navSec: "أمان", navSet: "إعدادات", statUptime: "تشغيل", statUsers: "مستخدم", statSecure: "تشفير", servicesTitle: "خدماتنا", cardWebTitle: "أدوات الويب", cardWebDesc: "تحويل.", cardAITitle: "ذكاء", cardAIDesc: "توليد.", cardDevTitle: "تطوير", cardDevDesc: "تطبيقات.", cardSecTitle: "حماية", cardSecDesc: "أمان.", cardBotTitle: "بوتات", cardBotDesc: "ديسكورد.", cardFastTitle: "سرعة", cardFastDesc: "سريع.", loginTitle: "دخول", googleBtn: "جوجل", linkedinBtn: "لينكد إن", githubBtn: "غيت هاب", termsText: "موافق", profileTitle: "الملف", nameLabel: "الاسم", emailLabel: "البريد", rankLabel: "الرتبة", logout: "خروج", footerRights: "© 2025 Sky Data", footerSec: "آمن" },
    ru: { settingsTitle: "Язык", cookieTitle: "Приватность", cookieText: "Cookie.", cookieAccept: "Принять", cookieReject: "Отклонить", supportBtn: "Поддержка", heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ", heroDesc: "Веб и AI.", heroBtnLogin: "Вход", heroBtnDash: "Панель", navHome: "Главная", navDash: "Панель", navTools: "Тулзы", navAI: "AI", navDev: "Код", navSec: "Защита", navSet: "Настройки", statUptime: "Аптайм", statUsers: "Юзеры", statSecure: "Шифрование", servicesTitle: "Услуги", cardWebTitle: "Веб", cardWebDesc: "Анализ.", cardAITitle: "AI", cardAIDesc: "Ген.", cardDevTitle: "Код", cardDevDesc: "Аппы.", cardSecTitle: "Защита", cardSecDesc: "DDoS.", cardBotTitle: "Боты", cardBotDesc: "Дискорд.", cardFastTitle: "Скорость", cardFastDesc: "CDN.", loginTitle: "Вход", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "Согласен", profileTitle: "Профиль", nameLabel: "ИМЯ", emailLabel: "EMAIL", rankLabel: "РАНГ", logout: "Выйти", footerRights: "© 2025 Sky Data", footerSec: "Защищено" }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang); document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => { const key = el.getAttribute('data-i18n'); if(dict[key]) { if(el.tagName === 'INPUT') el.placeholder = dict[key]; else el.innerText = dict[key]; } });
    document.getElementById('langModal').style.display = 'none';
};

window.handleCookieChoice = function(choice) {
    document.getElementById('cookieBanner').classList.remove('visible');
    localStorage.setItem('skydata_cookie_consent', choice === 'accept' ? 'accepted' : 'rejected');
};

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
    });
})();