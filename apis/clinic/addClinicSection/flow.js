const ClinicService = require("../../../services/clinic.service");
const CloudinaryService = require("../../../services/cloudinary.service");

const { errorResponse, customResponse } = require("../../../utils/responses");

const AddClinicSectionFlow = async ( req, res ) => {

    let section = {};
    const { title, description, imgPosition } = req.body;
    
    try {
        
        Object.assign(section, { title, description, imgPosition });
        section.img = await CloudinaryService.upload(req.img, "Clinics");
        await ClinicService.addSection( req.clinic.id, section );
        return customResponse(res, "Add clinic section done!", 201);

    } 
    catch(error){
        console.error(error);
        return errorResponse(res, "Add clinic section failed", error.message);
    }
    
}

module.exports = AddClinicSectionFlow;