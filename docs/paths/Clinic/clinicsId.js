module.exports = {
    "/clinics/:id": {
        get: {
            summary: "Gets a clinic specifically",
            tags: [
                "Clinic"
            ],
            parameters: [   
                {
                    in: "params",
                    name: "id",
                    schema: {
                      type: "MongoId"
                    },
                    required: true,
                    description: "id of the clinic searched"
                },
                {
                    in: "query",
                    name: "medics",
                    schema: {
                      type: "Boolean"
                    },
                    required: false,
                    description: "if we want the medics to be included in the query"
                },
                {
                    in: "query",
                    name: "clinicalAppointments",
                    schema: {
                      type: "Boolean"
                    },
                    required: false,
                    description: "if we want the clinical appointments to be included in the query"
                }

            ],
            responses: {
                200: {
                    description: "Sends the clinic information",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/GetClinicIdResponse"
                        }
                    }
                },
                400: {
                    description: "invalid id or error in medics and clinicalAppointments flags"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
};