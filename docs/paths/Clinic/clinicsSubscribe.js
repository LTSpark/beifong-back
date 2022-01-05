module.exports = {
    "/clinics/subscribe": {
        put: {
            summary: "Edits the suscription of a Clinic",
            tags: [
                "Clinic"
            ],
            parameters: [   
                {
                    in: "header",
                    name: "Authorization",
                    schema: {
                      type: "string"
                    },
                    required: true,
                    description: "Authorization token"
                }
            ],
            requestBody:{
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/ClinicSuscription"
                    }
                  }
                }
            },
            responses: {
                201: {
                    description: "Payment done successfully",
                },
                400: {
                    description: "invalid token, Clinic not verified or wrong body params"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
};