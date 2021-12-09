const nodemailer = require('nodemailer');

const sendEmail = ( template, email ) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    let info = transporter.sendMail({
        from: `"RestCafe" <${process.env.EMAIL}>`, // sender address,
        to: email,
        subject: 'Email Authentication',
        html: template
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = {
    sendEmail
}