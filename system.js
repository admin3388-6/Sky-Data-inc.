// ==========================================
// 1. Global Styles (نظام الألوان المتغير)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Outfit:wght@300;500;700&display=swap');

    :root { 
        /* الوضع الداكن (الافتراضي) */
        --primary: #4e54c8; 
        --accent: #00d2ff;
        --bg-color: #0a0a12;
        --text-color: #ffffff;
        --text-muted: #8b9bb4;
        --glass-bg: rgba(255, 255, 255, 0.03);
        --glass-border: rgba(255, 255, 255, 0.08);
        --card-bg: rgba(10, 10, 18, 0.95);
        --sidebar-bg: rgba(10, 10, 18, 0.95);
        --btn-glass: rgba(255, 255, 255, 0.1);
    }

    /* الوضع الساطع (Light Mode) */
    [data-theme="light"] {
        --primary: #4e54c8;
        --accent: #2962ff;
        --bg-color: #f4f6f8;
        --text-color: #1a1a2e;
        --text-muted: #566b88;
        --glass-bg: rgba(255, 255, 255, 0.6);
        --glass-border: rgba(0, 0, 0, 0.05);
        --card-bg: rgba(255, 255, 255, 0.85);
        --sidebar-bg: rgba(255, 255, 255, 0.95);
        --btn-glass: rgba(0, 0, 0, 0.05);
    }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; transition: background-color 0.3s, color 0.3s, border-color 0.3s; }
    html, body { width: 100%; overflow-x: hidden; margin: 0; padding: 0; }
    
    body { 
        font-family: 'Outfit', sans-serif; 
        background-color: var(--bg-color); 
        color: var(--text-color);
    }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* --- أزرار النظام العائمة --- */
    .system-controls {
        position: fixed; top: 25px; right: 25px; z-index: 99999;
        display: flex; gap: 15px; align-items: center;
    }

    .icon-btn { 
        background: var(--card-bg); backdrop-filter: blur(15px);
        width: 45px; height: 45px; border-radius: 50%; 
        box-shadow: 0 5px 15px rgba(0,0,0,0.1); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; transition: 0.4s; 
        border: 1px solid var(--glass-border);
        color: var(--text-color);
    }
    .icon-btn i { font-size: 20px; transition: 0.3s; }
    .icon-btn:hover { transform: translateY(-3px); border-color: var(--accent); color: var(--accent); }

    /* زر الدعم (أسفل اليسار) */
    .support-float {
        position: fixed; bottom: 30px; left: 30px; z-index: 99990;
        background: var(--primary); color: white;
        padding: 12px 25px; border-radius: 50px;
        display: flex; align-items: center; gap: 10px;
        text-decoration: none; font-weight: bold;
        box-shadow: 0 5px 20px rgba(78, 84, 200, 0.4);
        transition: 0.3s; font-size: 14px;
        backdrop-filter: blur(5px);
    }
    .support-float:hover { transform: scale(1.05); box-shadow: 0 8px 25px rgba(78, 84, 200, 0.6); }

    /* بقية الستايلات (Modal, Cookies, Loader) - محدثة لتستخدم المتغيرات */
    .global-loader { position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: var(--bg-color); z-index: 999999; display: none; justify-content: center; align-items: center; flex-direction: column; }
    .spinner { width: 60px; height: 60px; border: 4px solid var(--glass-border); border-left-color: var(--accent); border-radius: 50%; animation: spin 1s linear infinite; }
    
    .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 99998; backdrop-filter: blur(5px); justify-content: center; align-items: center; padding: 20px; }
    .language-modal { background: var(--card-bg); padding: 25px; border-radius: 20px; width: 100%; max-width: 350px; text-align: center; border: 1px solid var(--glass-border); box-shadow: 0 20px 50px rgba(0,0,0,0.2); }
    .language-modal h3 { color: var(--text-color); margin-bottom: 20px; }
    
    .lang-option { display: flex; align-items: center; gap: 15px; padding: 12px; margin: 10px 0; background: var(--btn-glass); border-radius: 10px; cursor: pointer; transition: 0.2s; border: 1px solid transparent; color: var(--text-color); }
    .lang-option:hover { border-color: var(--primary); background: rgba(78, 84, 200, 0.1); }
    
    .cookie-banner { position: fixed; bottom: -400px; left: 0; width: 100%; background: var(--card-bg); backdrop-filter: blur(20px); padding: 20px; box-shadow: 0 -10px 30px rgba(0,0,0,0.1); z-index: 99997; transition: bottom 0.5s ease; text-align: center; border-top: 2px solid var(--primary); color: var(--text-color); display: none; }
    .cookie-banner.visible { display: flex; bottom: 0; }
    .cookie-banner h3 { color: var(--accent); }
    .cookie-banner p { color: var(--text-muted); }
    
    .btn-accept { background: linear-gradient(135deg, var(--primary), var(--accent)); color: white; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: bold; }
    .btn-reject { background: transparent; border: 1px solid var(--text-muted); color: var(--text-muted); padding: 10px 25px; border-radius: 50px; cursor: pointer; }

    @keyframes spin { 100% { transform: rotate(360deg); } }
    @keyframes popIn { from { transform: scale(0.9); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection (الأزرار والتحكم)
// ==========================================
function injectUI() {
    // 1. حاوية الأزرار العلوية (إعدادات + ثيم)
    if (!document.querySelector('.system-controls')) {
        const controls = document.createElement('div');
        controls.className = 'system-controls';
        controls.innerHTML = `
            <div class="icon-btn" onclick="window.toggleTheme()" title="Toggle Theme">
                <i class="fas fa-moon" id="themeIcon"></i>
            </div>
            <div class="icon-btn" onclick="window.toggleLangModal()" title="Language">
                <i class="fas fa-cog"></i>
            </div>
        `;
        document.body.appendChild(controls);
    }

    // 2. زر الدعم العائم (أسفل اليسار)
    if (!document.querySelector('.support-float')) {
        const supportBtn = document.createElement('a');
        supportBtn.href = "support.html";
        supportBtn.className = "support-float";
        supportBtn.innerHTML = `<i class="fas fa-headset"></i> <span data-i18n="supportBtn">Support</span>`;
        document.body.appendChild(supportBtn);
    }

    // 3. Loader & Modals
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
                <div style="margin:10px 0;"><a href="terms.html" style="color:var(--accent)">Terms</a></div>
                <div style="display:flex;gap:10px;justify-content:center;">
                    <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Deny</button>
                    <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept</button>
                </div>
            </div>`;
        document.body.appendChild(banner);
    }
}

// ==========================================
// 3. Logic (Theme & Navigation)
// ==========================================
window.toggleTheme = function() {
    const body = document.body;
    const icon = document.getElementById('themeIcon');
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('skydata_theme', newTheme);
    
    // تغيير الأيقونة
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
    if(loader) { loader.style.display = 'flex'; setTimeout(() => { window.location.href = url; }, 800); }
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
        settingsTitle: "Language", cookieTitle: "Privacy", cookieText: "We use cookies.", cookieAccept: "Accept", cookieReject: "Deny",
        supportBtn: "Support",
        // Index
        heroTitle: "NEXT GEN DIGITAL SOLUTIONS", heroDesc: "Advanced Web Tools & AI Services.", heroBtnLogin: "Access Console", heroBtnDash: "Go to Dashboard",
        navHome: "Home", navDash: "Dashboard", navTools: "Tools", navAI: "AI", navDev: "Dev", navSec: "Security", navSet: "Settings",
        // Login
        loginTitle: "Login", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "I agree to Terms & Privacy",
        // Dashboard
        profileTitle: "Profile", nameLabel: "NAME", emailLabel: "EMAIL", rankLabel: "RANK", logout: "Logout"
    },
    ar: {
        settingsTitle: "اللغة", cookieTitle: "الخصوصية", cookieText: "نستخدم الكوكيز.", cookieAccept: "موافقة", cookieReject: "رفض",
        supportBtn: "الدعم الفني",
        heroTitle: "حلول رقمية متطورة", heroDesc: "أدوات ويب وذكاء اصطناعي.", heroBtnLogin: "دخول المنصة", heroBtnDash: "لوحة التحكم",
        navHome: "الرئيسية", navDash: "لوحة التحكم", navTools: "الأدوات", navAI: "الذكاء", navDev: "تطوير", navSec: "أمان", navSet: "إعدادات",
        loginTitle: "تسجيل الدخول", googleBtn: "جوجل", linkedinBtn: "لينكد إن", githubBtn: "غيت هاب", termsText: "أوافق على الشروط والسياسة",
        profileTitle: "الملف الشخصي", nameLabel: "الاسم", emailLabel: "البريد", rankLabel: "الرتبة", logout: "خروج"
    },
    ru: {
        settingsTitle: "Язык", cookieTitle: "Приватность", cookieText: "Мы используем cookie.", cookieAccept: "Принять", cookieReject: "Отклонить",
        supportBtn: "Поддержка",
        heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ", heroDesc: "Веб-инструменты и AI.", heroBtnLogin: "Войти", heroBtnDash: "Панель",
        navHome: "Главная", navDash: "Панель", navTools: "Тулзы", navAI: "AI", navDev: "Код", navSec: "Защита", navSet: "Настройки",
        loginTitle: "Вход", googleBtn: "Google", linkedinBtn: "LinkedIn", githubBtn: "GitHub", termsText: "Я согласен с условиями",
        profileTitle: "Профиль", nameLabel: "ИМЯ", emailLabel: "EMAIL", rankLabel: "РАНГ", logout: "Выйти"
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

// ==========================================
// 5. Init
// ==========================================
(function init() {
    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        
        // Theme Init
        const savedTheme = localStorage.getItem('skydata_theme') || 'dark';
        document.body.setAttribute('data-theme', savedTheme);
        const icon = document.getElementById('themeIcon');
        if(icon) {
            icon.className = savedTheme === 'light' ? 'fas fa-sun' : 'fas fa-moon';
            icon.style.color = savedTheme === 'light' ? 'orange' : 'white';
        }

        // Lang & Cookie Init
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);
        
        if (!localStorage.getItem('skydata_cookie_consent')) {
            setTimeout(() => document.getElementById('cookieBanner').classList.add('visible'), 1500);
        }
    });
})();