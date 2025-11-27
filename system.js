// ==========================================
// 1. CSS Styles Injection (تصميم موحد لكل الصفحات)
// ==========================================
const styles = `
    :root { --primary: #4e54c8; }
    /* زر الإعدادات العائم */
    .settings-btn { 
        position: fixed; top: 20px; right: 20px; background: white; 
        width: 50px; height: 50px; border-radius: 50%; 
        box-shadow: 0 4px 15px rgba(0,0,0,0.3); 
        display: flex; align-items: center; justify-content: center; 
        cursor: pointer; z-index: 9999; transition: 0.3s; border: 2px solid #eee;
    }
    .settings-btn:hover { transform: rotate(90deg) scale(1.1); border-color: var(--primary); }
    
    /* نافذة اللغات */
    .modal-overlay { display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9998; justify-content: center; align-items: center; }
    .language-modal { background: white; padding: 25px; border-radius: 15px; width: 300px; animation: popIn 0.3s ease; text-align: center; }
    .lang-option { display: flex; align-items: center; gap: 15px; padding: 15px; margin: 10px 0; background: #f8f9fa; border-radius: 10px; cursor: pointer; transition: 0.2s; border: 2px solid transparent; }
    .lang-option:hover { border-color: var(--primary); background: #eef2ff; }
    
    /* بانر الكوكيز */
    .cookie-banner { 
        position: fixed; bottom: -300px; left: 0; width: 100%; background: white; 
        padding: 20px; box-shadow: 0 -5px 20px rgba(0,0,0,0.15); z-index: 9997; 
        transition: bottom 0.6s cubic-bezier(0.23, 1, 0.32, 1); 
        display: flex; flex-direction: column; align-items: center; text-align: center; 
        border-top: 4px solid var(--primary); 
    }
    .cookie-banner.show { bottom: 0; }
    .cookie-actions { display: flex; gap: 10px; margin-top: 15px; }
    .btn-accept { background: var(--primary); color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
    .btn-reject { background: transparent; border: 1px solid #999; color: #555; padding: 10px 20px; border-radius: 5px; cursor: pointer; }
    
    /* روابط السياسة */
    .legal-links a { color: var(--primary); text-decoration: none; font-size: 12px; margin: 0 5px; }

    @keyframes popIn { from { transform: scale(0.8); opacity: 0; } to { transform: scale(1); opacity: 1; } }
`;

// حقن الـ CSS في الصفحة
const styleSheet = document.createElement("style");
styleSheet.innerText = styles;
document.head.appendChild(styleSheet);

// ==========================================
// 2. UI Injection (إضافة الأزرار تلقائياً)
// ==========================================
function injectUI() {
    // 1. زر الإعدادات
    const settingsBtn = document.createElement('div');
    settingsBtn.className = 'settings-btn';
    settingsBtn.innerHTML = '<i class="fas fa-cog" style="font-size: 22px; color: #555;"></i>';
    settingsBtn.onclick = toggleLangModal;
    document.body.appendChild(settingsBtn);

    // 2. نافذة اللغات
    const modal = document.createElement('div');
    modal.className = 'modal-overlay';
    modal.id = 'langModal';
    modal.innerHTML = `
        <div class="language-modal">
            <h3 data-i18n="settingsTitle">Language Settings</h3>
            <div class="lang-option" onclick="window.changeLanguage('en')"><span class="flag-icon flag-icon-us"></span><span>English (US)</span></div>
            <div class="lang-option" onclick="window.changeLanguage('ar')"><span class="flag-icon flag-icon-sa"></span><span>العربية (KSA)</span></div>
            <div class="lang-option" onclick="window.changeLanguage('ru')"><span class="flag-icon flag-icon-ru"></span><span>Русский (RU)</span></div>
            <button onclick="toggleLangModal()" style="margin-top:10px; width:100%; padding:10px; border:none; background:#eee; cursor:pointer;">Close</button>
        </div>
    `;
    document.body.appendChild(modal);

    // 3. بانر الكوكيز
    const cookieBanner = document.createElement('div');
    cookieBanner.className = 'cookie-banner';
    cookieBanner.id = 'cookieBanner';
    cookieBanner.innerHTML = `
        <div style="max-width: 600px;">
            <h3 data-i18n="cookieTitle">We Value Your Privacy</h3>
            <p data-i18n="cookieText" style="font-size: 14px; color: #666;">We use cookies to enhance your experience.</p>
            <div class="legal-links">
                <a href="privacypolicy.html" target="_blank" data-i18n="privacy">Privacy Policy</a> | 
                <a href="Terms-of-Service.html" target="_blank" data-i18n="terms">Terms of Service</a>
            </div>
            <div class="cookie-actions">
                <button class="btn-reject" onclick="window.handleCookieChoice('reject')" data-i18n="cookieReject">Reject</button>
                <button class="btn-accept" onclick="window.handleCookieChoice('accept')" data-i18n="cookieAccept">Accept All</button>
            </div>
        </div>
    `;
    document.body.appendChild(cookieBanner);
}

// دالة لفتح/غلق نافذة اللغة
function toggleLangModal() {
    const modal = document.getElementById('langModal');
    modal.style.display = modal.style.display === 'flex' ? 'none' : 'flex';
}

// ==========================================
// 3. Translation & Logic
// ==========================================
const translations = {
    en: { settingsTitle: "Language Settings", cookieTitle: "We Value Your Privacy", cookieText: "We use cookies to enhance your experience.", cookieAccept: "Accept All", cookieReject: "Reject", privacy: "Privacy Policy", terms: "Terms of Service" },
    ar: { settingsTitle: "إعدادات اللغة", cookieTitle: "نحترم خصوصيتك", cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك.", cookieAccept: "موافقة الكل", cookieReject: "رفض", privacy: "سياسة الخصوصية", terms: "شروط الخدمة" },
    ru: { settingsTitle: "Настройки языка", cookieTitle: "Мы ценим вашу конфиденциальность", cookieText: "Мы используем файлы cookie.", cookieAccept: "Принять", cookieReject: "Отклонить", privacy: "Политика конфиденциальности", terms: "Условия использования" }
};

window.changeLanguage = function(lang) {
    localStorage.setItem('skydata_lang', lang);
    document.body.dir = lang === 'ar' ? "rtl" : "ltr";
    
    // تحديث النصوص في الصفحة الحالية
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (translations[lang][key]) el.textContent = translations[lang][key];
    });
    toggleLangModal();
};

window.handleCookieChoice = function(choice) {
    document.getElementById('cookieBanner').classList.remove('show');
    if (choice === 'accept') {
        localStorage.setItem('skydata_cookie_consent', 'accepted');
        // هنا يمكن تفعيل أدوات التتبع
    } else {
        localStorage.setItem('skydata_cookie_consent', 'rejected');
    }
};

// ==========================================
// 4. OneSignal Enforcer (نظام الإلحاح على الإشعارات) 🔔
// ==========================================
function initNotifications() {
    // إضافة سكربت OneSignal
    const script = document.createElement('script');
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);

    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({
            appId: "201dc615-587a-4e1c-a979-8b9d80667386",
            safari_web_id: "web.onesignal.auto.xxxxx",
            notifyButton: { enable: false }, // سنقوم نحن بالتحكم
            allowLocalhostAsSecureOrigin: true,
        });

        checkNotificationLoop(OneSignal);
    });
}

function checkNotificationLoop(OneSignal) {
    // التحقق كل 5 ثواني
    const interval = setInterval(async () => {
        const permission = OneSignal.Notifications.permission;
        console.log("Notification Status:", permission);

        if (permission === true || permission === 'granted') {
            // وافق المستخدم - نوقف الإلحاح
            clearInterval(interval);
        } else if (permission === false || permission === 'denied') {
            // 🚫 رفض المستخدم - هنا ننفذ العقوبة
            clearInterval(interval);
            handleSubscriptionPenalty(); 
        } else {
            // الحالة Default (لم يضغط شيئاً أو نسي) - نعرض الطلب مرة أخرى
            console.log("Asking for permission...");
            await OneSignal.Notifications.requestPermission();
        }
    }, 5000); // كل 5 ثواني يعيد الطلب
}

function handleSubscriptionPenalty() {
    // ⚠️ دالة العقوبة عند الرفض
    console.warn("User denied notifications. Subscription penalty triggered.");
    // مثال: إظهار رسالة مزعجة أو توجيه لصفحة الخطأ
    alert("Warning: You must enable notifications to use Sky Data services fully. Please reset your browser permissions.");
    // window.location.href = "access-denied.html"; // يمكنك تفعيل هذا السطر لطرده
}

// ==========================================
// 5. Initialization (تشغيل النظام)
// ==========================================
(function initSystem() {
    // 1. حماية الدومين
    const allowedDomains = ["skydata.bond", "localhost", "127.0.0.1"];
    if (!allowedDomains.includes(window.location.hostname)) {
        document.body.innerHTML = "<h1 style='color:red;text-align:center;'>Unauthorized Domain</h1>";
        throw new Error("Security Alert");
    }

    // 2. حقن الواجهة عند تحميل الصفحة
    window.addEventListener('DOMContentLoaded', () => {
        injectUI();
        
        // تطبيق اللغة المحفوظة
        const savedLang = localStorage.getItem('skydata_lang') || 'en';
        window.changeLanguage(savedLang);

        // إظهار الكوكيز إذا لم يوافق مسبقاً
        if (!localStorage.getItem('skydata_cookie_consent')) {
            setTimeout(() => document.getElementById('cookieBanner').classList.add('show'), 1500);
        }

        // تشغيل الإشعارات
        initNotifications();
    });
})();
