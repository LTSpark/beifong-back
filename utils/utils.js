const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');

const sendEmail = async ( template, email ) => {

    let transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: process.env.SMTP_PORT,
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

const encryptPassword = password => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

const generateJWT = ( payload, key, expiration ) => {
    return jwt.sign(payload, key, { expiresIn: expiration, algorithm: 'HS256' });
}

const getJWTPayload = (token, key) => {
    return jwt.verify(token, key);
}

const fileToBase64 = ( mimetype, buffer ) => {
    const base64Buffer = Buffer.from(buffer).toString('base64');
    return 'data:' + mimetype + ';base64,' + base64Buffer;
}

const errorFactory = ( msg, statusCode ) => {
    const error = new Error(msg);
    error.code = statusCode;
    return error;
}

const parseSort = ( sort, order) => {
    if(order == 'desc') {
        sort = "-" + sort;
    }
    return sort;
}

const getExpirationDate = ( subscriptionType, currentDate = new Date() ) => {
    switch(subscriptionType){
        case "annual":
            currentDate.setFullYear(currentDate.getFullYear() + 1);
            break;
        case "semi-annual":
            currentDate.setMonth(currentDate.getMonth() + 6);
            break;
        case "monthly":
            currentDate.setMonth(currentDate.getMonth() + 1);
            break;
    }
    return currentDate;
}

module.exports = {
    encryptPassword,
    generateJWT,
    getJWTPayload,
    fileToBase64,
    errorFactory,
    sendEmail,
    parseSort,
    getExpirationDate
};