const express = require('express');
const nodemailer = require('nodemailer');
const handlebars = require('handlebars');
const fs = require('fs');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port:456,
    secure: true,
    service: 'gmail',
    auth: {
        user: 'tahaelatoui3@gmail.com',
        pass: 'twhi fwvo jrop ronx',
    }
});
const app = express();
const port = 3005;

app.get('/', async (_, res) => {
    const source = fs.readFileSync('template_email.html', 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        username: 'Taha',
    };
    const htmlToSend = template(replacements);

    const info = await transporter.sendMail({
        from: 'tahaelatoui3@gmail.com',
        to: 'taha.elatoui.03@gmail.com',
        subject: 'Project test',
        text: 'GM Mr Taha ',
        html: htmlToSend
    });
    
    console.log('Message sent: %s', info.response)
    res.send('Email Sent!');
});

app.listen(port, () => {
    console.log(`App is listening on port ${port} !`);
});