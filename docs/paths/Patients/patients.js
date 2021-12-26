module.exports = {
    "/patients": {
        post: {
            summary: "Creates a new patient",
            tags: [
                "Patient"
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/PostPatient"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Creates a new patient and sends verification email",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/PostPatientResponse"
                        }
                    }
                },
                400: {
                    description: "Invalid name, password or email"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
};