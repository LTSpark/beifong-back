const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});
class CloudinaryService {

    async upload(file, folder){
        const { secure_url } = await cloudinary.uploader.upload( file, {
            folder: `${process.env.PROJECT_FOLDER}/${folder}`
        });
        return secure_url;
    }

    delete(imgUrl, folder){
        const splittedUrl = imgUrl.split('/');
        const [ name ] = splittedUrl[splittedUrl.length-1].split('.');//get public_id and  cut the extension
        cloudinary.uploader.destroy(
            `${process.env.PROJECT_FOLDER}/${folder}/${name}`
        );
    }

}

const cloudinaryService = new CloudinaryService();

module.exports = cloudinaryService;
