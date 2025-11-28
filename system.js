// ==========================================
// 1. Global Styles (تصميم موحد ومتجاوب)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&family=Poppins:wght@400;600&display=swap');

    :root { --primary: #4e54c8; --text-dark: #333; }
    
    * { -webkit-tap-highlight-color: transparent; outline: none; box-sizing: border-box; }
    
    /* الخطوط: بوبينز للإنجليزي، كايرو للعربي */
    body { font-family: 'Poppins', sans-serif; }
    body[dir="rtl"] { font-family: 'Cairo', sans-serif; }

    /* --- تحسينات سطح المكتب (Desktop) --- */
    @media (min-width: 768px) {
        .card, .container {
            max-width: 500px !important; /* تكبير العرض */
            padding: 50px !important;
            box-shadow: 0 15px 50px rgba(0,0,0,0.1) !important;
        }
        h1, h2 { font-size: 2.5rem !important; }
        input, button { padding: 16px !important; font-size: 16px !important; }
        .settings-btn { width: 60px; height: 60px; top: 40px; right: 40px; }
    }

    /* زر الإعدادات */
    .settings-btn { 
        position: fixed; top: 20px; right: 20px; 
        background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
        width: 50px; height: 50px; border-radius: 50%; 
        box-shadow: 0 5px 20px rgba(0,0,0,0.15); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; z-index: 9999; transition: 0.3s; border: 1px solid #eee;
    }
    .settings-btn:hover { transform: rotate(90deg) scale(1.1); color: var(--primary); }
    
    /* نافذة اللغات */
    .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9998; backdrop-filter: blur(5px); justify-content: center; align-items: center; }
    .language-modal { background: white; padding: 30px; border-radius: 20px; width: 320px; animation: popIn 0.3s ease; text-align: center; }
    .lang-option { display: flex; align-items: center; gap: 15px; padding: 15px; margin: 10px 0; background: #f8f9fa; border-radius: 12px; cursor: pointer; transition: 0.2s; border: 2px solid transparent; }
    .lang-option:hover { border-color: var(--primary); background: #eef2ff; }
    
    /* بانر الكوكيز */
    .cookie-banner { position: fixed; bottom: -400px; left: 0; width: 100%; background: rgba(255,255,255,0.95); backdrop-filter: blur(10px); padding: 25px; box-shadow: 0 -10px 30px rgba(0,0,0,0.1); z-index: 9997; transition: bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1); display: flex; flex-direction: column; align-items: center; text-align: center; border-top: 4px solid var(--primary); }
    .cookie-banner.show { bottom: 0; }
    .cookie-actions { display: flex; gap: 15px; margin-top: 20px; }
    .btn-accept { background: var(--primary); color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; }
    .btn-reject { background: transparent; border: 2px solid #ddd; color: #555; padding: 12px 30px; border-radius: 8px; cursor: pointer; }

    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection
// ==========================================
function injectUI() {
    if (!document.querySelector('.settings-btn')) {
        const btn = document.createElement('div');
        btn.className = 'settings-btn';
        btn.innerHTML = '<i class="fas fa-cog" style="font-size:24px; color:#555;"></i>';
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
                <div class="lang-option" onclick="window.changeLanguage('en')"><span class="flag-icon flag-icon-us"></span><span>English (US)</span></div>
                <div class="lang-option" onclick="window.changeLanguage('ar')"><span class="flag-icon flag-icon-sa"></span><span>العربية (KSA)</span></div>
                <div class="lang-option" onclick="window.changeLanguage('ru')"><span class="flag-icon flag-icon-ru"></span><span>Русский (RU)</span></div>
                <button onclick="window.toggleLangModal()" style="margin-top:15px; width:100%; padding:12px; border:none; background:#eee; border-radius:8px; cursor:pointer;">Close</button>
            </div>`;
        document.body.appendChild(modal);
    }
    if (!document.getElementById('cookieBanner')) {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.id = 'cookieBanner';
        banner.innerHTML = `
            <div style="max-width: 600px;">
                <h3 data-i18n="cookieTitle">Privacy</h3>
                <p data-i18n="cookieText" style="font-size:14px; color:#666;">We use cookies.</p>
                <div class="legal-links" style="margin:10px 0;"><a href="privacypolicy.html" target="_blank" data-i18n="privacy">Privacy</a> | <a href="Terms-of-Service.html" target="_blank" data-i18n="terms">Terms</a></div>
                <div class="cookie-actions">
                    <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Reject</button>
                    <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept All</button>
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
// 3. Translation System (شامل لكل الصفحات)
// ==========================================
const translations = {
    en: {
        // عام
        settingsTitle: "Language Settings", cookieTitle: "We Value Your Privacy", cookieText: "We use cookies to enhance your experience.", cookieAccept: "Accept All", cookieReject: "Reject", privacy: "Privacy Policy", terms: "Terms of Service",
        // صفحة البداية
        welcomeTitle: "Welcome to Sky Data", welcomeDesc: "Secure. Fast. Reliable.", getStarted: "Get Started",
        // صفحة الدخول
        loginTitle: "Login", signupTitle: "Create Account", 
        googleBtn: "Continue with Google", linkedinBtn: "Continue with LinkedIn", orEmail: "OR EMAIL",
        namePlace: "Full Name", emailPlace: "Email Address", passPlace: "Password",
        loginBtn: "Login", signupBtn: "Sign Up",
        noAccount: "Don't have an account? Sign Up", haveAccount: "Already have an account? Login",
        // القائمة
        profileTitle: "User Profile", loading: "Checking Security...", nameLabel: "NAME", emailLabel: "EMAIL", rankLabel: "RANK", logout: "Logout"
    },
    ar: {
        settingsTitle: "إعدادات اللغة", cookieTitle: "نحترم خصوصيتك", cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.", cookieAccept: "موافقة", cookieReject: "رفض", privacy: "سياسة الخصوصية", terms: "شروط الخدمة",
        welcomeTitle: "مرحباً في سكاي داتا", welcomeDesc: "آمن. سريع. موثوق.", getStarted: "ابدأ الآن",
        loginTitle: "تسجيل الدخول", signupTitle: "إنشاء حساب", 
        googleBtn: "المتابعة باستخدام جوجل", linkedinBtn: "المتابعة باستخدام لينكد إن", orEmail: "أو عبر الإيميل",
        namePlace: "الاسم الكامل", emailPlace: "البريد الإلكتروني", passPlace: "كلمة المرور",
        loginBtn: "دخول", signupBtn: "تسجيل جديد",
        noAccount: "ليس لديك حساب؟ سجل الآن", haveAccount: "لديك حساب بالفعل؟ دخول",
        profileTitle: "الملف الشخصي", loading: "جاري التحقق الأمني...", nameLabel: "الاسم", emailLabel: "البريد", rankLabel: "الرتبة", logout: "تسجيل خروج"
    },
    ru: {
        settingsTitle: "Настройки языка", cookieTitle: "Конфиденциальность", cookieText: "Мы используем файлы cookie.", cookieAccept: "Принять", cookieReject: "Отклонить", privacy: "Политика", terms: "Условия",
        welcomeTitle: "Добро пожаловать", welcomeDesc: "Безопасно. Быстро.", getStarted: "Начать",
        loginTitle: "Вход", signupTitle: "Регистрация", 
        googleBtn: "Войти через Google", linkedinBtn: "Войти через LinkedIn", orEmail: "ИЛИ EMAIL",
        namePlace: "Полное имя", emailPlace: "Email адрес", passPlace: "Пароль",
        loginBtn: "Войти", signupBtn: "Создать аккаунт",
        noAccount: "Нет аккаунта? Регистрация", haveAccount: "Есть аккаунт? Войти",
        profileTitle: "Профиль", loading: "Проверка...", nameLabel: "ИМЯ", emailLabel: "EMAIL", rankLabel: "РАНГ", logout: "Выйти"
    }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang);
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    
    // تحديث النصوص (Text Content & Placeholders)
    const dict = translations[lang];
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) {
            if (el.tagName === 'INPUT') {
                el.placeholder = dict[key]; // تحديث الحقول
            } else {
                el.innerText = dict[key]; // تحديث النصوص العادية
            }
        }
    });
    
    // إخفاء النافذة بعد الاختيار
    const modal = document.getElementById('langModal');
    if(modal) modal.style.display = 'none';
};

window.handleCookieChoice = function(choice) {
    document.getElementById('cookieBanner').classList.remove('show');
    localStorage.setItem('skydata_cookie_consent', choice === 'accept' ? 'accepted' : 'rejected');
};

// ==========================================
// 4. OneSignal (بدون عقوبة)
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
        
        // طلب الإذن مرة واحدة فقط
        const permission = OneSignal.Notifications.permission;
        if (permission === 'default') {
            setTimeout(() => { OneSignal.Notifications.requestPermission(); }, 3000);
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