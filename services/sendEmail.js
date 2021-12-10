const nodemailer = require('nodemailer');

const sendEmail = async ( template, email ) => {

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

    let info = await transporter.sendMail({
        from: `"Beifong" <${process.env.EMAIL}>`, // sender address,
        to: email,
        subject: 'Email Authentication',
        html: template
    });

    console.log('Message sent: %s', info.messageId);
}

module.exports = {
    sendEmail
}