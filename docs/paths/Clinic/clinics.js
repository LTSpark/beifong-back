module.exports = {
    "/clinics": {
        post: {
            summary: "Creates a new clinic",
            tags: [
                "Clinic"
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/PostClinic"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Creates a new clinic and sends verification email",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/PostClinicResponse"
                        }
                    }
                },
                400: {
                    description: "Name already exists, email already exists, invalid password, etc"
                },
                500: {
                    description: "Internal server error - Failed database connection"
                }
            }
        }
    }
};