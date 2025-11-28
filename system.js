// ==========================================
// 1. Global Styles (تصميم موحد)
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

    body { font-family: 'Outfit', sans-serif; }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* زر الإعدادات */
    .settings-btn { 
        position: fixed; top: 25px; right: 25px; 
        background: var(--glass-dark); backdrop-filter: blur(15px);
        width: 45px; height: 45px; border-radius: 50%; 
        box-shadow: 0 0 15px rgba(0,0,0,0.3); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; z-index: 99999; transition: 0.4s; 
        border: 1px solid var(--border-light);
    }
    .settings-btn i { color: var(--text-white); font-size: 20px; }
    .settings-btn:hover { transform: rotate(90deg); border-color: var(--accent); }

    /* نافذة اللغات */
    .modal-overlay { 
        display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.7); z-index: 99998; backdrop-filter: blur(5px); 
        justify-content: center; align-items: center; padding: 20px;
    }
    .language-modal { 
        background: #0a0a12; padding: 25px; border-radius: 20px; 
        width: 100%; max-width: 350px; text-align: center; 
        border: 1px solid var(--border-light); box-shadow: 0 20px 50px rgba(0,0,0,0.6);
    }
    .lang-option { 
        display: flex; align-items: center; gap: 15px; padding: 12px; margin: 10px 0; 
        background: rgba(255,255,255,0.05); border-radius: 10px; cursor: pointer; 
        transition: 0.2s; border: 1px solid transparent; color: white;
    }
    .lang-option:hover { border-color: var(--primary); background: rgba(78, 84, 200, 0.15); }
    .lang-option span { font-size: 15px; }

    /* بانر الكوكيز - يظهر فقط عند الحاجة */
    .cookie-banner { 
        position: fixed; bottom: -400px; left: 0; width: 100%; 
        background: rgba(10, 10, 18, 0.98); backdrop-filter: blur(20px); 
        padding: 20px; box-shadow: 0 -10px 30px rgba(0,0,0,0.4); z-index: 99997; 
        transition: bottom 0.5s ease; text-align: center; 
        border-top: 2px solid var(--primary); color: white; display: none; /* مخفي افتراضياً */
    }
    .cookie-banner.visible { display: flex; bottom: 0; } /* كلاس للإظهار */
    
    .cookie-actions { display: flex; gap: 10px; margin-top: 15px; justify-content: center; flex-wrap: wrap; }
    .btn-accept { background: var(--primary); color: white; border: none; padding: 10px 25px; border-radius: 50px; cursor: pointer; font-weight: bold; }
    .btn-reject { background: transparent; border: 1px solid #555; color: #aaa; padding: 10px 25px; border-radius: 50px; cursor: pointer; }

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
                <h3 data-i18n="settingsTitle" style="color:white; margin-bottom:20px;">Language</h3>
                <div class="lang-option" onclick="window.changeLanguage('en')"><span class="flag-icon flag-icon-us"></span><span>English (US)</span></div>
                <div class="lang-option" onclick="window.changeLanguage('ar')"><span class="flag-icon flag-icon-sa"></span><span>العربية (KSA)</span></div>
                <div class="lang-option" onclick="window.changeLanguage('ru')"><span class="flag-icon flag-icon-ru"></span><span>Русский (RU)</span></div>
                <button onclick="window.toggleLangModal()" style="margin-top:15px; width:100%; padding:10px; border:none; background:#333; color:white; border-radius:8px; cursor:pointer;">Close</button>
            </div>`;
        document.body.appendChild(modal);
    }
    // 3. الكوكيز (يتم إنشاؤه ولكن لا يظهر إلا بالأمر)
    if (!document.getElementById('cookieBanner')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div>
                <h3 data-i18n="cookieTitle" style="color:var(--accent); margin:0 0 10px 0;">Privacy</h3>
                <p data-i18n="cookieText" style="font-size:13px; color:#ccc; margin:0;">We use cookies.</p>
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
// 3. Translation
// ==========================================
const translations = {
    en: {
        settingsTitle: "Language Settings", cookieTitle: "Privacy Protocol", cookieText: "We utilize advanced cookies to optimize system performance.", cookieAccept: "Accept", cookieReject: "Deny",
        navHome: "Home", navDash: "Dashboard", navTools: "Web Tools", navAI: "AI Services", navDev: "Dev Services", navSec: "Security", navSet: "Settings",
        heroTitle: "NEXT GEN DIGITAL SOLUTIONS", heroDesc: "Advanced Web Tools and AI Services.", heroBtn: "Access Console",
        statUptime: "Uptime", statUsers: "Users", statSecure: "AES-256",
        servicesTitle: "Professional Services",
        // Login Page
        loginTitle: "Secure Login", 
        googleBtn: "Continue with Google", linkedinBtn: "Continue with LinkedIn", githubBtn: "Continue with GitHub",
        secureNote: "Authenticated via OAuth 2.0"
    },
    ar: {
        settingsTitle: "إعدادات اللغة", cookieTitle: "الخصوصية", cookieText: "نستخدم ملفات تعريف الارتباط لتحسين الأداء.", cookieAccept: "موافقة", cookieReject: "رفض",
        navHome: "الرئيسية", navDash: "لوحة التحكم", navTools: "أدوات الويب", navAI: "خدمات الذكاء", navDev: "تطوير", navSec: "الحماية", navSet: "الإعدادات",
        heroTitle: "حلول رقمية متطورة", heroDesc: "أدوات ويب وذكاء اصطناعي وتشفير عالي.", heroBtn: "دخول المنصة",
        statUptime: "تشغيل", statUsers: "مستخدم", statSecure: "تشفير",
        servicesTitle: "خدماتنا",
        loginTitle: "تسجيل دخول آمن",
        googleBtn: "المتابعة بحساب جوجل", linkedinBtn: "المتابعة بحساب لينكد إن", githubBtn: "المتابعة بحساب غيت هاب",
        secureNote: "مصادقة آمنة عبر OAuth 2.0"
    },
    ru: {
        settingsTitle: "Настройки", cookieTitle: "Конфиденциальность", cookieText: "Мы используем файлы cookie.", cookieAccept: "Принять", cookieReject: "Отклонить",
        navHome: "Главная", navDash: "Панель", navTools: "Инструменты", navAI: "AI", navDev: "Разработка", navSec: "Защита", navSet: "Настройки",
        heroTitle: "ЦИФРОВЫЕ РЕШЕНИЯ", heroDesc: "Веб-инструменты и AI.", heroBtn: "Консоль",
        statUptime: "Аптайм", statUsers: "Юзеры", statSecure: "AES-256",
        servicesTitle: "Услуги",
        loginTitle: "Вход",
        googleBtn: "Войти через Google", linkedinBtn: "Войти через LinkedIn", githubBtn: "Войти через GitHub",
        secureNote: "Авторизация OAuth 2.0"
    }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang);
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    
    const dict = translations[lang];
    // دمج قاموس الصفحة الحالية مع القاموس العام إذا وجد
    const mergedDict = { ...dict, ...(window.pageTranslations ? window.pageTranslations[lang] : {}) };

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (mergedDict[key]) {
            if (el.tagName === 'INPUT') el.placeholder = mergedDict[key];
            else el.innerText = mergedDict[key];
        }
    });
    
    const modal = document.getElementById('langModal');
    if(modal) modal.style.display = 'none';
};

// ==========================================
// 4. Cookie Logic (Fix)
// ==========================================
window.handleCookieChoice = function(choice) {
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('visible'); // إخفاء
    setTimeout(() => { banner.style.display = 'none'; }, 500); // إزالة نهائية
    localStorage.setItem('skydata_cookie_consent', choice === 'accept' ? 'accepted' : 'rejected');
};

function checkCookieStatus() {
    const consent = localStorage.getItem('skydata_cookie_consent');
    const banner = document.getElementById('cookieBanner');
    
    if (consent) {
        // إذا كان هناك قرار سابق (سواء قبول أو رفض)، لا تظهر البانر أبداً
        if (banner) banner.style.display = 'none';
    } else {
        // إذا لم يكن هناك قرار، أظهره بعد قليل
        if (banner) {
            banner.style.display = 'flex'; // تجهيز للعرض
            setTimeout(() => { banner.classList.add('visible'); }, 1500);
        }
    }
}

// ==========================================
// 5. OneSignal
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

// ==========================================
// 6. Init
// ==========================================
(function init() {
    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);
        
        // التحقق من الكوكيز
        checkCookieStatus();
        
        initNotifications();
    });
})();