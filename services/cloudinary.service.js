const cloudinary = require('cloudinary').v2;

const { fileToBase64 } = require('./utils');

cloudinary.config(process.env.CLOUDINARY_URL);

class CloudinaryService {
    async upload(file, folder){
        const imageBase64 = fileToBase64(file.mimetype, file.data); // transform tu base64 to avoid using tmp
        const { secure_url } = await cloudinary.uploader.upload( imageBase64, {
            folder: `${process.env.PROJECT_FOLDER}/${folder}`
        });
        return secure_url;
    }
    delete(imgUrl){
        const splittedUrl = imgUrl.split('/');
        const [ name ] = splittedUrl[splittedUrl.length-1].split('.');//get public_id and  cut the extension
        cloudinary.uploader.destroy(
            `${process.env.PROJECT_FOLDER}/${folder}/${name}`
        );
    }
}

const cloudinaryService = new CloudinaryService();

module.exports = cloudinaryService;
