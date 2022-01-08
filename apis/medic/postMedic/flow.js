const ClinicService = require("../../../services/clinic.service");
const MedicService = require("../../../services/medic.service");
const CloudinaryService = require("../../../services/cloudinary.service");

const { errorResponse, customResponse } = require("../../../utils/responses");
const { medicVerificationTemplate } = require("../../../templates/verificationTemplates");
const { sendEmail } = require("../../../utils/utils");

const PostMedicFlow = async ( req, res ) => {

    try {

        const img = await CloudinaryService.upload(req.img, "Medics");
        const medic = await MedicService.saveMedic(req.clinic.id, req.body, img);

        await ClinicService.updateClinicById(req.clinic.id, {
            $addToSet: {
                medics: medic.id
            }
        });

        const template = await medicVerificationTemplate(medic.id, medic.name, req.clinic.name);
        sendEmail(template, medic.email);
        return customResponse(res, "Post Medic done!", 201);
    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Post Medic failed!", error.message);
    }
    
}

module.exports = PostMedicFlow;