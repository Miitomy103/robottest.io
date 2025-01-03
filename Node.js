const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;

// Google reCAPTCHA秘密鍵
const SECRET_KEY = '6Lf6Ra0qAAAAABFTT_vigOF1uv2ngP-a41Xm5lWH';

app.use(bodyParser.json());

app.post('/verify-captcha', async (req, res) => {
    const token = req.body.token;

    // reCAPTCHAの検証リクエストを送信
    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();

    if (data.success) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
