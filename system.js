// ==========================================
// 1. Domain Lock System (نظام قفل الدومين)
// ==========================================
(function secureDomain() {
    const allowedDomains = ["skydata.bond", "localhost", "127.0.0.1"];
    const currentDomain = window.location.hostname;
    
    // التحقق الصارم: إذا لم يكن الدومين مسموحاً به
    if (!allowedDomains.includes(currentDomain)) {
        document.body.innerHTML = "<h1 style='color:red;text-align:center;margin-top:20%'>Access Denied: Unauthorized Domain</h1>";
        throw new Error("Security Alert: Code running on unauthorized domain!");
    }
})();

// ==========================================
// 2. Translation System (نظام الترجمة)
// ==========================================
const translations = {
    en: {
        title: "User Profile",
        loading: "Checking Security...",
        logout: "Logout",
        settingsTitle: "Language Settings",
        cookieTitle: "We Value Your Privacy",
        cookieText: "We use cookies to enhance your experience and analyze our traffic. Essential cookies are required for the site to function correctly.",
        cookieAccept: "Accept All",
        cookieReject: "Reject Non-Essential",
        privacy: "Privacy Policy",
        terms: "Terms of Service"
    },
    ar: {
        title: "الملف الشخصي",
        loading: "جاري التحقق الأمني...",
        logout: "تسجيل الخروج",
        settingsTitle: "إعدادات اللغة",
        cookieTitle: "نحن نحترم خصوصيتك",
        cookieText: "نستخدم ملفات تعريف الارتباط لتحسين تجربتك وتحليل الزيارات. ملفات تعريف الارتباط الأساسية مطلوبة لعمل الموقع بشكل صحيح.",
        cookieAccept: "موافقة الكل",
        cookieReject: "رفض غير الضروري",
        privacy: "سياسة الخصوصية",
        terms: "شروط الخدمة"
    },
    ru: {
        title: "Профиль пользователя",
        loading: "Проверка безопасности...",
        logout: "Выйти",
        settingsTitle: "Настройки языка",
        cookieTitle: "Мы ценим вашу конфиденциальность",
        cookieText: "Мы используем файлы cookie для улучшения вашего опыта. Основные файлы cookie необходимы для правильной работы сайта.",
        cookieAccept: "Принять все",
        cookieReject: "Отклонить",
        privacy: "Политика конфиденциальности",
        terms: "Условия использования"
    }
};

export function changeLanguage(lang) {
    // 1. حفظ اللغة في المتصفح
    localStorage.setItem('skydata_lang', lang);
    
    // 2. تغيير اتجاه الصفحة (للعربية)
    if (lang === 'ar') {
        document.body.dir = "rtl";
        document.body.style.textAlign = "right";
    } else {
        document.body.dir = "ltr";
        document.body.style.textAlign = "left";
    }

    // 3. تطبيق النصوص
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang][key]) {
            element.textContent = translations[lang][key];
        }
    });
}

// تشغيل اللغة المحفوظة عند فتح الصفحة
const savedLang = localStorage.getItem('skydata_lang') || 'en';
changeLanguage(savedLang);


// ==========================================
// 3. Cookie Consent System (نظام الكوكيز)
// ==========================================
export function initCookieSystem() {
    const cookieConsent = localStorage.getItem('skydata_cookie_consent');
    const banner = document.getElementById('cookieBanner');

    // إذا لم يقرر المستخدم بعد، اظهر البانر
    if (!cookieConsent) {
        setTimeout(() => {
            banner.classList.add('show');
        }, 1000); // تأخير بسيط لظهور الأنيميشن
    } else if (cookieConsent === 'accepted') {
        enableTracking();
    }
}

export function handleCookieChoice(choice) {
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('show');

    if (choice === 'accept') {
        localStorage.setItem('skydata_cookie_consent', 'accepted');
        enableTracking();
    } else {
        localStorage.setItem('skydata_cookie_consent', 'rejected');
        console.log("Tracking disabled by user.");
    }
}

function enableTracking() {
    // هنا نضع أكواد التتبع الحقيقية مستقبلاً
    console.log("System: Tracking enabled. Device info secured.");
    // مثال: حفظ معلومات الجهاز (محاكاة)
    localStorage.setItem('device_info', navigator.userAgent);
}
// ... (اترك الأكواد السابقة كما هي) ...

// ==========================================
// 4. OneSignal Notification System (الإشعارات)
// ==========================================
export function initNotifications() {
    // 1. حقن السكربت ديناميكياً (بدون تلوث HTML)
    const script = document.createElement('script');
    script.src = "https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.page.js";
    script.defer = true;
    document.head.appendChild(script);

    // 2. إعداد OneSignal
    window.OneSignalDeferred = window.OneSignalDeferred || [];
    window.OneSignalDeferred.push(async function(OneSignal) {
        await OneSignal.init({
            appId: "201dc615-587a-4e1c-a979-8b9d80667386",
            safari_web_id: "web.onesignal.auto.xxxxx", // اختياري لمتصفح سفاري
            notifyButton: {
                enable: true, /* يظهر زر جرس صغير للاشتراك */
            },
            allowLocalhostAsSecureOrigin: true, // للسماح بالتجربة على جهازك
        });
        
        console.log("System: Notifications Service Started.");
    });
        }

