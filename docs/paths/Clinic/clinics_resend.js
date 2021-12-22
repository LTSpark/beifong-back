module.exports = {
    "/clinics/resend": {
        post: {
            summary: "Resend the confirmation email",
            tags: [
                "Clinic"
            ],
            requestBody: {
                required: true,
                content: {
                    "application/json": {
                        schema: {
                            $ref: "#/components/schemas/ResendEmailClinic"
                        }
                    }
                }
            },
            responses: {
                201: {
                    description: "Resends another email to the clinicId provided",
                    content: {
                        "application/json": {
                            $ref: "#/components/schemas/ResendEmailClinicResponse"
                        }
                    }
                }
            }
        }
    }
};