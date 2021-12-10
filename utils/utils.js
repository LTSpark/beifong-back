const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const encryptPassword = password => {
    const salt = bcryptjs.genSaltSync();
    return bcryptjs.hashSync(password, salt);
}

const generateJWT = ( id, key, expirationDate ) => {
    return new Promise((resolve, reject) => {
        const payload = { id };
        jwt.sign(payload, key, {
            expiresIn: expirationDate
        }, (err, token) => {
            if (err) {
                reject("Couldn't generate token");
            } else {
                resolve(token);
            }
        });
    });
}

const fileToBase64 = ( mimetype, buffer ) => {
    const base64Buffer = Buffer.from(buffer).toString('base64');
    return 'data:' + mimetype + ';base64,' + base64Buffer;
}

module.exports = {
    encryptPassword,
    generateJWT,
    fileToBase64,
};