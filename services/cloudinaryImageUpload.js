const cloudinary = require('cloudinary').v2;

const { fileToBase64 } = require('../utils/utils');

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const cloudinaryImageUpload = async (file, folder)  => {

    const imageBase64 = fileToBase64(file.mimetype, file.data); //use tempdir to avoid using node fs
    const { secure_url } = await cloudinary.uploader.upload( imageBase64, {folder: `${process.env.PROJECT_FOLDER}/${folder}`});
    return secure_url;

}

module.exports = {
    cloudinaryImageUpload
};