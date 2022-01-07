const ClinicService = require("../../../services/clinic.service");
const MedicService = require("../../../services/medic.service");
const CloudinaryService = require("../../../services/cloudinary.service");

const { errorResponse, customResponse } = require("../../../utils/responses");

const PostMedicFlow = async ( req, res ) => {
    try {
        const img = await CloudinaryService.upload(req.img, "Medics");
        const medic = await MedicService.saveMedic(req.clinic.id, req.body, img);
        await ClinicService.updateClinicById(req.clinic.id, {
            $addToSet: {
                medics: medic.id
            }
        });
        return customResponse(res, "Post Medic done!", 201);
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Post Medic failed!", error.message);
    }
}

module.exports = PostMedicFlow;