// ==========================================
// 1. Global CSS Styles Injection (تصميم موحد واحترافي)
// ==========================================
const styles = `
    @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap');

    :root { --primary: #4e54c8; --text-dark: #333; }
    
    /* إزالة المربع الأزرق المزعج عند النقر (Focus Ring) */
    * { -webkit-tap-highlight-color: transparent; outline: none; }
    *:focus { outline: none; }

    body { font-family: 'Poppins', sans-serif; }

    /* زر الإعدادات العائم */
    .settings-btn { 
        position: fixed; top: 25px; right: 25px; 
        background: rgba(255, 255, 255, 0.9); 
        backdrop-filter: blur(10px);
        width: 55px; height: 55px; border-radius: 50%; 
        box-shadow: 0 8px 32px rgba(0,0,0,0.1); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; z-index: 9999; transition: all 0.3s ease; 
        border: 1px solid rgba(255, 255, 255, 0.3);
    }
    .settings-btn:hover { transform: rotate(90deg) scale(1.1); color: var(--primary); box-shadow: 0 8px 32px rgba(78, 84, 200, 0.2); }
    .settings-btn i { font-size: 24px; color: #555; transition: 0.3s; }
    .settings-btn:hover i { color: var(--primary); }
    
    /* نافذة اللغات (تصميم زجاجي) */
    .modal-overlay { 
        display: none; /* مخفية افتراضياً */
        position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
        background: rgba(0,0,0,0.4); z-index: 9998; 
        backdrop-filter: blur(5px);
        justify-content: center; align-items: center; 
    }
    .language-modal { 
        background: white; padding: 30px; border-radius: 20px; width: 320px; 
        animation: popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275); 
        text-align: center; box-shadow: 0 20px 60px rgba(0,0,0,0.2);
    }
    .lang-option { 
        display: flex; align-items: center; gap: 15px; padding: 15px; margin: 12px 0; 
        background: #f8f9fa; border-radius: 12px; cursor: pointer; 
        transition: 0.3s; border: 2px solid transparent; 
    }
    .lang-option:hover { border-color: var(--primary); background: #eef2ff; transform: translateX(5px); }
    .lang-option span { font-weight: 600; color: #444; }
    
    /* بانر الكوكيز */
    .cookie-banner { 
        position: fixed; bottom: -400px; left: 0; width: 100%; 
        background: rgba(255, 255, 255, 0.95); backdrop-filter: blur(10px);
        padding: 25px 20px; box-shadow: 0 -10px 40px rgba(0,0,0,0.1); 
        z-index: 9997; transition: bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1); 
        display: flex; flex-direction: column; align-items: center; text-align: center; 
        border-top: 3px solid var(--primary); 
    }
    .cookie-banner.show { bottom: 0; }
    .cookie-actions { display: flex; gap: 15px; margin-top: 20px; }
    .btn-accept { background: var(--primary); color: white; border: none; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.3s; box-shadow: 0 4px 15px rgba(78, 84, 200, 0.3); }
    .btn-accept:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(78, 84, 200, 0.4); }
    .btn-reject { background: transparent; border: 2px solid #ddd; color: #666; padding: 12px 30px; border-radius: 8px; cursor: pointer; font-weight: 600; transition: 0.3s; }
    .btn-reject:hover { border-color: #999; color: #333; }
    
    .legal-links { margin-top: 10px; }
    .legal-links a { color: var(--primary); text-decoration: none; font-size: 13px; margin: 0 8px; font-weight: 500; opacity: 0.8; }
    .legal-links a:hover { opacity: 1; text-decoration: underline; }

    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

// حقن الـ CSS
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection (حقن العناصر)
// ==========================================
function injectUI() {
    // 1. زر الإعدادات
    if (!document.querySelector('.settings-btn')) {
        const settingsBtn = document.createElement('div');
        settingsBtn.className = 'settings-btn';
        settingsBtn.innerHTML = '<i class="fas fa-cog"></i>';
        settingsBtn.onclick = window.toggleLangModal; // ربط مباشر
        document.body.appendChild(settingsBtn);
    }

    // 2. نافذة اللغات (تأكدنا من وجود كلاسات الأعلام الصحيحة)
    if (!document.getElementById('langModal')) {
        const modal = document.createElement('div');
        modal.className = 'modal-overlay';
        modal.id = 'langModal';
        // إضافة مستمع للنقر لإغلاق النافذة عند النقر خارجها
        modal.onclick = (e) => {
            if(e.target === modal) window.toggleLangModal();
        };

        modal.innerHTML = `
            <div class="language-modal">
                <h3 data-i18n="settingsTitle" style="margin-bottom: 20px;">Language Settings</h3>
                
                <div class="lang-option" onclick="window.changeLanguage('en')">
                    <span class="flag-icon flag-icon-us" style="font-size: 24px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"></span>
                    <span>English (US)</span>
                </div>
                
                <div class="lang-option" onclick="window.changeLanguage('ar')">
                    <span class="flag-icon flag-icon-sa" style="font-size: 24px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"></span>
                    <span>العربية (KSA)</span>
                </div>
                
                <div class="lang-option" onclick="window.changeLanguage('ru')">
                    <span class="flag-icon flag-icon-ru" style="font-size: 24px; box-shadow: 0 2px 5px rgba(0,0,0,0.1);"></span>
                    <span>Русский (RU)</span>
                </div>

                <button onclick="window.toggleLangModal()" style="margin-top:15px; width:100%; padding:12px; border:none; background:#f0f0f0; border-radius:8px; cursor:pointer; font-weight:bold; color:#555;">Close</button>
            </div>
        `;
        document.body.appendChild(modal);
    }

    // 3. بانر الكوكيز
    if (!document.getElementById('cookieBanner')) {
        const cookieBanner = document.createElement('div');
        cookieBanner.className = 'cookie-banner';
        cookieBanner.id = 'cookieBanner';
        cookieBanner.innerHTML = `
            <div style="max-width: 600px;">
                <h3 data-i18n="cookieTitle" style="margin-bottom: 10px;">We Value Your Privacy</h3>
                <p data-i18n="cookieText" style="font-size: 14px; color: #666; line-height: 1.6;">We use cookies to enhance your experience and analyze our traffic.</p>
                <div class="legal-links">
                    <a href="privacypolicy.html" target="_blank" data-i18n="privacy">Privacy Policy</a> | 
                    <a href="Terms-of-Service.html" target="_blank" data-i18n="terms">Terms of Service</a>
                </div>
                <div class="cookie-actions">
                    <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Reject Non-Essential</button>
                    <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept All</button>
                </div>
            </div>
        `;
        document.body.appendChild(cookieBanner);
    }
}

// دالة فتح/إغلاق النافذة (معالجة مشكلة الفتح التلقائي)
window.toggleLangModal = function() {
    const modal = document.getElementById('langModal');
    if (modal) {
        modal.style.display = (modal.style.display === 'flex') ? 'none' : 'flex';
    }
};

// ==========================================
// 3. Translation & Logic
// ==========================================
const translations = {
    en: { settingsTitle: "Language Settings", cookieTitle: "We Value Your Privacy", cookieText: "We use cookies to enhance your experience and analyze our traffic.", cookieAccept: "Accept All", cookieReject: "Reject", privacy: "Privacy Policy", terms: "Terms of Service" },
    ar: { settingsTitle: "إعدادات اللغة", cookieTitle: "نحن نحترم خصوصيتك", cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل الزيارات.", cookieAccept: "موافقة الكل", cookieReject: "رفض", privacy: "سياسة الخصوصية", terms: "شروط الخدمة" },
    ru: { settingsTitle: "Настройки языка", cookieTitle: "Мы ценим вашу конфиденциальность", cookieText: "Мы используем файлы cookie для улучшения вашего опыта.", cookieAccept: "Принять все", cookieReject: "Отклонить", privacy: "Политика конфиденциальности", terms: "Условия использования" }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang);
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    
    // تحديث النصوص
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            el.textContent = translations[lang][key];
        }
    });
    
    // إغلاق النافذة بعد الاختيار
    window.toggleLangModal();
};

window.handleCookieChoice = function(choice) {
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('show');
    if (choice === 'accept') {
        localStorage.setItem('skydata_cookie_consent', 'accepted');
        console.log("Cookies Accepted: Analytics Enabled.");
    } else {
        localStorage.setItem('skydata_cookie_consent', 'rejected');
        console.log("Cookies Rejected.");
    }
};

// ==========================================
// 4. OneSignal (بدون عقوبات، مجرد طلب لطيف)
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
            safari_web_id: "web.onesignal.auto.xxxxx",
            notifyButton: { enable: false }, // نحن نتحكم يدوياً
            allowLocalhostAsSecureOrigin: true,
        });

        // طلب الإذن بلطف إذا لم يقرر المستخدم بعد
        const permission = OneSignal.Notifications.permission;
        if (permission === 'default') { // لم يوافق ولم يرفض
            setTimeout(() => {
                OneSignal.Notifications.requestPermission();
            }, 3000); // نطلب بعد 3 ثواني من دخول الموقع
        }
        // إذا كان 'denied' (مرفوض)، لا نفعل شيئاً (احتراماً للمستخدم)
    });
}

// ==========================================
// 5. Initialization
// ==========================================
(function initSystem() {
    // 1. Domain Lock
    const allowedDomains = ["skydata.bond", "localhost", "127.0.0.1"];
    if (!allowedDomains.includes(window.location.hostname)) {
        document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20%'>Unauthorized Domain Usage</h1>";
        throw new Error("Security Alert");
    }

    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        
        // تطبيق اللغة
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        // لا نستدعي changeLanguage هنا لتجنب فتح النافذة، بل نطبق الاتجاه فقط
        document.body.dir = savedLang === 'ar' ? "rtl" : "ltr";
        // تحديث النصوص يدوياً بدون فتح النافذة
        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[savedLang][key]) el.textContent = translations[savedLang][key];
        });

        // إظهار الكوكيز
        if (!localStorage.getItem('skydata_cookie_consent')) {
            setTimeout(() => {
                const banner = document.getElementById('cookieBanner');
                if(banner) banner.classList.add('show');
            }, 1500);
        }

        initNotifications();
    });
})();
