module.exports = {
    "/patients/login": {
        post: {
            summary: "Executes the login of a patient",
            tags: [
                "Patient"
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/PatientLogin"
                        }
                    }
                }
            },
            responses: {
                200: {
                    description: "Successful login",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/PatientLoginResponse"
                        }
                    }
                },                
                400: {
                    description: "Empty Email or Password or Not registered Email"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
}