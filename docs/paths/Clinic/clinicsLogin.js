module.exports = {
    "/clinics/login": {
      post: {
        summary: "Token-base authentication for clinics to access the system",
        tags: [
          "Clinic"
        ],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                $ref: "#/components/schemas/LoginClinic"
              }
            }
          }
        },
        responses: {
          200: {
            description: "clinic auth",
            content: {
              "application/json": {
                $ref: "#/components/schemas/TokenClinicResponse"
              }
            }
          },
          400: {
            description: "clinic not found, email does not exist"
          },
          401: {
            description: "invalid password, access is not allowed"
          },
          500: {
            description: "internal server error"
          }
        }
      }
    }
  };