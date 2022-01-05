const ClinicService = require("../../../services/clinic.service");
const CloudinaryService = require("../../../services/cloudinary.service");

const { getWeekdays } = require("../../../utils/utils");
const { errorResponse, customResponse } = require("../../../utils/responses");

const UpdateClinicInformationFlow = async ( req, res ) => {

    const { startAttentionDay, endAttentionDay, ...information } = req.body;

    try{

        const clinic = await ClinicService.findById(req.clinic.id);

        if ( startAttentionDay && endAttentionDay ) information.attentionDays = getWeekdays(startAttentionDay, endAttentionDay);
        if ( req.img ) information.logoImg = await CloudinaryService.upload(req.img, "Clinics");
        if ( clinic.logoImg && req.img ) CloudinaryService.delete(clinic.logoImg, "Clinics");

        await ClinicService.updateClinicById(clinic.id, information);

        return customResponse(res, "Update clinic information success!");

    }
    catch(error){
        console.error(error);
        return errorResponse(res, "Update clinic information failed", error.message);
    }

}

module.exports = UpdateClinicInformationFlow;
