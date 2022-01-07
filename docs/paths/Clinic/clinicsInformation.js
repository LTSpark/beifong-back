module.exports = {
    "/clinics/information": {
        put: {
            summary: "Updates the information of a Clinic",
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
                },
                {
                    in: "files",
                    name: "img",
                    schema: {
                      type: "Object"
                    },
                    required: false,
                    description: "Optional Image. Contains: mimetype and data"
                }
            ],
            requestBody:{
                required: true,
                content: {
                  "application/json": {
                    schema: {
                      $ref: "#/components/schemas/UpdateClinicInformation"
                    }
                  }
                }
            },
            responses: {
                200: {
                    description: "Update clinic information success!",
                    content: {
                        "application/json": {
                          $ref: "#/components/schemas/UpdateClinicInformationResponse"
                        }
                      }
                },
                400: {
                    description: "invalid token, Clinic not verified, subscribed or wrong body params"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
};