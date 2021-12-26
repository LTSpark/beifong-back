module.exports = {
    "/patients/login/google": {
        post: {
            summary: "Executes the login of a patient by google",
            tags: [
                "Patient"
            ],
            requestBody: {
                required: true,
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