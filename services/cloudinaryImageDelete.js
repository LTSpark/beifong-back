const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudinaryDelete = (imgUrl, folder) => {

    const splittedUrl = imgUrl.split('/');
    const [ name ] = splittedUrl[splittedUrl.length-1].split('.');//get public_id and  cut the extension
    cloudinary.uploader.destroy(`${process.env.PROJECT_FOLDER}/${folder}/${name}`);

}

module.exports = {
    cloudinaryDelete
};