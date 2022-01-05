const { customErrorResponse } = require("../utils/responses");
const { fileToBase64 } = require("../utils/utils");

const validMimetypes = [ 'image/jpeg', 'image/jpg', 'image/png', 'image/webp' ];

const optionalImgValidator = ( req, res, next ) => {
    if( req.files?.img != undefined ){
        const mimetype = req.files.img.mimetype;
        const buffer = req.files.img.data;
        if(!validMimetypes.includes(mimetype)){
            return customErrorResponse(res, `Invalid file: ${mimetype}`);
        }
        req.img = fileToBase64( mimetype, buffer );
    }
    next();
}

module.exports = {
    optionalImgValidator
}