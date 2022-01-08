module.exports = {
    "/medics/accesibility": {
        put: {
            summary: "Sets the Accesibility for a Medic account",
            tags: [
                "Medic"
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
            requestBody: {
                required: false,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/PatientGoogleLogin"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Successful login",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/PatientGoogleLoginResponse"
                        }
                    }
                },                
                201: {
                    description: "Patient not found. Registered on Google and login made successfully",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/PatientGoogleLoginResponse"
                        }
                    }
                },
                400: {
                    description: "idToken cannot be empty"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
}