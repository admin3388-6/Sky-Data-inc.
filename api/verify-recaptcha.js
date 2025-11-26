export default async function handler(req, res) {
    const { token } = req.body;

    const secret = process.env.RECAPTCHA_SECRET;

    const verifyURL = `https://www.google.com/recaptcha/api/siteverify`;

    const result = await fetch(verifyURL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `secret=${secret}&response=${token}`
    }).then(r => r.json());

    res.status(200).json(result);
}
