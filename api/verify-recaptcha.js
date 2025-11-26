export default async function handler(req, res) {
    // 1. الحماية: السماح فقط للطلبات القادمة من موقعك
    const allowedOrigin = 'https://skydata.casacam.net'; // أو window.location.origin في الفرونت إند، لكن هنا يجب أن يكون ثابتاً أو ديناميكياً
    const origin = req.headers.origin;

    // ملاحظة: أثناء التطوير (Localhost) قد تحتاج لتعطيل هذا الشرط مؤقتاً أو إضافة localhost
    if (origin && origin !== allowedOrigin && !origin.includes("localhost")) {
        return res.status(403).json({ success: false, message: "Forbidden Access" });
    }

    const { token } = req.body;
    const secret = process.env.RECAPTCHA_SECRET;

    if (!token) {
        return res.status(400).json({ success: false, message: "Token missing" });
    }

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;

    try {
        const result = await fetch(verifyURL, {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: `secret=${secret}&response=${token}`
        }).then(r => r.json());

        // التحقق من نجاح جوجل + درجة الثقة (Score) إذا كنت تستخدم v3 (اختياري)
        if (result.success) {
            res.status(200).json(result);
        } else {
            res.status(400).json({ success: false, message: "Invalid Captcha" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
