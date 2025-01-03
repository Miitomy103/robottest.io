const express = require('express');
const bodyParser = require('body-parser');
const fetch = require('node-fetch');

const app = express();
const PORT = 3000;
const SECRET_KEY = '6Lf6Ra0qAAAAABFTT_vigOF1uv2ngP-a41Xm5lWH';

app.use(bodyParser.urlencoded({ extended: true }));

app.post('/verify-captcha', async (req, res) => {
    const token = req.body['recaptcha-token'];
    if (!token) {
        return res.json({ success: false, message: 'トークンが提供されていません。' });
    }

    const response = await fetch(`https://www.google.com/recaptcha/api/siteverify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${SECRET_KEY}&response=${token}`,
    });

    const data = await response.json();
    if (data.success) {
        res.json({ success: true });
    } else {
        res.json({ success: false, error: data['error-codes'] });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
