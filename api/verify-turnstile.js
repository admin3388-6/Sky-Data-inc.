export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, message: "Method Not Allowed" });
    }

    const { token } = req.body;
    const secret = process.env.TURNSTILE_SECRET; // المفتاح السري من إعدادات Vercel

    if (!token) {
        return res.status(400).json({ success: false, message: "Token missing" });
    }

    const verifyURL = 'https://challenges.cloudflare.com/turnstile/v0/siteverify';

    try {
        const formData = new URLSearchParams();
        formData.append('secret', secret);
        formData.append('response', token);

        const result = await fetch(verifyURL, {
            method: 'POST',
            body: formData,
        }).then(r => r.json());

        if (result.success) {
            res.status(200).json({ success: true });
        } else {
            res.status(400).json({ success: false, message: "Security check failed" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Server Error" });
    }
}
