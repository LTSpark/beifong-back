const ClinicService = require("../../../services/clinic.service");

const { errorResponse, customResponse } = require("../../../utils/responses");

const SubscribeClinicFlow = async ( req, res ) => {
    try{
        const { subscriptionType, mount } = req.body;
        ClinicService.createPayment(req.params.id, subscriptionType, mount);
        return customResponse(res, "Payment done successfully", 201);
    }
    catch(error) {
        console.error(error);
        return errorResponse(res, "Paying failed", error.message);
    }
}

module.exports = SubscribeClinicFlow;