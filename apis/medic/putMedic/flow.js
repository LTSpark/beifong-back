const MedicService = require("../../../services/medic.service");
const CloudinaryService = require("../../../services/cloudinary.service");

const { errorResponse, customResponse } = require("../../../utils/responses");
const { encryptPassword } = require("../../../utils/utils");

const PutMedicFlow = async ( req, res ) => {

    const { password, ...data } = req.body;

    if ( password ) data.password = encryptPassword(password);

    try{
        if ( req.img ) {
            CloudinaryService.delete(req.medic.img, "Medics");
            data.img = await CloudinaryService.upload(req.img, "Medics");
        }
        await MedicService.updateMedicById(req.medic.id, data);
        return customResponse(res, "Update medic done!");
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Updated Medic failed", error.message);
    }

}

module.exports = PutMedicFlow